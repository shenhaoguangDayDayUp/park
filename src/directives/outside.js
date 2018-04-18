import Vue from 'vue'
const outside = Vue.directive('outside', {
    bind: function (el, { value }) {
        let onClickOutside = value
        console.log(el )
        el.handler = function (e) {
            if (el && !el.contains(e.target)) {
                onClickOutside(e)
            }
        }
        document.addEventListener('click', el.handler, true)
    },
    unbind: function (el) {
        document.removeEventListener('click', el.handler, true)
        el.handler = null
    }
})
export {outside}

 

