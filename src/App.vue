<template>
  <div id="app">
    <transition name="fade">
      <router-view :style="loding"></router-view>
    </transition>
    <!-- 路由跳转必写 -->
    <div v-transfer-dom>
      <!-- <loading :show="isLoading"
               :text="''"
               :position='"absolute"'></loading> -->
    </div>
  </div>
</template>

<script>
import { Loading, TransferDomDirective as TransferDom } from "vux";
import { mapGetters } from "vuex";

export default {
  data(){
    return {
      transitionName:'slide-left',
      loding:{},
    }
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapGetters(["isLoading"])
  },
  components: {
    Loading
  },
  watch:{
    　'$route':function (to, from) {
　　　　const toDepth = to.path.split('/').length
　　　　const fromDepth = from.path.split('/').length
　　　this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    
 　　}
  },
  methods: {},
  mounted() {
    
    document.getElementById("app").style.display = "block";
    document.getElementById("appLoading").style.display = "none";

      this.$root.eventHub.$on('LodingShow',res=>{
        document.querySelector('body').style = 'display:block;height:100%;overflow:hidden !important;font-size:'+document.querySelector('body').style.fontSize
   
      })
       this.$root.eventHub.$on('LodingHide',res=>{
       document.querySelector('body').style = 'font-size:'+document.querySelector('body').style.fontSize
      
      })
  
  },
  
};
</script>

<style lang="scss">
#app {
  height: 100%; 
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

}
#cancel_clip{
      border:1px solid #ffcb16!important;
      color:#ffcb16!important;
      background: #fff!important;
      border-radius: 5px!important;
      width:100px!important;
      height:40px!important;
}
#clip_button{
  background: #ffcb16!important;
  border-radius: 5px!important;
  width:100px!important;
      height:40px!important;
}
input[type="number"] {
    -moz-appearance: textfield;
}
</style>

 