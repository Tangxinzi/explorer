import React, { Component } from 'react';
/* 
    searchHash页面
*/
import { Row, Col } from 'antd';
import { Descriptions, Table } from 'antd';
export default class Home extends Component {
    constructor(props) {
        super(props)
        // console.log('携带的数据', props.location.state)
        this.state = {
            locationData: props.location.state,
            data: [],
            query: {
                tokenKey: props.location.state.TokenKey,
                account: props.location.state.account,
                start: '0',
                end: '10'
            },
            columns: [
                {
                    title: '交易ID',
                    dataIndex: 'Txid',
                    key: 1,
                    render: text => <this.Link to={`/search/0/${text}`}>{text}</this.Link>
                },
                {
                    title: '时间',
                    dataIndex: 'Time',
                    key: 2,
                    render: text => this.time(text)
                },
                {
                    title: '交易数量',
                    dataIndex: 'Value',
                    key: 3,
                    render: text => JSON.parse(text).Amount
                },
            ],
        }
    }
    componentWillMount() {
        this.getData(this.state.query)

    }
    getData(obj) {
        // 请求数据
        // console.log(obj)
        this.fetch.request({
            url: 'http://47.94.150.170:8080/api/v1/token/userTokenRecord',
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: obj
        }).then(res => {
            this.setState({
                loadingOpen: false
            })
            console.log(res.data)
            if (res.data.data.Code !== 200) {
                return
            }
            this.setState({
                data: res.data.data.Data
            })
        })
    }
    render() {
        var data = this.state.locationData
        var list = this.state.data
        return (
            <div className='point'>
                <Row>
                    <Col span={12}>
                        <Descriptions title="账户持有人" column={1}>
                            <Descriptions.Item label="账户持有人">{data.account}</Descriptions.Item>
                            <Descriptions.Item label="是否冻结">{data.Frozen ? "是" : "否"}</Descriptions.Item>
                        </Descriptions>

                    </Col>
                    <Col span={12}>
                        <Descriptions title="代币地址" column={1}>
                            <Descriptions.Item label="代币Key">
                                <this.Link to={{
                                    pathname: `/token/detailed`,
                                    state: data,
                                }}>{data.TokenKey}</this.Link>
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <br />
                <Table
                    rowKey={(record, index) => `${index}`}
                    columns={this.state.columns}
                    dataSource={list}
                    pagination={false} />
            </div >
        )
    }
}