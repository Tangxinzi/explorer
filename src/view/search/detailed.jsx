import React, { Component } from 'react';
/* 
    searchHash页面
*/
import { Descriptions } from 'antd';
export default class Home extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            data: ''
        }
    }
    componentWillMount() {
        const hash = {
            channelId: this.channelId,
            hash: window.location.pathname.split('/')[3]
        }
        this.getData(hash)

    }
    getData(hash) {
        // 请求数据
        this.fetch.request({
            url: 'http://47.94.150.170:8080/api/v1/explorer/search',
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: hash
        }).then(res => {
            this.setState({
                loadingOpen: false
            })
            if (res.data.Code !== 200) {
                return
            }
            this.setState({
                data: res.data.Data.Transaction
            })
            console.log(this.state.data)
        })
    }
    render() {
        var list = this.state.data
        return (
            <div className='point'>
                <Descriptions title="交易详情" column={1}>
                    <Descriptions.Item label="交易ID">{this.channelId}</Descriptions.Item>
                    <Descriptions.Item label="通道ID">{list && list.ChannelId}</Descriptions.Item>
                    <Descriptions.Item label="区块高度">
                        <this.Link to={`/search/${this.channelId}/${list && list.Height}`}>{list && list.Height}</this.Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="交易链码">{list && list.ChainCode}</Descriptions.Item>
                    <Descriptions.Item label="交易方法">{list && list.Method}</Descriptions.Item>
                    <Descriptions.Item label="交易状态">{list && (list.CreatedFlag && '完成')}</Descriptions.Item>
                    <Descriptions.Item label="交易时间">{list && this.time(list.Timestamp)}</Descriptions.Item>
                    <Descriptions.Item label="交易备注">
                        {list && list.TxArgs.map((v, i) => <p key={i}>{v}</p>)}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}