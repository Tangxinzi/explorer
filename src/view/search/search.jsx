import React, { Component } from 'react';

import '../../style/search.css'

// 引入组件
import Block from './block' //区块组件
import Tx from './tx' // 交易组件
import Token from './token' // token组件

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    componentWillMount() {
        const channelId = window.location.pathname.split('/')[2]
        const hash = window.location.pathname.split('/')[3]
        if (hash.length === 42) return this.getTokenData(hash)
        console.log(channelId, hash)
        this.getData(channelId, hash)


        this.props.history.listen((e) => {
            // 这里的代码会执行两次次 增加服务器压力  目前没有找到解决办法
            if (e.pathname.split('/')[1] === 'search') {
                // console.log('检测search路由的变化')
                const channelId = e.pathname.split('/')[2]
                const hash = e.pathname.split('/')[3]
                if (hash.length === 42) return this.getTokenData(hash)
                this.getData(channelId, hash)
            }
        })
    }
    getTokenData(account) {
        this.fetch.request({
            url: 'http://47.94.150.170:8080/v1/token/showAccount',
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                account
            }
        }).then(res => {
            // console.log('token数据', res.data)
            this.setState({
                loadingOpen: false
            })
            if (res.data.data.Code !== 200) {
                console.log('进到return')
                return
            }
            this.setState({
                data: {
                    Format: 2,
                    data: res.data.data.Data,
                }
            })
        })
    }
    getData(channelId, hash) {
        // 请求数据
        // console.log({
        //     channelId,
        //     hash
        // })
        this.fetch.request({
            url: 'http://47.94.150.170:8080/v1/explorer/search',
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                channelId,
                hash
            }
        }).then(res => {
            console.log(res)
            this.setState({
                loadingOpen: false
            })
            if (res.data.data.Code !== 200) {
                console.log('进到return')
                return
            }
            this.setState({
                data: res.data.data.Data
            })
        })
    }
    render() {
        let data
        if (this.state.data.Format === 0) {
            data = (<Block data={this.state.data} />)
        } else if (this.state.data.Format === 1) {
            data = (<Tx data={this.state.data} />)
        } else if (this.state.data.Format === 2) {
            data = (<Token data={this.state.data} />)
        } else {
            data = <div Style="width: 100%; height: 300px; line-height: 300px; text-align: center;">暂无数据</div>
        }
        return (
            <div className="point">
                {data}
            </div>
        )
    }
}
