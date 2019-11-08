import React, { Component } from 'react';
/* 
    节点页面
*/
import Qk from './qk'
import Jy from './jy'

import './point.css'

export default class Home extends Component {
    render() {
        let data
        if (window.location.pathname.split('/')[2] === 'qk') {
            data = (<Qk />)
        } else {
            data = (<Jy />)
        }
        return (
            <div className="point">
                {data}
            </div>
        )
    }
}