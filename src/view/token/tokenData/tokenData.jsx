import React, { Component } from 'react';
/*
    token页面
*/
import { Table, } from 'antd';
// 引入路由组件
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '代币地址',
                    dataIndex: 'TokenKey',
                    render: (text, record) => <Link to={{
                        pathname: `/token/detailed`,
                        state: record,
                    }}>{text}</Link>,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: '100px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }
                    }
                },
                {
                    title: '代币名称',
                    dataIndex: 'TokenSymbol',
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: '100px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }
                    }
                },
                {
                    title: '代币数量',
                    dataIndex: 'TotalSupply',
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: '100px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }
                    }
                },
                {
                    title: '是否锁仓',
                    dataIndex: 'Lock',
                    render: text => <span>{text ? "是" : "否"}</span>,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: '100px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }
                    }
                },
            ],
            data: []
        }
    }
    componentWillMount() {
        this.getData()
    }
    getData() {
        // 请求数据
        this.fetch.request({
            url: 'http://47.94.150.170:8080/v1/token/showToken',
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            if (res.data.data.Code !== 200) {
                return
            }
            this.setState({
                data: res.data.data.Data || []
            })
            // console.log(res.data.data.Data)
        })
    }
    render() {
        return (
            <Table
                rowKey={(record, index) => `${index}`}
                columns={this.state.columns}
                dataSource={this.state.data}
                pagination={false} />
        )
    }
}
