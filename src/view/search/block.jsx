import React, { Component } from 'react';

import { Table, Descriptions } from 'antd';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '序号',
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
                    title: '交易名称',
                    dataIndex: 'Method',
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
                {
                    title: '交易Hash',
                    dataIndex: 'TxId',
                    render: text => <this.Link to={`/search/${this.channelId}/${text}`}>{text}</this.Link>,
                },
                {
                    title: '时间',
                    dataIndex: 'Timestamp',
                    render: text => <span>{this.time(text)}</span>,
                },
            ],
            data: []
        }
    }
    componentWillMount() {
        this.setState({
            data: this.props.data
        })

    }
    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }
    render() {
        var list = this.state.data.Block
        // console.log(list)
        return (
            <div>
                <Descriptions title="区块详情" column={1}>
                    <Descriptions.Item label="通道ID">{this.channelId}</Descriptions.Item>
                    <Descriptions.Item label="区块高度">{list && list.Height}</Descriptions.Item>
                    <Descriptions.Item label="区块地址">{list && list.BlockHash}</Descriptions.Item>
                    <Descriptions.Item label="产生时间">{list && this.time(list.Timestamp)}</Descriptions.Item>
                    <Descriptions.Item label="交易笔数">{list && list.Transaction.length}</Descriptions.Item>
                </Descriptions>
                <Descriptions title=" " column={1}>
                    <Descriptions.Item label="上一区块 ">
                        <this.Link to={`/search/${this.channelId}/${list && list.PreviousHash}`}>{list && list.PreviousHash}</this.Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="下一区块">
                        <this.Link to={`/search/${this.channelId}/${list && list.NextHash}`}> {list && list.NextHash}</this.Link>
                    </Descriptions.Item>
                </Descriptions>
                <Table
                    rowKey={(record, index) => `${index}`}
                    columns={this.state.columns}
                    dataSource={list.Transaction}
                    pagination={false} />
            </div>
        )
    }
}