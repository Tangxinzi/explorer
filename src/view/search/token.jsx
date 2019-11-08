import React, { Component } from 'react';
/*
    节点页面
*/
import { Descriptions, Table } from 'antd';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            columns: [
                // {
                //     title: '代币地址',
                //     dataIndex: 'TokenKey',
                //     render: (text, record) => <this.Link to={{
                //         pathname: `/token/detailed`,
                //         state: record,
                //     }}>{text}</this.Link>
                // },
                {
                    title: '代币名称',
                    dataIndex: 'name',
                    render: (text, record) => <this.Link to={{
                        pathname: `/searchName`,
                        state: {
                            account: window.location.pathname.split('/')[3],
                            ...record,
                            ...props.data.data
                        },
                    }}>{text}</this.Link>
                    // onCell: () => {
                    //     return {
                    //         style: {
                    //             maxWidth: 300,
                    //             overflow: 'hidden',
                    //             whiteSpace: 'nowrap',
                    //             textOverflow: 'ellipsis',
                    //             cursor: 'pointer'
                    //         }
                    //     }
                    // }
                },
                {
                    title: '代币数量',
                    dataIndex: 'value',
                    // render: text => <this.Link to={`/searchHash/${this.channelId}/${text}`}>{text}</this.Link>,
                },
            ],
        }
    }

    componentWillMount() {
        const v = this.props.data.data.BalanceOf
        // console.log(this.props.data.data)
        let data = []
        for (const key in v) {
            const arr = key.split('|')
            data.push({
                TokenKey: arr[0],
                name: arr[1],
                value: v[key]
            })
        }
        this.setState({ data })
    }

    componentWillReceiveProps() {
        const v = this.props.data.data.BalanceOf
        let data = []
        for (const key in v) {
            const arr = key.split('|')
            data.push({
                TokenKey: arr[0],
                name: arr[1],
                value: v[key]
            })
        }
        this.setState({ data })
    }

    render() {
        var list = this.state.data
        // console.log(list)
        return (
            <div>
                <Descriptions title="账户持有人" column={1}>
                    <Descriptions.Item label="账户持有人">{this.props.data.data.Name}</Descriptions.Item>
                    <Descriptions.Item label="是否冻结">{this.props.data.data.Frozen ? '是' : '否'}</Descriptions.Item>
                </Descriptions>
                <Table
                    rowKey={(record, index) => `${index}`}
                    columns={this.state.columns}
                    dataSource={list}
                    pagination={false} />
            </div>
        )
    }
}
