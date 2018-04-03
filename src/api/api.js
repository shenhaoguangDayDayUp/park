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
    }
})
export let integralApi = new Api('account/balance','id',{
    account:{
        url: 'CRD',
        method: 'get'
    },
})
export let getCodeApi = new Api('sms/validationCode','id',{

})









