import React, { Component } from 'react';
/* 
    token页面
*/
import { Table, } from 'antd';


const columns = [
    {
        title: '序号',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
    },
    {
        title: '货币名称',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '发布人机构',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '拥有量',
        dataIndex: 'address',
        key: 'num',
    },
    {
        title: '持仓比',
        dataIndex: 'idc',
        key: 'idc',
    },
];

const data = [
    {
        key: '1',
        name: 'DBA',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'AHG',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'ERK',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'ERK',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '5',
        name: 'ERK',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

export default class Home extends Component {
    render() {
        return (
            <Table align="center" columns={columns} dataSource={data} pagination={false} />
        )
    }
}