import axios from 'axios';
import Api from './Apis';
let base = '/api'
// let base = 'http://192.168.1.192/gateway/mobile'

export const requestLogin = params => { return axios.put(`${base}/member/login`, params,).then(res => res); };

export const userRegister = params => { return axios.post(`${base}/member/register`,).then(res => res); };


export let loginApi = new Api('member','id',{
    login:{
        url: '/login',
        method: 'put'
    },
    register:{
        url: '/register',
        method: 'put' 
    }
})
export let getCodeApi = new Api('sms/validationCode','id',{
})









