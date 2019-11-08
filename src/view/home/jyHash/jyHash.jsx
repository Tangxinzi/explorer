import React, { Component } from 'react';
import { Link, } from 'react-router-dom';

import { Col } from 'antd';

import { Button } from 'antd';

import './jyHash.css'
import { Table, } from 'antd';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '交易Hash',
                    dataIndex: 'TxID',
                    render: text => <this.Link to={`/search/${this.channelId}/${text}`}>{text}</this.Link>,
                    onCell: () => {
                        return {
                            style: {
                                maxWidth: 180,
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
            data: []

        }
    }
    componentWillReceiveProps(props) {
        // 当props改变的时候触发此函数
        this.setState({
            data: props.data
        })
    }
    render() {
        return (
            <Col xs={24} sm={12} className="jyHash">
                <div className="jyHashFFF">
                    <Table
                        rowKey={(record, index) => `${index}`}
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        pagination={false} />
                    <Button className="seeInfo" type="dashed">
                        <Link to="/point/jy">查看更多</Link>
                    </Button>
                </div>
            </Col>
        )
    }
}
