import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Password from '@/views/Password'
import GameCenter from '@/components/gameCenter'
import Main from '@/components/Main'
import PrizeCity from '@/components/prizeCity'
import store from '../store'
Vue.use(Router)

const route =new Router({
    scrollBehavior (to, from, savedPosition) {
        setTimeout(() => {
          if (savedPosition) {
            // console.log(to)
            // console.log(savedPosition)
            // console.log(to.matched.some(m => m.meta.scrollToTop))
              if(to.matched.some(m => m.meta.scrollToTop)){
                scrollTo(0, 0)
                return { x: 0, y: 0 }
              }
         
              console.log(savedPosition.y)
        
              scrollTo(0, savedPosition.y+1000)
              return savedPosition
         
          } else {
                scrollTo(0, 0)
            return { x: 0, y: 0 }
          }
        }, 1000)
    },
  routes: [
    {
      path: '/',
      component: () => import('@/components/common/Layout.vue'),
      redirect: '/gameCenter',
      children: [
        {
          path: '/main',
          name: 'Main',
          meta:{
            scrollToTop:true
          },
          component: Main,
        },
        {
          path: '/gameCenter',
          name: 'gameCenter',
          meta:{
            scrollToTop:true
          },
          component: () => import('@/components/gameCenter'),
        },
        {
          path: '/prizeCity',
          name: 'PrizeCity',
          component:   () => import('@/components/prizeCity'),
        },
        {
          path: '/change',
          name: 'change',
          meta:{
            scrollToTop:true
          },
          component: () => import('@/components/change/Change.vue'),
        },
        {
          path: '/message',
          name: 'Message',
          meta:{
            scrollToTop:true
          },
          component: () => import('@/components/main/Message'),
        },
        {
          path: '/entity',
          name: 'Entity',
          meta:{
            scrollToTop:true
          },
          component: () => import('@/components/main/Entity'),
        },
      ]
    },
    {
      path: '/rightChange',
      name: 'rightChange',
      meta:{
        scrollToTop:true
      },
      component:   () => import('@/components/priceCity/RightChange.vue'),
    },
    {
      path: '/order',
      name: 'order',
      meta:{
        scrollToTop:true
      },
      props: route => { return { showButton: false}},
      component:   () => import('@/components/priceCity/order.vue'),
    },
    {
      path: '/order/list',
      name: 'orderLsit',
      meta:{
        scrollToTop:true
      },
      component:   () => import('@/components/priceCity/OrderList.vue'),
    },  
    {
      path: '/prizeCity/detail/:id',
      name: '商品详情',
      meta:{
        scrollToTop:true
      },
      component:   () => import('@/components/priceCity/PriceCityDetail.vue'),
    },
    {
      path: '/heart/list',
      name: 'heart',
      meta:{
        scrollToTop:true
      },
      component:   () => import('@/components/priceCity/heart/Heart.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      meta:{
        scrollToTop:true
      },
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      meta:{
        scrollToTop:true
      },
      component: Register,
    },
    {
      path: '/password',
      name: 'Password',
      meta:{
        scrollToTop:true
      },
      component: Password,
    },
    {
      path: '/passwordSetRedeem',
      name: 'PasswordSetRedeem',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/PasswordSetRedeem'),
    },
    {
      path: '/passwordSet',
      name: 'PasswordSet',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/PasswordSet'),
    },
    {
      path: '/receivers',
      name: 'Receivers',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/Receivers'),
    },
    {
      path: '/receiversUpdate',
      name: 'ReceiversUpdate',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/ReceiversUpdate'),
    },
    {
      path: '/receiversList',
      name: 'ReceiversList',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/ReceiversList'),
    },
    {
      path: '/messageDetail',
      name: 'MessageDetail',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/MessageDetail'),
    },
    {
      path: '/rename',
      name: 'Rename',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/Rename'),
    },
    {
      path: '/reMessage',
      name: 'ReMessage',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/ReMessage'),
    },
    {
      path: '/avatar',
      name: 'Avatar',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/main/avatar'),
    },
    {
      path: '/charge',
      name: 'charge',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/charge/Charge.vue'),
    },
    {
      path: '/changeStatus',
      name: 'changeStatus',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/charge/ChargeStatus.vue'),
    },
    {
      path: '/gameDetail',
      name: 'gameDetail',
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/gameCenter/gameDetail.vue'),
    },
    { 
      path: '*', 
      meta:{
        scrollToTop:true
      },
      component: () => import('@/components/NotFound.vue') 
    },
  ]
})


route.beforeEach(function (to, from, next) {
  Vue.$$message.confirm.hide()
  // store.dispatch('toggleLoadingStatus', {isLoading: true})
  next()
})

route.afterEach(function (to) {
  // setTimeout(()=>{
  //   store.dispatch('toggleLoadingStatus', {isLoading: false})
  // },500)

})



export default route