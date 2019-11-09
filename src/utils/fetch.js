import axios from '../utils/axios'


const javaUrl = ''
export const httpJa = (url, method, data) => axios.request({
    url: javaUrl + url,
    method,
    // headers: {
    //     'Content-type': 'application/json'
    // },
    data
})


// -----------------------------------华丽的分割线---------------------------------
const goUrl = 'http://47.94.150.170:8080'

export const httpGo = (url, method, data) => axios.request({
    url: goUrl + url,
    method,
    headers: {
        'Content-type': 'application/json'
    },
    data
})

// -----------------------------------华丽的分割线---------------------------------

export const http = (url, method, data) => axios.request({
    url,
    method,
    data
})
