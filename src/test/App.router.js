import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
export class App extends Component {

    // 解决组件卸载之后组件更新的问题
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    render() {
        /* BrowserRouter
            可以挂载不同的路由组件
         */
        /* 
            Route 标签
                exact 精准匹配 无值
                动态路由 在this.props   path='/news/:id'
                get传值 在this.props    search获取数据
        */
        /* 
            Link 标签  
                to 字符串
            NavLink 标签
        */
        /* 
            Switch 只匹配一个路由
        */
        /* 
            组件卸载的问题
                在组件卸载之后不要更新状态 setState

        */
        /* 
            路由模块化
        */
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' Component={'aaaa'}></Route>
                    <Route exact path='/news/:id' Component={'aaaa'}></Route>
                    <Route exact path='/login/:id' Component={'aaaa'}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}