<template>
  <div id="app">
    <router-view></router-view>
    <!-- 路由跳转必写 -->
    <!-- 以下底部导航在登录和注册时display:none掉 -->
    <mt-tabbar fixed v-model="selected">
      <TabItem2 id="游戏厅" route="/gameCenter">
        <img  v-if=" selected !== '游戏厅' " slot="icon" src="../../assets/img/youxiting.png" > 
        <img v-else slot="icon" src="../../assets/img/youxiting2.png" > 
        <span>游戏厅</span>
      </TabItem2>
      <TabItem2 id="奖品城" route="/prizeCity" @click="changeClass">
        <img v-if=" selected !== '奖品城' " slot="icon" src="../../assets/img/jiangpincheng.png">
        <img v-else slot="icon" src="../../assets/img/jiangpincheng2.png" >
        <span >奖品城</span>
      </TabItem2>
      <TabItem2 id="我的" route="/main" @click="changeClass">
        <img  v-if=" selected !== '我的' " slot="icon" src="../../assets/img/wode.png"> 
        <img v-else slot="icon" src="../../assets/img/wode2.png" >
        <span>我的</span>
      </TabItem2>
    </mt-tabbar>
  </div>
</template>

<script>
  import TabItem2 from '@/common/tabItem';
  
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

<style lang="scss" scoped>
  #app {
    height: 100%;
    .mint-tabbar>.mint-tab-item.is-selected {
      background-color: transparent;
      span{
        color: #ffcb16;
      }
    }
  }
  a {
    width: 100%;
    height: 100%;
    display: block;
    text-decoration: none;
    color: #fff;
  }
  a:visited {
    // color:#ffcb16;
  }
  .test {
    width: 100px;
    height: 100px;
    background: red;
  }
  .mint-tabbar {
    background: #2F323B;
  }
</style>
 