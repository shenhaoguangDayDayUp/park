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
import VueLazyLoad from 'vue-lazyload'

import outside from './directives/outside.js';
import $config from '@/api/config'

Vue.use(VueLazyLoad,{
    error:'./static/zhanwei2@1x.png',
    loading:'./static/zhanwei2@1x.png',
    preLoad: 1.3,
    attempt: 1,
    try: 2
})
Vue.use(LoadingPlugin)

Vue.use(ToastPlugin,{
  type: "text",
  position: "middle",
  time: 2000
})
import  './components/common'

import clipper from '../static/clipper'
  Vue.config.productionTip = false
  Vue.use(clipper)
Vue.config.productionTip = false;


(function(){ //消除正式环境的所有console.log
  var log = console.log;
  console.log = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      $config.env.NODE_ENV != 'production' && log.apply(console, args);
  };
})();

/* eslint-disable no-new */
window.global = new Vue({
  el: '#app',
  data:{eventHub: new Vue()},
  router,
  store,
  components: { App },
  template: '<App/>'
})

