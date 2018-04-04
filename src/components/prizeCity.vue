<template>
  <div class="prizeCity">
    <div class="index_banner_1">
      <!-- <mt-swipe>
        <mt-swipe-item v-for="(banner, index)  in bannerData"
                       :key="index">
          <div class="index_banner_1">
            <img v-lazy="banner.url"
                 @click="bannerHandle(banner)">
          </div>
        </mt-swipe-item>
      </mt-swipe> -->
          <swiper :list="bannerData" auto height="328px" dots-class="custom-bottom" dots-position="center"></swiper>
        <div class="box">
          <span class="icon"></span><span class="title">热门推荐</span><span class="icon"></span><span class="span">查看更多></span>
        </div>
        <div class="hot-box">
          <div class='hot'>
             <template v-for="(good,gidx) in goodsList">
                <router-link :key="gidx" :to="{path:'/goods/detail',query: {id: good.goodsId}}" class="shop_item_3" tag="div">
                  <div class="shop_item_3_img">
                    <img v-lazy="good.url">
                  </div> 
                  <div class="shop_item_3_msg">
                    测试商品
                  </div>
                  <div class="shop_item_3_price">
                    <span>¥100</span>
                    <del>¥200</del>
                  </div>
                </router-link>
              </template>
        </div>
        </div>

    </div>
  </div>
</template>
<script>
import {
 Swiper
} from "vux";
export default {
  data() {
    return {
      goodsList:[{url:'https://static.vux.li/demo/1.jpg'},{url:'https://static.vux.li/demo/2.jpg'},{url:'https://static.vux.li/demo/3.jpg'}],
      bannerData: [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  // title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  // title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg',
  // title: '送你一次旅行',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]
    };
  },
  methods:{
    bannerHandle(){

    }
  },
   components: {
  Swiper
  },
};
</script>
<style lang="scss" scoped>
.prizeCity {
  color: #fff;
  background: #23262b;
  height: 100%;
  .index_banner_1 {
    height: 4rem;
  }

  .index_banner_1 > img {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }
}
.box{
  position: relative;
  text-align: center;
  height: 94px;
  line-height: 94px;
  font-size: 34px
}
.title{
  margin: 0 15px;
}
.icon{
  display: inline-block;
  height: 16px;
  width: 16px;
  line-height: 8px;
  border-radius: 9px;
  background-color:#fdcd00;
}
.span{
  position: absolute;
  right: 0;
  font-size: 27px;
  color: #afb0b4
}
.hot-box{
  padding:0 20px;
}
.hot{
  box-sizing: border-box;
  height: 360px;
  width: 100%;
  padding: 0 20px;
  background:white;
  border-radius: 10px;
    overflow-x: scroll;
    -webkit-overflow-x: scroll;
    padding-right: 20px;
    padding-top: 20px;
    white-space:nowrap;
}

.shop_item_3:last-child {
  margin-right: 0;
}
.shop_item_3 {
  display: inline-block;
  margin-right: 0.26667rem;
  width: 230px;
}

.shop_item_3_img {
  border: 1px solid #e6e6e6;
  height: 230px;
  width:230px;
  margin-bottom: 0.2rem;
}

.shop_item_3_img img {
  display: block;
  width: 100%;
  height: 100%;
}

.shop_item_3_msg {
  height: 0.53333rem;
  line-height: 0.53333rem;
  font-size: 0.32rem;
  color: #333333;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.shop_item_3_price {
  height: 0.52rem;
  line-height: 0.52rem;
}

.shop_item_3_price span {
  font-size: 0.29333rem;
  color: #333;
  margin-right: 0.4rem;
}

.shop_item_3_price del {
  font-size: 0.26667rem;
  color: #999;
}
</style>


