import React, { Component } from 'react';
/* 
    合约页面
*/
import './contract.css'

import Depoly from './depoly/depoly'
import { Table, } from 'antd';
import { getContractList } from '../../api/index'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '合约ID',
                    dataIndex: 'Ccid',
                    key: 'Ccid',
                },
                {
                    title: '合约名',
                    dataIndex: 'Ccname',
                    key: 'Ccname',
                },
                {
                    title: '合约所有者',
                    dataIndex: 'Phone',
                    key: 'Phone',
                },
                {
                    title: '版本号',
                    dataIndex: 'Version',
                    key: 'Version',
                },
                {
                    title: '合约状态',
                    dataIndex: 'State',
                    key: 'State',
                    render: text => <span>{this.handelState(text)}</span>,
                },
            ],
            data: [
                {
                    Ccid: "10318a7fc3996bb4",
                    Ccintroduced: "Test",
                    Ccname: "基因检测",
                    Ccpath: "/root/code/go/src/Sanji_fabric/chaincode/EnterpriseCC/10318a7fc3996bb4",
                    Id: 5,
                    Phone: "15313159531",
                    State: "1",
                    Version: "v1.0"
                },
            ]
        }
    }

    componentWillMount() {
        getContractList().then(res => {
            // console.log(res)
            this.setState({
                data: res.data.Data
            })
        })
    }

    handelState = (num) => {
        switch (num) {
            case '1':
                return '审核中'
            case '2':
                return '审核成功'
            case '3':
                return '审核失败'
            case '4':
                return '部署成功'
            default:
                return num
        }
    }

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
                <Depoly />
            </div>
        )
    }
}