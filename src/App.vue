<template>
  <div id="app">
    <router-view></router-view>
    <!-- 路由跳转必写 -->
    <!-- 以下底部导航在登录和注册时display:none掉 -->
    
  </div>
</template>

<script>
  import TabItem2 from './common/tabItem';
  
  export default {
    name: 'app',
    data() {
      return {
        isActive: true,
        selected: '我的',
      }
    },
    watch: {
      selected: function (val, oldVal) {
          this.selected = val;
      }
    },
    methods: {
      changeClass(index) {
        // this.isActive = !this.isActive;
        alert(1)
      },
    },
    mounted() {
      // console.log(this.$route.path)
    },
    components: {
      TabItem2
    }
  }
</script>

<style lang="scss">
  #app{
    height: 100%;
  }
 
</style>
 