import React, { Component } from 'react';
import { Link, } from 'react-router-dom';

import { Col, Button, Table } from 'antd';
import './qkHeight.css'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '区块高度',
                    dataIndex: 'Height',
                    render: text => <this.Link to={`/search/${this.channelId}/${text}`}>{text}</this.Link>,
                    onCell: () => {
                        return {
                            style: {
                                minWidth: 100,
                                // overflow: 'hidden',
                                // whiteSpace: 'nowrap',
                                // textOverflow: 'ellipsis',
                                // cursor: 'pointer'
                            }
                        }
                    }
                },
                {
                    title: '区块Hash',
                    dataIndex: 'BlockHash',
                    render: text => <this.Link to={`/search/${this.channelId}/${text}`}>{text}</this.Link>,
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
                    }
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
            // <HashRouter>
            <Col xs={24} sm={12} className="qkHeight">
                <div className="qkHeightFFF">
                    <Table rowKey={(record, index) => `${index}`} columns={this.state.columns} dataSource={this.state.data} pagination={false} />
                    <Button className="seeInfo" type="dashed">
                        <Link to="/point/qk">查看更多</Link>
                    </Button>
                </div>
            </Col>
            // </HashRouter>
        )
    }
}
