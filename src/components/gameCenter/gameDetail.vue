<template>
  <div class="gameDetail">
    <Header :title="this.$route.query.name" :isShow="true"></Header>
    <div class="gameTitle">
      <img class="gameImg" src="../../assets/img/qieshuiguo.png" alt="">
      <!-- <div class="gameRight"> -->
        <span>水果切切乐</span>
        <span>放假啊打开JFK打算减肥了</span>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
  import Header from "../common/Header.vue";
  export default {
    components: {
      Header
    },
    data() {
      return {};
    },
  };
</script>
<style lang="scss" scoped>
  img {
    height: 100%;
    width: 100%;
  }
  .gameDetail {
    .gameTitle {
      height: 278px;
      padding: 38px 45px 24px;
      .gameImg {
        width: 196px;
        height: 196px;
      }
    }
  }
</style>


