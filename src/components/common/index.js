import Vue from 'vue'
import Header from './Header';
Header.install = function(Vue){
    Vue.component(Header.name,Header);
}
Vue.use(Header);