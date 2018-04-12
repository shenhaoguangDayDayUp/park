import axios from 'axios';
import Api from './Apis';
let base = '/api'

export let loginApi = new Api('member','id',{
    login:{
        url: 'login',
        method: 'put',
    },
    register:{
        url: 'register',
        method: 'post' ,
    },
    reset:{
        url:'password', // 修改密码
        method:'put',
    },
    entity:{
        url:'entity/session', // 会员详情
        method: 'get',
    },
    receivers:{
        url:'receivers', // 收货地址
        method:'get'
    },
    receiversUpdate:{
        url:'receivers', // 增加收货地址
        method:'post'
    },
    receiversDel:{
        url:'receivers', // 删除收货地址
        method:'delete'
    },
    receiversEdit:{
        url:'receivers', // 编辑收货地址
        method:'put'
    },
    receiversFind:{
        url:'receivers/{id}', // 查询收货地址
        method:'get'
    }
})
export let integralApi = new Api('account','id',{
    account:{
        url: 'balance/CRD', // 积分查询
        method: 'get',
    },
})
export let getCodeApi = new Api('sms','id',{
    getcode:{
        url:'validationCode/{id}',
        method: 'get',
    }
})









