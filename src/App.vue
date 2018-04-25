<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- 路由跳转必写 -->
    <div v-transfer-dom>
      <loading :show="isLoading"
               :text="''"
               :position='"absolute"'></loading>
    </div>
  </div>
</template>

<script>
import { Loading, TransferDomDirective as TransferDom } from "vux";
import { mapGetters } from "vuex";

export default {
  data(){
    return {
      transitionName:'slide-left'
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
</style>

 