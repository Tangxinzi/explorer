
import React, { Component } from 'react';

// 引入路由组件
import { withRouter } from 'react-router-dom';

// 引入路由
import toRouter from '../router/children'

import { getKeystore } from '../api'
import { decryptByDES, fromEncryptedJson } from '../utils/ethers'

import '../style/header.css';
import { Layout, Dropdown, Button, Icon, Input, Row, Col, Menu, Modal, message } from 'antd';
const { Header } = Layout;
const { Search, TextArea } = Input;


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'home',
            loading: false,
            user: sessionStorage.getItem('user'),
            searchOpen: 0,
            visible: false,
            privateKey: '',
            TokenAddress: '',
            pwdVal: ''
        };
    }
    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };
    componentDidMount() {
        this.setState({
            current: window.location.pathname.split('/')[1]
        })
    }

    // 导出私钥
    handleOk = (e) => {
        this.setState({
            loading: true
        })
        const _that = this
        const {
            pwdVal,
            TokenAddress
        } = this.state
        if (!pwdVal) return message.warning('请输入密码')
        // var TokenAddress = "0x4b6A3819f609358885F5830eC61f9fA73Ab93003"
        getKeystore({
            url: `https://jiankanglian.oss-cn-beijing.aliyuncs.com/keystore/${TokenAddress.toLowerCase()}`
        }).then(res => {
            // 解密keystore
            if (res.data.Code !== 200) return (message.error(res.data.Message), this.setState({
                loading: false
            }))
            const json = decryptByDES(res.data.Data)
            fromEncryptedJson(json, pwdVal).then(function (wallet) {
                const { privateKey } = wallet
                _that.setState({
                    privateKey,
                    loading: false
                })
            }, function (error) {
                console.log(error)
                message.error('密码输入错误')
                _that.setState({
                    loading: false
                })
            })
        }).catch(err => {
            message.error('导出失败')
        })


    }
    showModal = () => {
        if (!this.state.TokenAddress) return message.error('钱包地址为空');
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    copy = () => {
        const input = this.refs.privateKey.textAreaRef
        input.select()
        document.execCommand("copy")
        message.success('复制成功')
    }
    // 通道切换
    DropdownFn(e = 0) {
        this.setState({
            searchOpen: e
        })
        Component.prototype.channelId = `${e}`
        sessionStorage.setItem('channelId', `${e}`) // 存到seesion中  防止刷新回归初始值 在header页面获取次session 重新赋值
        this.props.history.push(`/home/${e}`)
    }
    componentWillMount() {
        const TokenAddress = sessionStorage.getItem('TokenAddress')
        this.setState({
            TokenAddress,
            searchOpen: Number(this.channelId)
        })
    }

    // 搜索按钮
    searchFn(v, e = 0) {
        let channelId = this.channelId
        if (v.length === 42) {
            channelId = 0
        }
        this.props.history.push(`/search/${channelId}/${v}`)
    }

    // 退出当前账号
    handleLogOut() {
        this.setState({
            user: ''
        })
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }

    password = (e) => {
        this.setState({
            pwdVal: e.target.value
        })
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item disabled={!this.state.searchOpen} key="1" onClick={() => this.DropdownFn(0)}>
                    <Icon type="user" />
                    Token-Channel
                </Menu.Item>
                <Menu.Item disabled={!!this.state.searchOpen} key="2" onClick={() => this.DropdownFn(1)}>
                    <Icon type="user" />
                    Contract-Channel
                </Menu.Item>
            </Menu>
        );
        const menu2 = (
            <Menu>
                <Menu.Item onClick={this.showModal} key="1">
                    {/* <Icon type="user" /> */}
                    导出私钥
                </Menu.Item>
            </Menu>
        );
        let userMessage
        if (!this.state.user) {
            userMessage = (
                <span>
                    <span className="login">
                        <this.Link to="/login">登录</this.Link>
                    </span>
                    <span className="register">
                        <this.Link to="/register">注册</this.Link>
                    </span>
                </span>
            )
        } else {
            userMessage = (
                <span>
                    <span Style="cursor: pointer" onClick={this.showModal.bind(this)}>导出私钥</span>
                    <Modal
                        title="输入密码导出私钥"
                        cancelText="取消"
                        okText="确定"
                        confirmLoading={this.state.loading}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Input.Password style={{ marginBottom: 10 }} placeholder="输入密码点击确定" value={this.state.pwdVal} onChange={this.password} />
                        <TextArea
                            ref='privateKey'
                            placeholder='在此展示私钥'
                            value={this.state.privateKey}
                            autosize={{ minRows: 3 }}
                        />
                        <Button onClick={this.copy} style={{ marginTop: 10 }}>复制私钥</Button>
                    </Modal>
                    <span className='logout' onClick={this.handleLogOut.bind(this)}>退出登录</span>
                </span>
            )
        }
        return (
            <div>
                <div className="wrapper">

                    <Header className="colorfff header">
                        <Row className="antdrow">
                            <Col className="logname" span={10}>
                                <div className="lognameimg flex">
                                    <img src={[require('../assets/img/logo.jpg')]} alt=""
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                            borderRadius: '5px',
                                            boxShadow: '0 0 15px rgba(125, 125, 125, 0.18)'
                                        }} />
                                </div>
                                绿钻信用
                            </Col>
                            <Col span={14}>
                                <div className="headertitleright">
                                    {userMessage}
                                </div>
                            </Col>
                        </Row>
                        <Row className='media' style={{ height: '57px' }}></Row>
                        <Row>
                            <Col md={14} xs={24} sm={14}>
                                <Menu
                                    onClick={this.handleClick}
                                    selectedKeys={[this.state.current]}
                                    mode="horizontal">
                                    <Menu.Item key="home">
                                        <this.Link to="/home">首页</this.Link>
                                    </Menu.Item>
                                    <Menu.Item key="token">
                                        <this.Link to="/token">TOKEN</this.Link>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col className='searchMedia' span={10}>
                                <Search
                                    className="headerserch"
                                    placeholder="区块、交易ID / 区块Hash"
                                    onSearch={(v, e) => this.searchFn(v, e)}
                                />
                            </Col>
                        </Row>
                    </Header>
                </div>
                <div className="section">
                    <this.Switch>
                        {/* {() => { console.log(toRouter) }} */}
                        {toRouter.map((v, i) => {
                            if (v.component) return (<this.Route key={i} path={v.path} component={v.component} />)
                            else return (<this.Route key={i} path={v.path} render={() => <this.Redirect to={v.redirect} />} />)
                        })}

                    </this.Switch>
                </div>
            </div>
        )
    }
}
export default withRouter(Home)
// export default Home
