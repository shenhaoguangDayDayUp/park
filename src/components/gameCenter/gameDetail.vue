<template>
  <div class="gameDetail">
    <Header :title="this.$route.query.name" :isShow="true"></Header>
    <div class="gameTitle">
      <img class="gameImg" src="../../assets/img/qieshuiguo.png" alt="">
      <div class="gameRight">
        <p>水果切切乐</p>
        <p>放假啊打开JFK打算减肥了</p>
        <!-- 按钮 -->
        <div class="btn">
          <div class="redBtn active" @click=rename()>
            开始游戏
          </div>
        </div>
      </div>
    </div>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange" height="380px" :show-dots="false"></swiper>
    <div class="gameWinners">
      <span class="winnerTitle">中奖榜</span>
    </div>
    <ul class="winnersList">
      <li v-for ='(v,i) in winnersList' :key="i">
        <span>{{v.mobileNumber}}</span>
        <span>{{v.money}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import '../../style/btn.scss';
  import Header from "../common/Header.vue";
  import {
    Swiper
  } from 'vux';
  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]
  export default {
    components: {
      Header,
      Swiper
    },
    data() {
      return {
        demo01_list: baseList,
        winnersList:[
          {
            mobileNumber:'177****5678',
            money:'123,456'
          },
          {
            mobileNumber:'177****5678',
            money:'123,456'
          },
          {
            mobileNumber:'177****5678',
            money:'123,456'
          },
          {
            mobileNumber:'177****5678',
            money:'123,456'
          },
          {
            mobileNumber:'177****5678',
            money:'123,456'
          },
          {
            mobileNumber:'177****5678',
            money:'123,456'
          }
        ]
      };
    },
    methods: {
      demo01_onIndexChange(index) {
        this.demo01_index = index
      },
    }
  };
</script>
<style lang="scss" scoped>
  img {
    height: 100%;
    width: 100%;
  }
  .gameDetail {
    color: #fff;
    .gameTitle {
      height: 278px; // padding: 38px 45px 24px;
      padding: 38px 6% 24px;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      .gameImg {
        width: 196px;
        height: 196px;
      }
      .gameRight {
        width: 54.8%; // display: -webkit-flex;
        // display: flex;
        // justify-content: space-between;
      }
    }
    .btn {
      border-radius: 31px;
    }
    .gameWinners {
      padding: 42px 12px 29px 45px;
      span.winnerTitle {
        border-left: 4px solid #ffcb16;
        padding-left: 16px;
        font-size: 30px; // margin-left: 24px;
      }
    }
    .winnersList{
      padding:0 12px 0 45px;
      li{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        border-top:1px solid #4a4e5a;
        span{
          padding:27px 31px 24px 23px;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .gameDetail {
    .vux-slider {
      margin-top: 44px;
    }
  }
</style>



