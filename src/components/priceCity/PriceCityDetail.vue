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
             <div class='title'>美的智能空调</div>
             <div class="icon">
                    <span><img src="../../assets/img/big_gold@2x.png"
                       alt=""/></span>
                <div class="price">200</div>
             </div>
        </div>
        <div class="goods-content">
            
        </div>
        <div class="goods-footer">
            <div class="btn-box">
                   <div class="btn" @click='$router.push({name:"heart"})'>
                     加入心愿单
                   </div>
            </div>
             <div class="btn-box">
                 <div class="btn" @click='rightChange'>
                     立即兑换
                 </div>
            </div>

            
        </div>

    </div>
</template>
<script>
import { Swiper, XHeader } from "vux";
export default {
  name: "peiceDetail",
  data() {
    return {
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
      rightChange(){
          this.$router.push({name:"rightChange"})
      }
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
    height: 124px;
    width: 100%;
    background: #2a2d36;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .bar {
      width: 7px;
      height: 36px;
      margin-left: 20px;
      background: #ffcb16;
    }
    .title {
      font-size: 32px;
      color: white;
      margin-left: 20px;
    }
    .icon{
     flex: 1; 
     text-align: right;
     span{
         img{
            width: 35px;
            height: 35px; 
         }
     }
     .price{
         display: inline-block;
         font-size: 25px;
         margin-left: 16px;
         margin-right: 20px
     }

    }
  }
  .goods-footer{
    height: 124px;
    width: 100%;
    background: #2a2d36;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    &>.btn-box:last-child{
       padding-right: 20px 
    }
    .btn-box{
        flex: 1;
        height: 80px;
        padding-left: 20px;
        .btn{
            background:#ffcb16;
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


