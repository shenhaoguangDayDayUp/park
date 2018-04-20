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
import ToastComponent from './Toast.vue'



let $vm
const plugin = {
    install (vue, options = {}) {
      const Confirm = vue.extend(ToastComponent)
  
      if (!$vm) {
        $vm = new Confirm({
          el: document.createElement('div'),
          propsData: {
            title: ''
          }
        })
        document.body.appendChild($vm.$el)
      }
  
      const confirm = {
        show (options) {
            $vm.showToast = true
          $vm= Object.assign($vm,options) 
          $vm.$off('cancel')
          $vm.$off('success')
          $vm.$on('cancel', () => {
         
          })
          $vm.$on('success', msg => {
             return new Promise((resolve,reject)=>{
                options.confirm(window.global ,resolve)
             }).then(()=>{
                $vm.showToast = false;
             })
      
           
          })
        },
        hide () {
          $vm.showToast = false
        }
      }
  
      // all Vux's plugins are included in this.$vux
      if (!vue.$$message) {
        vue.$$message = {
          confirm
        }
      } else {
        vue.$$message.confirm = confirm
      }
  
      vue.mixin({
        created: function () {
          this.$$message = vue.$$message
        }
      })
    }
  }
  
  Vue.use(plugin.install);
    