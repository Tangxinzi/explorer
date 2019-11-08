import React, { Component } from 'react';

import './situation.css'
import { Row, Col } from 'antd';
export default class Home extends Component {
    constructor(props) {
        const time = +new Date('2019/05/20 00:00:00')
        super(props)
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
            timer: ''
        }
    }
    componentWillReceiveProps(props) {
        // 当props改变的时候触发此函数
        this.setState({
            data: props.data
        })
    }
    // 解决组件卸载之后组件更新的问题
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    formatDuring(mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.ceil((mss % (1000 * 60)) / 1000)
        return days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒 ";
    }

    render() {
        const { Height, AccountNumber, AllTxNumber, TxNumber } = this.props
        return (
            <Col xs={24} sm={12} className='situation'>
                <Row className="situationTitle">全网概况</Row>
                <Row className='qkTxt'>
                    <Col span={12}>
                        <Row>区块高度</Row>
                        <Row>{Height}</Row>
                        <Row>交易总量</Row>
                        <Row>
                            {AllTxNumber}
                        </Row>
                        <Row>运行时间</Row>
                        <Row>{this.formatDuring(this.state.timer)}</Row>
                    </Col>
                    <Col span={12}>
                        <Row>账号总数</Row>
                        <Row >
                            <this.Link to='/ContractHistoryByKey'>{AccountNumber}</this.Link>
                        </Row>
                        <Row>当前通道交易总量</Row>
                        <Row>{TxNumber}</Row>
                        <Row>peer节点数</Row>
                        <Row>87</Row>
                    </Col>
                </Row>
            </Col>
        )
    }
}
