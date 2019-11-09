import React, { Component } from 'react';
/* 
部署组件
*/
import './depoly.css'
import { notification, Form, Icon, Input, Button } from 'antd';
const { TextArea } = Input;

class Home extends Component {
    constructor() {
        super()
        this.state = {
            data: '',
            loadingOpen: false,
            formData: {}
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log(values)
            this.formData = values
            if (!sessionStorage.getItem('token')) {
                notification['warning']({
                    message: '警告',
                    description: '请先登录'
                })
                return
            }
            if (!err) {
                this.setState({
                    loadingOpen: true
                })
                // 请求数据
                this.fetch.request({
                    url: 'http://47.94.150.170:8080/v1/contract/FT_deployContract',
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: sessionStorage.getItem('token')
                    },
                    data: values
                }).then(res => {
                    this.setState({
                        loadingOpen: false
                    })
                    if (res.data.Code !== 200) return notification['error']({
                        message: '失败',
                        description: res.data.Message
                    })

                    notification['success']({
                        message: '成功',
                        description: res.data.Message
                    })

                })
            }
        });
    }
    handleChange(e) {
        // console.log(e.target.value)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 },
        };
        return (
            <div className='depoly'>
                <div className="depolytitle">合约部署<span style={{ fontSize: '14px', color: '#1890ff', fontWeight: '400' }}>(上传合约需要登录)</span></div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <Form.Item label="手机号" disbeld>
                        {getFieldDecorator('phone', {
                            initialValue: sessionStorage.getItem('user'),
                            rules: [{ required: true, message: 'Please input your phone!' }],
                        })(
                            <Input
                                disabled
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="login get phone"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="合约名">
                        {getFieldDecorator('ccName', {
                            initialValue: this.state.formData.ccName || '',
                            rules: [{ required: true, message: 'Please input your ccName!' }],
                        })(

                            < Input
                                onChange={(e) => this.handleChange(e)}
                                placeholder="合约名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="合约版本">
                        {getFieldDecorator('ccVersion', {
                            initialValue: this.state.formData.ccVersion || '',
                            rules: [{ required: true, message: 'Please input your ccVersion!' }],
                        })(

                            < Input placeholder="合约版本" />,
                        )}
                    </Form.Item>
                    <Form.Item label="合约内容">
                        {getFieldDecorator('deploy', {
                            initialValue: this.state.formData.deploy || '',
                            rules: [{ required: true, message: 'Please input your deploy!' }],
                        })(

                            <TextArea rows={8}
                                placeholder="合约内容" />
                        )}
                    </Form.Item>
                    <Form.Item label="合约介绍">
                        {getFieldDecorator('ccIntroduced', {
                            initialValue: this.state.formData.ccIntroduced || '',
                            rules: [{ required: true, message: 'Please input your ccIntroduced!' }],
                        })(
                            < Input placeholder="合约介绍" />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.state.loadingOpen}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ marginRight: '20px' }}>部署合约</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
let Homes = Form.create({})(Home);
export default Homes