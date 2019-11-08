import axios from 'axios'
import { message } from 'antd';
// import qs from 'qs'

// 创建axios实例
const service = axios.create({
    // baseURL: '',
    // timeout: 1000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
    config => {
        // if (config.method === 'post') {
        //     // config.data = JSON.stringify(config.data);
        //     // config.data = qs.stringify(config.data);
        //     // config.headers['Content-type'] = 'application/json'
        //     // config.headers['Content-type'] = 'application/x-www-form-urlencoded'
        // }
        // console.log(config)
        return config
    },
    error => {
        console.log('请求失败', error) // for debug
        Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            console.log(response)
        } else {
            return response.data
        }
    },
    error => {
        console.log('错误', error.message)
        message.error(error.message)
        return Promise.reject(error)
    }
)

export default service
