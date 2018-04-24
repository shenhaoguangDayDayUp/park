<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <router-view></router-view>
    <!-- </transition> -->
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

}
</style>

 