import Vue from 'vue'
import Header from './Header';
import Dialog from './Dialog';
Header.install = function(Vue){
    Vue.component(Header.name,Header);
}
Vue.use(Header);
Dialog.install = function(Vue){
    Vue.component(Dialog.name,Dialog);
}
Vue.use(Dialog);