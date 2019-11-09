import React, { Component } from 'react';


import '../../style/footer.css'
import { Layout } from 'antd';
const { Footer } = Layout;


export default class Home extends Component {
    render() {
        return (
            <Footer className='footer'>
                <div className="section">
                    <div className="img">
                        <img src={[require('../../assets/img/code.jpg')]} alt="" />
                    </div>
                    <div className="text">
                        <p>地址：北京市朝阳区北四环东路133好嘉华大厦八层</p>
                        <p>联系电话：400-699-0360</p>
                        <p>京ICP公网安备份</p>
                        <p>Copyright©2010 - 2019 版权所有</p>
                    </div>
                </div>
            </Footer>
        )
    }
}
