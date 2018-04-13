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
    logout:{
        url: 'logout',
        method: 'put' ,
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
    },
    receiversDefault:{
        url:'receivers/favorite', // 获取默认地址
        method:'get'
    },
    receiversSetDefault:{
        url:'receivers/favorite/{id}', // 设置默认地址
        method:'put'
    },
    nickname:{
        url:'nickname', // 修改昵称
        method:'put'
    }
})

// 地址操作
// export let receiverlApi = new Api('receivers','id')
// integralApi.create().then(re)
// integralApi.delete().then(re)

export let integralApi = new Api('account','id',{
    account:{
        url: 'balance/CRD', // 积分查询
        method: 'get',
    },
})
export let getCodeApi = new Api('sms','id',{
    getcode:{
        url:'validationCode/{id}', // 手机动态码
        method: 'get',
    }
})
export let getMsgApi = new Api('message/','id',{
    getMsg:{
        url:'size/unread', // 未读消息数量
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
//订单相关
export let orderCheckOutApi = new Api('store/order','id',{
    checkout:{//订单结算
        url:'checkout',
        method: 'post'
    },
    entity:{//订性详情
        url:'entity/{id}',
        method: 'get'  
    },
    place:{//订单提交
        url:'place',
        method: 'post'    
    },
    payment:{
        url:'payment/{id}',
        method: 'put'    
    },
    cancel:{
        url:'cancel/{id}',
        method: 'put'     
    }
})

//订单清单

export let orderListApi = new Api('store/order/list','id',{
    all:{//订单结算
        url:'all/{id}',
        method: 'get'
    },
    unreceived:{
        url:'unreceived/{id}',
        method: 'get'  
    },
    unpaid:{
        url:'unpaid/{id}',
        method: 'get'    
    }, 
})












