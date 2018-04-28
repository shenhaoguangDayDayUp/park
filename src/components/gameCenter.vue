<template>
  <div class="gameCenter">
    <Header title="游戏中心">
    </Header>
    <div class="gameCenterContent">
      <div class="banner">
      <img src="../assets/img/banner.png" alt="">
    </div>
    <div class="gameList">
      <div class="gameListTitle">
        <span>为您推荐</span>
      </div>
      <ul class="gameListCont">
        <li v-for="(v,i) in rcmList" :key='i'>
          <img v-lazy="v.icon"  alt="" @click.stop='$router.push({name:"gameDetail",query: {name: v.name,code:v.code}})'>
          <div>{{v.name}}</div>
        </li>
      </ul>
    </div>
    <div class="gameList wholeGame">
      <div class="gameListTitle">
        <span>全部游戏</span>
      </div>
      <ul class="gameListCont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(v,i) in gameList" :key='i'>
          <img v-lazy="v.icon" alt="" @click.stop='$router.push({name:"gameDetail",query: {name: v.name,code:v.code}})'>
          <div>{{v.name}}</div>
        </li>
        <load-more v-if='loading' :tip="'正在加载'"></load-more>
        <divider v-if='noMoreData'>没有更多游戏了</divider>
      </ul>
    </div>
    </div>
    
  </div>
</template>
<script>
  import Header from "./common/Header.vue";
  import config from '@/api/config'
  import {
    gameApi,
  } from '../api/api';
  import {
    InfiniteScroll
  } from "mint-ui";
  import Vue from 'vue';
  Vue.use(InfiniteScroll); // 使用Vue的分页
  import {
    LoadMore,
    Divider
  } from 'vux'
  export default {
    data() {
      return {
        loading: false,
        rcmList: [],
        gameList: [],
        count: 0,
        page: 1,
        noMoreData: false,
      };
    },
    mounted() {
      this.recList();
      this.wholeList();
    },
    methods: {
      async recList() {
        try {
          const {
            data
          } = await gameApi.rec();
          var imgPrifex = config.imgUrl[config.env.NODE_ENV]
          var imgList = data.forEach(v => {
            v.icon = imgPrifex + v.icon
          });
          this.rcmList = data
        } catch (err) {}
      },
      async wholeList() {
        this.loading = true;
        try {
          const {
            data
          } = await gameApi.entity({
            id: this.page
          });
          this.loading = false;
          var imgPrifex = config.imgUrl[config.env.NODE_ENV]
          for (let index = 0; index < data.records.length; index++) {
            const element = data.records[index];
            element.icon = imgPrifex + element.icon
            this.gameList.push(element);
          }
          this.count = data.count;
        } catch (err) {}
      },
      loadMore() {
        if (this.gameList.length >= this.count) { //当拉到底的时候
          this.loading = false;
          this.noMoreData = true;
          return;
        }
        this.page += 1;
        this.wholeList();
      },
    },
    components: {
      Header,
      LoadMore,
      loading: false,
      Divider
    },
  };
</script>
<style lang="scss" scoped>
  .gameCenter {
    color: #fff;
    height:100%;
    // overflow: auto;
    // position: relative;
    .gameCenterContent{
      // margin-top: 94px;
      padding-bottom: 100px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .banner {
      width: 100%;
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
        // padding: 0 27px 0 28px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        box-sizing: border-box; // margin-bottom:94px;
        // margin-bottom:300px;
        li {
          // width: 140px;
          width: 33.33333333333%;
          margin-bottom: 55px;
          text-align: center; // margin-right:45px;
          box-sizing: border-box;
          img {
            height: 190px;
            width: 190px;
            margin-bottom: 24px;
          }
          span {
            font-size: 28px;
            width: 100%;
            text-align: center;
          }
          div{
            font-size:28px;
          }
        } // li:nth-child(4n){
        //   margin-right:0;
        // }
      }
    }
    .gameList.wholeGame {
      margin-top: -55px; // -55+3
    }
  }
</style>
<style>
  .gameCenter .vux-divider:after,
  .gameCenter .vux-divider:before {
    top: 0;
  }
</style>



