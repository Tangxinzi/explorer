import {
    // httpJa,
    httpGo
} from '../utils/fetch'


// export const register = (data = null) => httpJa('/gdbUser/h5register', 'post', data)
export const register = (data = null) => httpGo('/v1/user/register', 'post', data)
export const sendSms = (data = null) => httpGo('/v1/user/sendSms', 'post', data)
export const updOss = (data = null) => httpGo('/v1/oss/putStringFile', 'post', data)
export const createAccount = (data = null) => httpGo('/v1/token/createAccount', 'post', data)
export const getContractList = (data = null) => httpGo('/v1/contract/getContractList', 'get', data)
export const getKeystore = (data = null) => httpGo(`/v1/oss/getStringFile`, 'post', data)
export const getContractHistoryByKey = (data = null) => httpGo(`/v1/user/getContractHistoryByKey`, 'post', data)
