// import { lazy } from 'react'

// 引入一级路由
// import App from '../routes/App';
// import Login from '../components/login';
// import Register from '../components/register';


// 引入二级路由
// import children from './children'
// const App = lazy(() => import('../routes/App'))
// const Login = lazy(() => import('../components/login'))
// const Register = lazy(() => import('../components/register'))

import loadable from './withLoadable'
const App = loadable(() => import('../routes/App'))
const Login = loadable(() => import('../components/login'))
const Register = loadable(() => import('../components/register'))

export default [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/',
        component: App,
        // children
    },
]