// 引入页面
// import Homes from '../view/home/home'
// import Point from '../view/point/point'
// import Contract from '../view/contract/contract'
// import Token from '../view/token/token'
// import SearchList from '../view/search/search'
// import SearchHashList from '../view/search/detailed'
// import SearchName from '../view/search/searchName'
// import ContractHistoryByKey from '../view/ContractHistoryByKey'

import loadable from './withLoadable'
const Homes = loadable(() => import('../view/home/home'))
const Point = loadable(() => import('../view/point/point'))
const Contract = loadable(() => import('../view/contract/contract'))
const Token = loadable(() => import('../view/token/token'))
const SearchList = loadable(() => import('../view/search/search'))
const SearchHashList = loadable(() => import('../view/search/detailed'))
const SearchName = loadable(() => import('../view/search/searchName'))
const ContractHistoryByKey = loadable(() => import('../view/ContractHistoryByKey'))

// const Homes = loadable(() => import('../view/home/home'))

export default [
    { path: '/home', component: Homes },
    { path: '/point', component: Point },
    { path: '/contract', component: Contract },
    { path: '/token', component: Token },
    { path: '/search', component: SearchList },
    { path: '/searchHash', component: SearchHashList },
    { path: '/searchName', component: SearchName },
    { path: '/ContractHistoryByKey', component: ContractHistoryByKey },
    // 默认跳转
    // { path: '/', redirect: '/home' }
    { path: '/', component: Homes }
]