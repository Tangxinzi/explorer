
import React, { Component } from 'react';
import { message, Card, Form, Icon, Input, Button } from 'antd';
// 引入路由组件
import { Link } from 'react-router-dom';

class LoginFrom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingOpen: false
        }
    }
    componentWillMount() {
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loadingOpen: true
                })
                // 请求数据
                this.fetch.request({
                    url: 'http://47.94.150.170:8080/v1/user/login',
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: {
                        ...values,
                        smsCode: ''
                    }
                }).then(res => {
                    this.setState({
                        loadingOpen: false
                    })
                    if (res.data.data.Code !== 200) return message.error(res.data.data.Message)
                    // console.log(res)
                    // 当前储存 推出浏览器之后清除user信息
                    sessionStorage.setItem('token', res.data.Authorization)
                    sessionStorage.setItem('user', res.data.data.Data.Phone)
                    sessionStorage.setItem('TokenAddress', res.data.data.Data.TokenAddress)
                    message.success(res.data.data.Message);
                    this.props.history.push('/home')
                    // this.props.history.goBack();

                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="登录"
                style={{
                    width: 500,
                    margin: '300px auto',
                }} hoverable>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Please input your phone!' }],
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
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.state.loadingOpen}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ marginRight: '20px' }}>登录</Button>
                        <Button>
                            <Link to="/register">注册</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
let LoginForm = Form.create({})(LoginFrom);
export default LoginForm;
