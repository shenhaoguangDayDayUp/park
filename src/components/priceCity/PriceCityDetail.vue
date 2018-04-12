<template>
  <div class="goods">
    <div class='good-deital'>
      <div class="back"
           @click="$router.go(-1)">

        <img src="../../assets/img/close.png"
             alt="">

        <!-- <XIcon type="ios-arrow-right"></XIcon> -->
      </div>
      <swiper :list="bannerData"
              auto
              height="745px"></swiper>
    </div>
    <div class="goods-detail-title">
      <div class="bar"></div>
      <div class='title'>{{detail.name}}</div>
      <div class="icon">
        <span><img src="../../assets/img/big_gold@2x.png"
               alt="" /></span>
        <div class="price">{{detail.price}}</div>
      </div>
    </div>
    <div class="goods-content"
         v-html='detail.detail'>

    </div>
    <div class="goods-footer">
      <div class="btn-box">
        <div class="btn"
             @click='addCart'>
          加入心愿单
        </div>
      </div>
      <div class="btn-box">
        <div class="btn"
             @click='rightChange'>
          立即兑换
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { Swiper, XHeader } from "vux";
import { getAllProductApi, heartCartApi } from "@/api/api";
import { common } from "@/logic";

export default {
  name: "peiceDetail",
  data() {
    return {
      detail: "",
      bannerData: [
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/1.jpg",
          // title: '送你一朵fua'
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/2.jpg",
          // title: '送你一辆车'
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg",
          // title: '送你一次旅行',
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        }
      ]
    };
  },
  methods: {
    async addCart() {
      try {
        if (common.getCommon("TOKEN")) {
          var obj =  { product: { code: this.$route.params.id }, quantity: 1 }
          var token =  {headers: { "x-auth-token": common.getCommon("TOKEN")}}
          await heartCartApi.addOrdel(obj,token);
          this.$router.push({ name: "heart" });
        }else{
          this.$router.push({name:'Login'})
        }
      } catch (error) {

      }
    },
    rightChange() {
      this.$router.push({ name: "rightChange" });
    },
    async getInfo() {
      try {
        const { data } = await getAllProductApi.getDetail({
          id: this.$route.params.id
        });
        this.detail = data;
      } catch (err) {}
    }
  },
  mounted() {
    this.getInfo();
  },
  components: {
    Swiper,
    XHeader
  }
};
</script>
<style lang='scss' scoped>
.goods {
  color: #fff;
  background: #23262b;
  height: 100%;
  .good-deital {
    position: relative;
    .back {
      width: 100px;
      z-index: 100;
      position: absolute;
      top: 40px;
      left: 20px;
    }
  }
  .goods-detail-title {
    min-height: 124px;
    width: 100%;
    background: #2a2d36;
    display: flex;
    flex-direction: row;
    align-items: top;;
    position: relative;
    justify-content: space-between;
    box-sizing: border-box;
    .bar {
      margin-top: 5px;
      width: 7px;
      height: 36px;
      margin-left: 20px;
      background: #ffcb16;
    }
    .title {
      font-size: 32px;
      color: white;
      margin-left: 20px;
      min-width: 300px;
    }
    .icon {
      text-align: right;
      align-self: flex-start;
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content:space-between; 
      // flex: 1;
      // width: 250px;
      text-align: right;
      span {
              align-self: center;
        img {
          width: 35px;
          height: 35px;
        }
      }
      .price {
        display: inline-block;
        font-size: 25px;
        margin-left: 16px;
        margin-right: 20px;
      }
    }
  }
  .goods-content {
    width: 100%;
    overflow: hidden;
  }
  .goods-footer {
    height: 124px;
    width: 100%;
    background: #2a2d36;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    & > .btn-box:last-child {
      padding-right: 20px;
    }
    .btn-box {
      flex: 1;
      height: 80px;
      padding-left: 20px;
      .btn {
        margin: 0;
        background: #ffcb16;
        height: 100%;
        border-radius: 10px;
        text-align: center;
        color: #000000;
        font-size: 30px;
        line-height: 80px;
      }
    }
  }
}
</style>


