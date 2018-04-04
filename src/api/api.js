import axios from 'axios';
import Api from './Apis';
let base = '/api'

export let loginApi = new Api('member','id',{
    login:{
        url: 'login',
        method: 'put'
    },
    register:{
        url: 'register',
        method: 'put' 
    },
    reset:{
        url:'password',
        method:'put'
    },
    entity:{
        url:'entity/session',
        method: 'get'
    }
})
export let integralApi = new Api('account','id',{
    account:{
        url: 'balance/CRD',
        method: 'get',
    },
})
export let getCodeApi = new Api('sms/validationCode','id',{

})









