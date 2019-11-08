
import React, { Component } from 'react';
import * as reactRouterDom from 'react-router-dom';
// import { createBrowserHistory } from "history"
import toRouter from '../router/index'

import axios from 'axios'
// 过滤器
import { timestampToTime } from '../utils/util'

Component.prototype.fetch = axios
Component.prototype.time = timestampToTime // 时间过滤器
Component.prototype.channelId = sessionStorage.getItem('channelId') || '0' // 区分两条链的channelId值  在header中点击 通道切换按钮 更换该值
// 讲react-router-dom的方法挂载到原型上 不用每次都引入
Object.keys(reactRouterDom).map(keys => {
    return Component.prototype[keys] = reactRouterDom[keys]
})

// console.log(Component.prototype)

class MRoute extends Component {
    render() {
        // console.log(toRouter)
        return (
            <this.BrowserRouter>
                <this.Switch>
                    {/* {() => { console.log(toRouter) }} */}
                    {toRouter.map((v, i) => (<this.Route key={i} path={v.path} component={v.component} />))}
                </this.Switch>
            </this.BrowserRouter>
        );
    }
}

export default MRoute;