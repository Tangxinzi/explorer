
import React, { Component } from 'react';
import {
    Card,
    Form,
    Icon,
    Input,
    Button,
    Row,
    Col,
    message
} from 'antd';
// 引入路由组件
import { Link } from 'react-router-dom';
import '../style/other.css';

import {
    register,
    sendSms,
    updOss,
    // createAccount
} from '../api/index'
import { wallet, keystory, encryptByDES } from '../utils/ethers'
// import { connect } from "react-redux";
// import { add } from '../redux/connect'


// @connect(steat => ({ steat }), { add })
class LoginFrom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingOpen: false,
        }
    }

    componentWillMount() {

    }

    // 注册按钮
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return
            const createwallet = wallet()
            this.setState({
                loadingOpen: true
            })
            // console.log(createwallet.signingKey.publicKey)
            const data = {
                ...values,
                publicKey: createwallet.signingKey.publicKey,
                // to: createwallet.address,
                HXin: 'true',
                code: ''
            }
            // 请求数据
            register(data).then(res => {
                this.setState({
                    loadingOpen: false
                })
                console.log(res)
                if (!res.data.Status) return message.error(res.data.Message)
                this.ajax(createwallet, values.password)
                message.success('注册成功')
            })
        });
    };

    ajax = (wallet, pwd) => {
        keystory(wallet, pwd).then(json => {
            const str = encryptByDES(json)
            updOss({
                fileName: wallet.address,
                fileContent: str
            }).then(res => {
                console.log(res)
                if (res.data.Code !== 200) return message.success(res.data.Message)
                // sessionStorage.setItem('download', res.data.Data)
            })
        })
        // createAccount({
        //     publicKey: wallet.signingKey.publicKey
        // }).then(res => {
        //     console.log(res)
        // })
    }

    // 获取验证码
    getMsCode() {
        this.props.form.validateFields(['phone'], (err, values) => {
            if (err) return
            this.setState({
                loadingOpen: true
            })
            // 请求数据
            sendSms(values).then(res => {
                // console.log(res)
                this.setState({
                    loadingOpen: false
                })
                if (res.data.Code !== 200) return message.error(res.data.Message)
                message.success(res.data.Message)
            })

        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <>
            <img src={[require('../assets/img/logo.jpg')]} alt="" className="user-logo" />
            <div className="user-title">绿钻信用</div>
            <Card title="注册"
                style={{
                    width: 500,
                    margin: '0 auto',
                }} hoverable>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            initialValue: '',
                            rules: [{ required: true, message: '请输入手机号' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="phone"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            initialValue: '',
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="password"
                            />,
                        )}
                    </Form.Item>
                    {/* <Form.Item>
                        {getFieldDecorator('publicKey', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your publicKey!' }],
                        })(
                            <Input
                                prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="publicKey"
                            />,
                        )}
                    </Form.Item> */}
                    <Form.Item>
                        <Row>
                            <Col span={14}>
                                {getFieldDecorator('smsCode', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请输入验证码' }],
                                })(<Input
                                    prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="smsCode" />)}
                            </Col>
                            <Col span={10} style={{
                                paddingLeft: '10px'
                            }}>
                                <Button loading={this.state.loadingOpen}
                                    onClick={() => this.getMsCode()}>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.state.loadingOpen}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ marginRight: '20px' }}>注册</Button>
                        <Button>
                            <Link to="/login">登录</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
          </>
        )
    }
}

// LoginFrom = connect(steat => ({ steat }), { add })(LoginFrom)
let LoginForm = Form.create({})(LoginFrom);
export default LoginForm;
