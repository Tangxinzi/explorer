import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './home.css'

import Situation from './situation/situation'
import Echarts from './echarts/echarts'
import JyHash from './jyHash/jyHash'
import QkHeight from './qkHeight/qkHeight'

import TokenData from './tokenData/tokenData'
import Detailed from './detailed/detailed'
import '../token/token.css'

import { Layout, Col, Row } from 'antd';
const { Content } = Layout;
export default class Home extends Component {
    constructor(props) {
        super(props)
        const time = +new Date('2019/05/20 00:00:00')
        let timer = ''
        const _that = this
        setInterval(function () {
            const currentTime = +new Date()
            timer = Math.ceil((currentTime - time))
            _that.setState({
                timer
            })
        }, 1000)
        this.state = {
            data: undefined,
            timer: '',
            data: [],
        }
    }
    componentDidMount() {
        let channelId = ''
        this.props.history.listen(e => {
            if (e.pathname.split('/')[1] === 'home') {
                this.getData(window.location.pathname.split('/')[2] || '0')
                return
            }
        })
        channelId = window.location.pathname.split('/')[2] || this.channelId
        this.getData(channelId)

    }
    // 解决组件卸载之后组件更新的问题
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    getData(channelId) {
        // 请求数据
        this.fetch.request({
            url: 'http://47.94.150.170:8080/v1/explorer/queryBlock',
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                channelId: channelId,
                page: "0",
                pageSize: "4",
                txNumber: '4'
            }
        }).then(res => {
            if (res.data.data.Code !== 200) {
                return
            }
            this.setState({
                data: res.data.data.Data
            })
        })
    }

    formatDuring(mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.ceil((mss % (1000 * 60)) / 1000)
        return days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒 ";
    }

    render() {
        const { Height, AccountNumber, AllTxNumber, TxNumber } = this.state.data
        const paramsData = {
            Height,
            AccountNumber,
            AllTxNumber,
            TxNumber
        }
        return (
            <div>
                {/* <Aside /> */}
                <Content className="section">
                    <Row className="sectionHeader"></Row>
                    <Row className="situationSurvey" Style="margin: 0; padding-bottom: 0;">
                      <Row className="card-body stats">
                        <Row>运行时间：{this.formatDuring(this.state.timer)}</Row>
                      </Row>
                    </Row>
                    <Row className="situationSurvey">
                      <Row className="card-body stats">
                        <Row className="card-body number">{Height}</Row>
                        <Row>区块高度</Row>
                      </Row>
                      <Row className="card-body stats">
                        <Row className="card-body number">
                          <this.Link to='/ContractHistoryByKey'>{AccountNumber}</this.Link>
                        </Row>
                        <Row>账号总数</Row>
                      </Row>
                      <Row className="card-body stats">
                        <Row className="card-body number">{TxNumber}</Row>
                        <Row>交易总量</Row>
                      </Row>
                      <Row className="card-body stats">
                        <Row className="card-body number">87</Row>
                        <Row>PEER节点数</Row>
                      </Row>
                    </Row>
                    <div className='detail' Style="margin-bottom: 20px; background: #FFF">
                        <Row className="content" Style="padding: 0" xs={24}>
                            <Row className="data">
                                <Route exact path="/" component={TokenData} />
                                <Route exact path="/detailed" component={Detailed} />
                                <Route exact path="/home" component={TokenData} />
                                <Route exact path="/home/detailed" component={Detailed} />
                            </Row>
                        </Row>
                    </div>
                    <Row className="sectionTop" Style="display: none">
                        <Col xs={24} sm={24}>
                            <Col span={17}>
                                <Row className="echartsTitle">交易统计</Row>
                            </Col>
                            <Col span={7}>
                                <Row span={12} className="echartsTitle" Style="text-align: right; padding: 0 25px 0 0;">运行时间：{this.formatDuring(this.state.timer)}</Row>
                            </Col>
                        </Col>
                        <Col span={24}>
                          <Echarts className="ant-col qkHeight ant-col-xs-24 ant-col-sm-12" />
                          <Echarts className="ant-col jyHash ant-col-xs-24 ant-col-sm-12" />
                        </Col>
                    </Row>
                    <Row className="sectionBottom">
                        <QkHeight data={this.state.data.Block} />
                        <JyHash data={this.state.data.TxArgs} />
                    </Row>
                </Content>
            </div>
        )
    }
}
