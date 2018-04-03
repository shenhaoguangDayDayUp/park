import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Password from '@/views/Password'
import GameCenter from '@/components/gameCenter'
import Main from '@/components/Main'
import PrizeCity from '@/components/prizeCity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
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
      path: '/gameCenter',
      name: 'gameCenter',
      component: GameCenter,
    },
    {
      path: '/prizeCity',
      name: 'PrizeCity',
      component: PrizeCity,
    }
  ]
})
