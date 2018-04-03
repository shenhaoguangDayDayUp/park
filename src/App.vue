<template>
  <div id="app">
    <router-view></router-view>
    <!-- 路由跳转必写 -->
    <!-- 以下底部导航在登录和注册时display:none掉 -->
    
  </div>
</template>

<script>
  import TabItem2 from './common/tabItem';
  import './style/reset.css';
  export default {
    name: 'app',
    data() {
      return {
        isActive: true,
        selected: '我的',
      }
    },
    watch: {
      selected: function(val, oldVal) {
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

<style lang="scss" scoped>
  #app {
    height: 100%;
    .mint-tabbar>.mint-tab-item.is-selected {
      background-color: transparent;
      span {
        color: #ffcb16;
      }
    }
  }
  .mint-tabbar.is-fixed {
    background: #2F323B;
    height: 91px;
    box-shadow: 0px -9px 9px 0px 
		rgba(0, 0, 0, 0.1);
  }
  .router-link-active .mint-tab-item-label{
    font-size:20px;
  }
</style>
