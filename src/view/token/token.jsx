import React, { Component } from 'react';
/*
    token页面
*/
// 引入路由组件
import { Route } from 'react-router-dom';
import TokenData from './tokenData/tokenData'
import Detailed from './detailed/detailed'
import './token.css'
import { Row } from 'antd';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    render() {
        return (
            <div className='token'>
                <Row className="explain">Token</Row>
                <Row className="content" xs={24}>
                    <Row className="data">
                        <Route exact path="/token" component={TokenData} />
                        <Route exact path="/token/detailed" component={Detailed} />
                    </Row>
                </Row>
            </div>

        )
    }
}
