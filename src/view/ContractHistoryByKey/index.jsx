import React, { Component } from 'react';

import { Table, } from 'antd';
import { getContractHistoryByKey } from '../../api'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '钱包地址',
                    dataIndex: 'Value',
                    key: 'Value',
                    render: text => <span>{this.strFn(text)}</span>
                },
                {
                    title: '创建时间',
                    dataIndex: 'Time',
                    key: 'Time',
                    render: text => <span>{this.time(text)}</span>
                }
            ],
            data: [
                {
                    Time: 1564167052,
                    Txid: "b1c463433f7b3fa17fea787467e2c15d7551892a5369a2730705ec34b7aaf9e0",
                    Value: "f7c0c13c2c86b9bc0585a1cd9d23e84ebf8fcdf50e8899e4e32fb63d5d205125"
                },
            ]
        }
    }

    componentWillMount() {
        getContractHistoryByKey({
            key: "UserList",
            start: '0',
            end: '10'
        }).then(res => {
            if (!res.data.Status) return
            // console.log(res)
            const data = res.data.Data
            this.setState({
                data
            })
        })
    }

    strFn = (val) => val.split('"')[1]

    render() {
        return (
            <div className='token'>
                <Table
                    className="contractList"
                    rowKey={(record, index) => `${index}`}
                    align="center"
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    pagination={false} />
            </div>
        )
    }
}