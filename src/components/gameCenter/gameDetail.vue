<template>
  <div class="gameDetail" id="gameDetail">
    <Header :title="this.$route.query.name" :isShow="true"></Header>
    <div class="gameDetailContent">
      <div class="gameTitle">
        <div class="gameImg">
          <img v-lazy="showData.icon" alt="">
        </div>
        <div class="gameRight">
          <!-- <p>{{showData.name}}</p> -->
          <p>{{showData.description}}</p>
          <submit text="开始游戏" @click.native="startGame()" :disabled="submitBtnDisabled"></submit>
        </div>
      </div>
      <swiper id="swiper" :list="baseList" loop auto v-model="demo01_index" @on-index-change="demo01_onIndexChange" height="5rem" style="width:90%;margin:0 auto;" :show-dots="false"></swiper>
      <div class="gameWinners">
        <span class="winnerTitle">中奖榜</span>
      </div>
      <ul class="winnersList">
        <li v-for='(v,i) in winnersList' :key="i">
          <span>{{v.mobileNumber}}</span>
          <span>{{v.money}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // import '../../style/btn.scss';
  import Header from "../common/Header.vue";
  import Submit from '../common/Button';
  import config from '../../api/config.js';
  import {
    loginApi,
  } from '../../api/api';
  import {
    gameApi
  } from '../../api/api';
  import {
    Swiper
  } from 'vux';
  // const baseList = [{
  //   url: 'javascript:',
  //   img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  // }, {
  //   url: 'javascript:',
  //   img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  // }, {
  //   url: 'javascript:',
  //   img: 'https://static.vux.li/demo/5.jpg',
  //   fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  // }]
  export default {
    data() {
      return {
        baseList: [],
        winnersList: [{
            mobileNumber: '177****5678',
            money: '123,456'
          },
          {
            mobileNumber: '177****5678',
            money: '123,456'
          },
          {
            mobileNumber: '177****5678',
            money: '123,456'
          },
          {
            mobileNumber: '177****5678',
            money: '123,456'
          },
          {
            mobileNumber: '177****5678',
            money: '123,456'
          },
          {
            mobileNumber: '177****5678',
            money: '123,456'
          }
        ],
        showData: {},
        demo01_index: 0,
        submitBtnDisabled:true
      };
    },
    mounted() {
      this.getList()
    },
    methods: {
      demo01_onIndexChange(index) {
        this.demo01_index = index
      },
      async getList() {
        try {
          const {
            data
          } = await gameApi.gameDetail({
            id: this.$route.query.code
          });
          var imgPrifex = config.imgUrl[config.env.NODE_ENV];
          data.icon = imgPrifex + data.icon;
          this.showData = data;
          this.showData.banners = this.showData.banners.split(',');
          this.baseList = [];
          for (let index = 0; index < this.showData.banners.length; index++) {
            console.log(this.showData.banners[index])
            if(this.showData.banners[index]){ //如果图片为空，则跳过
              const element = {
                url: 'javascript:',
                img: imgPrifex + this.showData.banners[index] + '?r=' + new Date().getTime(), // 头像加时间戳
              };
              this.baseList.push(element);
            }
          }
          console.log(this.baseList);
          
        } catch (err) {}
      },
      startGame() {
        const TOKEN = sessionStorage.getItem('TOKEN')
        if (TOKEN) {
          loginApi.entity({}, {
            data: {},
            headers: {
              'x-auth-token': TOKEN
            }
          }).then(res => {
            window.location.href = 'http://demo.cc5918.com/zdbgj/?ACRuPSZwPSZsPXRydWUmaXA9NDcuOTIuMTU3LjI1MSZtPXRydWU='
          }).catch(error => {
            console.log(error.response.status)
          });
        } else {
          var that = this;
          this.$$message.confirm.show({
            confirm(vm, resolve) {
              vm.$router.push({
                name: "Login"
              });
              resolve();
            },
            cancel(vm, resolve) {
              resolve();
            },
            title: "提示",
            content: "请您先登录!",
            rightBtnText: "取消",
            leftBtnText: "确定"
          });
        }
      }
    },
    components: {
      Header,
      Swiper,
      Submit
    },
  };
</script>
<style lang="scss" scoped>
  img {
    height: 100%;
    width: 100%;
  }
  .gameDetail {
    color: #fff;
    height: 100%;
    overflow: auto;
    .gameDetailContent {
      margin-top: 94px; // padding-bottom:94px;
      overflow-x: hidden;
    }
    .gameTitle {
      // height: 278px; // padding: 38px 45px 24px;
      padding: 38px 45px 24px;
      display: -webkit-flex;
      display: flex;
      margin-bottom: 64px;
      justify-content: space-between;
      .gameImg {
        width: 196px;
        height: 196px;
        img {
          width: 196px;
          height: 196px;
        }
      }
      .gameRight {
        width: 411px;
        margin-left: 36px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: column;
        p {
          font-size: 26px;
          line-height: 37px;
          height:114px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
    .gameWinners {
      padding: 42px 12px 29px 45px;
      span.winnerTitle {
        border-left: 4px solid #ffcb16;
        padding-left: 16px;
        font-size: 30px; // margin-left: 24px;
      }
    }
    .winnersList {
      padding: 0 12px 0 45px;
      li {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        border-top: 1px solid #4a4e5a;
        span {
          padding: 27px 31px 24px 23px;
        }
      }
    }
    button {
      // width: 300px;
      width: 100%;
      height: 62px;
      line-height: 62px; // margin-top:29px;
      margin-top: 20px;
      background-color: #ffcb16;
      box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.04);
      border-radius: 31px;
    }
    button:disabled{
      // width: 300px;
      width: 100%;
      height: 62px;
      line-height: 62px; // margin-top:29px;
      margin-top: 20px;
      // background-color: #ffcb16;
      background: #666;
      // box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.04);
      border-radius: 31px;
    }
  }
</style>
<style lang="scss">
  #gameDetail #swiper .vux-swiper {
    overflow: visible!important;
  }
  #gameDetail .vux-slider {
    overflow: visible;
  }
  #gameDetail .vux-slider .vux-swiper .vux-swiper-item {
    padding: 0 11px!important;
  }
  #gameDetail .vux-slider .vux-swiper .vux-swiper-item a .vux-swiper-desc {
    background-image: none;
  }
</style>



