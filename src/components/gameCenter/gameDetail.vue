<template>
  <div class="gameDetail">
    <Header :title="this.$route.query.name" :isShow="true"></Header>
    <div class="gameTitle">
      <div class="gameImg">
        <img :src="showData.icon" alt="">
      </div> 
      <div class="gameRight">
        <p>{{showData.name}}</p>
        <p>{{showData.description}}</p>
        <!-- 按钮 -->
        <!-- <div class="btn">
                <div class="redBtn" @click=rename()>
                  开始游戏
                </div>
              </div> -->
        <submit text="开始游戏" @click.native="rename()"></submit>
      </div>
    </div>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange" height="380px" width=80% margin= '0 auto' :show-dots="false"></swiper>
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
</template>
<script>
  // import '../../style/btn.scss';
  import Header from "../common/Header.vue";
  import Submit from '../common/Button';
  import config from '../../api/config.js';
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
  const baseList = []
  export default {
    data() {
      return {
        demo01_list: baseList,
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
          for (let index = 0; index < this.showData.banners.length; index++) {
            const element = {
              url: 'javascript:',
              img: imgPrifex + this.showData.banners[index] + '?r=' + new Date().getTime(),// 头像加时间戳
            };
            baseList.push(element);
          }
        } catch (err) {}
      },
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
    .gameTitle {
      height: 278px; // padding: 38px 45px 24px;
      padding: 38px 6% 24px;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      .gameImg {
        width: 196px;
        height: 196px;
        img{
          width: 196px;
        height: 196px;
        }
      }
      .gameRight {
        // width: 54.8%;
        margin-left: 36px;
        p:nth-child(1) {
          font-size: 36px;
          line-height: 41px;
          letter-spacing: 2px;
        }
        p:nth-child(2) {
          font-size: 26px;
          line-height: 37px;
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
      width: 300px;
      height: 62px;
      line-height: 62px;
      // margin-top:29px;
      margin-top:20px;
      background-color: #ffcb16;
      box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.04);
      border-radius: 31px;
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



