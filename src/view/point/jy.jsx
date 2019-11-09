import React, { Component } from 'react';
/* 
    节点页面
*/
// 引入路由组件
import { Link } from 'react-router-dom';
import { Table, } from 'antd';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '交易Hash',
                    dataIndex: 'TxID',
                    render: text => <Link to={`/search/${this.channelId}/${text}`}>{text}</Link>,
                    onCell: () => {
                        return {
                            style: {
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }
                    },
                },
                {
                    title: '时间',
                    dataIndex: 'Timestamp',
                    render: text => <span>{this.time(text)}</span>,
                },
            ],
            data: [],
            isLoading: false,
            page: '1',
            total: ''
        }
    }
    componentWillMount() {
        this.getData(this.state.page)
    }
    onChangeFn(page) {
        this.getData(page)
    }
    getData(page) {
        // console.log({
        //     channelId: this.channelId,
        //     page: `${page - 1}`,
        //     pageSize: "10",
        //     txNumber: '-1'
        // })
        this.setState({
            isLoading: true
        })
        // 请求数据
        this.fetch.request({
            url: 'http://47.94.150.170:8080/v1/explorer/queryBlock',
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                channelId: this.channelId,
                // page: `1`,
                page: `${page - 1}`,
                pageSize: "10",
                txNumber: '10'
            }
        }).then(res => {
            this.setState({
                isLoading: false
            })
            if (res.data.data.Code !== 200) {
                return
            }
            // console.log('jy', res.data.Data)
            this.setState({
                data: res.data.data.Data.TxArgs,
                total: res.data.data.Data.Height
            })
        })
    }
    render() {
        return (

            <Table
                rowKey={(record, index) => `${index}`}
                align="center"
                columns={this.state.columns}
                dataSource={this.state.data}
                loading={this.state.isLoading}
                pagination={{
                    total: this.state.total,
                    onChange: (page, pageSize) => this.onChangeFn(page, pageSize)
                }}
            // pagination={false}
            />

        )
    }
}