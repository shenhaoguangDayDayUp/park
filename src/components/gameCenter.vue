<template>
  <div class="gameCenter">
    <Header title="游戏中心">
    </Header>
    <div class="banner">
      <img src="../assets/img/banner.png" alt="">
    </div>
    <div class="gameList" v-for="(v,i) in gameList">
      <div class="gameListTitle">
        <span v-if="i == 0">为您推荐</span>
        <span v-if="i == 1">全部游戏</span>
      </div>
      <ul class="gameListCont">
        <li v-for="(vv,ii) in v">
          <img :src="vv.url" alt="">
          <span>{{vv.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Header from "./common/Header.vue";
  export default {
    components: {
      Header
    },
    data() {
      return {
        gameList: [
          [{
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
          ],
          [{
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
            {
              url: '../static/game.png',
              name: '欢乐花园'
            },
          ]
        ]
      };
    },
  };
</script>
<style lang="scss" scoped>
  .gameCenter {
    color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
    .banner {
      width: 750px;
      height: 330px;
    }
    .gameList {
      margin-top: 3px;
      .gameListTitle {
        padding: 42px 0;
        span {
          border-left: 4px solid #ffcb16;
          padding-left: 16px;
          font-size: 30px;
          margin-left: 24px;
        }
      }
      ul.gameListCont {
        padding: 0 27px 0 28px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          width: 140px;
          margin-bottom:55px;
          text-align: center;
          margin-right:45px;
          img {
            height: 140px;
            margin-bottom:24px;
          }
          span {
            font-size: 28px;
            width: 100%;
            text-align: center;
          }
        }
        li:nth-child(4n){
          margin-right:0;
        }
      }
    }
    .gameList:last-child{
      margin-top:-52px; // -55+3
    }
  }
</style>


