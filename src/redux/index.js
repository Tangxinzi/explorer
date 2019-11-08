import { createStore } from "redux";
import reducers from './reducers'

// 在谷歌进行调试
const devToolsExtension = window.window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => { }


/**
 * 第一步,创建createstore, 将 reduce 传入
 */
export default (init) => {
    return createStore(
        reducers,
        init,
        devToolsExtension // 调试工具
    )
}


/**
 *  store  是redux提供的唯一数据源，它存储了整个应用的state，并且提供了获取state的方法，即store.getState()
 *
    action 用于描述已发生事件的普通对象 就是“你干了一件什么事情”。 但是单单讲了你干的事情，我们并不知道你干的这件事产生了什么牛逼效果
            于是有了一个专门负责描述某个行动对应产生某种效果的机构，叫做 reducer

    reducer 接收state和action，并返回新的state的函数

    dispatch

    middleware


    combineReducers



    babel-plugin-transform-decorators-legacy   connect装饰器
 */