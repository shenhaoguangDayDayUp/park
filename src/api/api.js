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
        url:'password',
        method:'put',
    },
    entity:{
        url:'entity/session', // 会员详情
        method: 'get',
    }
})
export let integralApi = new Api('account','id',{
    account:{
        url: 'balance/CRD', // 积分
        method: 'get',
    },
})
export let getCodeApi = new Api('sms','id',{
    getcode:{
        url:'validationCode/{id}',
        method: 'get',
    }
})
//商品首页相关
export let getAllProductApi = new Api('store/product','id',{ 
    getList:{
        url:'list/{id}',
        method: 'get',
    },
    getDetail:{
        url:'entity/{id}',
        method: 'get',
    }
})
//心愿单相关
export let heartCartApi = new Api('store/cart','id',{
    addOrdel:{
        url:'item',
        method: 'post',
    },
    entity:{//心愿单列表
        url:'entity',
        method: 'get', 
    },
    deleteProduct:{
        url:'item',
        method: 'delete',
    }
   
})










