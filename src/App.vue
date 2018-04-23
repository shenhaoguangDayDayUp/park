<template>
  <div id="app" >
    <router-view></router-view>
    <!-- 路由跳转必写 -->
     <div v-transfer-dom>
      <loading :show="isLoading" :text="''" :position='"absolute"'></loading>
    </div>
  </div>
</template>

<script>
import { Loading,  TransferDomDirective as TransferDom } from 'vux'
import { mapGetters } from 'vuex'

 export default{
   directives: {
    TransferDom
  },
  computed: {
    ...mapGetters(["isLoading"])
  },
   components: {
     Loading
   },
   methods:{
   },
   mounted(){
       document.getElementById('app').style.display = 'block';
        document.getElementById('appLoading').style.display = 'none';
   }
   
 }
</script>

<style lang="scss">
  #app{
    height: 100%;
  }
 
</style>

 