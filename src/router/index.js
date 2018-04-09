import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Password from '@/views/Password'
import GameCenter from '@/components/gameCenter'
import Main from '@/components/Main'
import PrizeCity from '@/components/prizeCity'
import Message from '@/views/Message'
import Receivers from '@/views/Receivers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/common/Layout.vue'),
      redirect: '/main',
      children: [
        {
          path: '/main',
          name: 'Main',
          component: Main,
        },
        {
          path: '/gameCenter',
          name: 'gameCenter',
          component: () => import('@/components/gameCenter'),
        },
        {
          path: '/prizeCity',
          name: 'PrizeCity',
          component:   () => import('@/components/prizeCity'),
        },
        
        {
          path: '/message',
          name: 'Message',
          component: Message,
        },
      ]
    },
    {
      path: '/rightChange',
      name: 'rightChange',
      component:   () => import('@/components/priceCity/RightChange.vue'),
    },
    {
      path: '/order',
      name: 'order',
      props: route => { return { showButton: false}},
      component:   () => import('@/components/priceCity/order.vue'),
    },
    {
      path: '/order/list',
      name: 'orderLsit',
      component:   () => import('@/components/priceCity/OrderList.vue'),
    },  
    {
      path: '/prizeCity/detail/:id',
      name: '商品详情',
      component:   () => import('@/components/priceCity/PriceCityDetail.vue'),
    },
    {
      path: '/heart/list',
      name: 'heart',
      component:   () => import('@/components/priceCity/heart/Heart.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/password',
      name: 'Password',
      component: Password,
    },
    {
      path: '/receivers',
      name: 'Receivers',
      component: Receivers,
    },
  ]
})
