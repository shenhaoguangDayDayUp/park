// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import MintUI from 'mint-ui'
import 'vux/src/styles/reset.less';
import 'mint-ui/lib/style.css'
// Vue.use(MintUI)
import './style/reset.css'
import 'lib-flexible/flexible.js'
import  './style/globle.scss'
import store from '@/store'
import './filter'
import  { ToastPlugin,LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin,{
  type: "text",
  position: "middle",
  time: 2000
})
// Vue.use(MintUI)

// vee-validator
import VeeValidate, {Validator}  from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN'; 
Validator.addLocale(zh);
const config = {
  locale: 'zh_CN'
}; 
Vue.use(VeeValidate,config);

Vue.config.productionTip = false

/* eslint-disable no-new */
window.global = new Vue({
  el: '#app',
  data:{eventHub: new Vue()},
  router,
  store,
  components: { App },
  template: '<App/>'
})

