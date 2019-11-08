import React, { Component } from 'react';
/*
    token页面
*/
import { Table, Descriptions, Tabs } from 'antd';
const { TabPane } = Tabs;

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '交易Hash',
                    dataIndex: 'Txid',
                    render: text => <this.Link to={`/search/0/${text}`}>{text}</this.Link>
                },
                {
                    title: '时间',
                    dataIndex: 'Time',
                    render: text => <span>{this.time(text)}</span>,
                },
                {
                    title: '交易数量',
                    dataIndex: 'Value',
                    render: text => <span>{JSON.parse(text).Amount}</span>,
                },
            ],
            columnsUser: [
                {
                    title: '代币持有人',
                    dataIndex: 'Key',
                    key: '1',
                    render: text => <this.Link to={`/search/0/${text}`}>{text}</this.Link>
                },
                {
                    title: '代币数量',
                    dataIndex: 'Val',
                    key: '2'
                },
                {
                    title: '持有百分比',
                    dataIndex: 'Scale',
                    key: '3',
                },
            ],
            // locationData: props.location.state,
            locationData: {},
            data: [],
            dataUser: [],
            requestobj: {
                tokenKey: props.location.state.TokenKey,
                start: '0',
                end: '9'
            }
        }
    }
    componentWillMount() {
        this.getData(this.state.requestobj, 'token/tokenRecord')
        this.getData(this.state.requestobj, 'token/getToken')
    }
    getData(obj, url) {
        // 请求数据
        this.fetch.request({
            url: `http://47.94.150.170:8080/v1/${url}`,
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: obj
        }).then(res => {
            // console.log('真实数据', res.data)
            if (res.data.data.Code !== 200) {
                return
            }
            if (url === 'token/getToken') {
                let dataUser = []
                const v = res.data.data.Data.User
                for (const key in v) {
                    dataUser.push({
                        Key: key,
                        Val: v[key],
                        Scale: v[key] / res.data.data.Data.TotalSupply * 100 + '%'
                    })
                }
                this.setState({
                    dataUser,
                    locationData: res.data.data.Data
                })
            } else {
                this.setState({
                    data: res.data.data.Data || []
                })
            }
            // console.log(res.data)
        })
    }
    render() {
        const list = this.state.locationData
        return (
            <div>
                <Descriptions title="代币详情" column={1}>
                    <Descriptions.Item label="代币地址">{list && list.TokenKey}</Descriptions.Item>
                    <Descriptions.Item label="是否锁仓">{list && list.Lock ? "是" : "否"}</Descriptions.Item>
                    <Descriptions.Item label="代币全称">{list && list.TokenName}</Descriptions.Item>
                    <Descriptions.Item label="代币简称">{list && list.TokenSymbol}</Descriptions.Item>
                    <Descriptions.Item label="代币数量">{list && list.TotalSupply}</Descriptions.Item>
                </Descriptions>
                <Tabs type="card">
                    <TabPane tab="转账记录" key="1">
                        <Table
                            rowKey={(record, index) => `${index}`}
                            columns={this.state.columns}
                            dataSource={this.state.data}
                            pagination={false} />
                    </TabPane>
                    <TabPane tab="代币持有人" key="2">
                        <Table
                            rowKey={(record, index) => `${index}`}
                            columns={this.state.columnsUser}
                            dataSource={this.state.dataUser}
                            pagination={false} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
