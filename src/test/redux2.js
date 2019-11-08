import { createStore } from 'redux'

/* 
    createStore 创建商店
*/
/* 
    reduce 规则 函数 
*/


const reduce = (state = 0, action) => { // 返回一个新的state
    switch (action.type) {
        case 'a':
            return 'aaa'
        case 'b':
            return 'bbb'
        case 'c':
            return 'ccc'
        default:
            return '打酱油'
    }
}

const store = createStore(reduce) //接收一个纯函数

// console.log(store.getState())


// 订阅模式
const listener = () => {
    const getCurrent = store.getState()
    console.log('现在的状态是' + getCurrent)
}
store.subscribe(listener)

// 派发事件 传递 action
store.dispatch({
    type: 'a'
})

store.dispatch({
    type: 'b'
})

store.dispatch({
    type: 'c'
})













