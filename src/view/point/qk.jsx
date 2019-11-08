import React, { Component } from 'react';
// 引入路由组件
import { Link } from 'react-router-dom';
import { Table, } from 'antd';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '区块高度',
                    dataIndex: 'Height',
                    // render: text => <a href="javascript:''">{text}</a>,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: 150,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }
                    },
                },
                {
                    title: '区块Hash',
                    dataIndex: 'BlockHash',
                    render: text => <Link to={`/search/${this.channelId}/${text}`}>{text}</Link>,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: 300,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                            }
                        }
                    }
                },
                // {
                //     title: '交易总数',
                //     dataIndex: 'txNumber',
                // },
                {
                    title: '时间',
                    dataIndex: 'Timestamp',
                    render: text => <span>{this.time(text)}</span>,
                },
            ],
            data: [],
            isLoading: false,
            total: '',
            page: '1'
        }
    }
    // 组件加载之前
    componentWillMount() {
        this.getData(this.state.page)
    }
    // 分页方法
    onChangeFn(page) {
        this.getData(page)
    }
    // 获取数据
    getData(page) {
        this.setState({
            isLoading: true
        })
        // 请求数据
        this.fetch.request({
            url: 'http://47.94.150.170:8080/api/v1/explorer/queryblocklist',
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                channelId: this.channelId,
                page: `${page - 1}`,
                pageSize: "10",
                txNumber: '4'
            }
        }).then(res => {
            this.setState({
                isLoading: false
            })
            // console.log(res.data)
            if (res.data.data.Code !== 200) {
                return
            }
            // console.log('qk', res.data)
            this.setState({
                data: res.data.data.Data.Block,
                total: res.data.data.Data.Height
            })
        })
    }
    render() {
        const state = this.state
        return (
            <Table
                rowKey={(record, index) => `${index}`}
                className=""
                align="center"
                columns={state.columns}
                dataSource={state.data}
                loading={this.state.isLoading}
                pagination={{
                    total: state.total,
                    onChange: (page, pageSize) => this.onChangeFn(page, pageSize)
                }} />
        )
    }
}