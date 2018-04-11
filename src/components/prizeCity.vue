<template>
  <div class="prizeCity">
      <div class="nav-bar">
            <div class="left-back">
           
            </div>
            <div class="title">
                长影平台
            </div>
            <div class="right">
               <div class="heart" >
                     <img src="../assets/img/heart.png"
                     alt="" @click.stop='$router.push({name:"heart"})'>
                      <img @click.stop='$router.push({name:"orderLsit"})'  src="../assets/img/order.png"
                     alt="">
               </div>
               <div class="message" ></div>
            </div>
        </div>
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
      <swiper :list="bannerData"
              auto
              height="328px"
              dots-class="custom-bottom"
              dots-position="center"></swiper>
      <div class="box">
        <span class="icon"></span>
        <span class="title">热门推荐</span>
        <span class="icon"></span>
        <span class="span">更多></span>
      </div>
      <div class="hot-box">
        <div class='hot'>
          <template v-for="(good,gidx) in goodsList">
            <router-link :key="gidx"
                         :to="{name:'商品详情',params: {id: 1}}"
                         class="shop_item_3">
              <div class="shop_item_3_img">
                <img :src="good.url">
              </div>
              <div class="shop_item_3_msg">
                测试商品
              </div>
              <div class="shop_item_3_price">
                <span><img src="../assets/img/big_gold@2x.png"
                       alt=""></span>
                <del>¥200</del>
              </div>
            </router-link>
          </template>
        </div>
        <div class="box">
          <span class="icon"></span>
          <span class="title">全部商品</span>
          <span class="icon"></span>
          <span class="span">更多></span>
        </div>
      </div>
      <div class="list-goods">
            <div class="list_content"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <router-link class="list_item "
                     :class="{'linear_item_linear':!isGrid}"
                     :to="{name:'商品详情',params: {id: item.code}}"
                     v-for="(item,index) in goods"
                     :key="index"
                     tag="a">
          <div class="list_item_imgBox">
            <!-- <img class="list_logo" src="static/img/list_logo.png"> -->
            <img class="list_img"
                 :src="item.url">
          </div>
          <div class="list_item_title">
              {{item.name}}
          </div>
          <div class="list_item_description">
                <span><img src="../assets/img/big_gold@2x.png"
                       alt=""></span>
                <span class="gold">{{item.price}}</span>
          </div>
        </router-link>
        
       </div>  
       <load-more v-if='loading' :tip="'正在加载'"></load-more>
       <br>
       <br>
      </div>
  

    </div>
  </div>
</template>
<script>
import { Swiper ,LoadMore} from "vux";
import { InfiniteScroll } from "mint-ui";
import {getAllProductApi} from '@/api/api'
export default {
  data() {
    return {
      page:0,
      goods: [
        // { url: "https://static.vux.li/demo/1.jpg", id: 1 },
        // { url: "https://static.vux.li/demo/1.jpg", id: 2 },
        // { url: "https://static.vux.li/demo/1.jpg", id: 3 },
        // { url: "https://static.vux.li/demo/1.jpg", id: 4 }
      ],
      loading: false,
      isGrid: true,
      goodsList: [
        { url: "https://static.vux.li/demo/1.jpg" },
        { url: "https://static.vux.li/demo/1.jpg" },
        { url: "https://static.vux.li/demo/1.jpg" },
        { url: "https://static.vux.li/demo/1.jpg" },
        { url: "https://static.vux.li/demo/3.jpg" }
      ],
      bannerData: [
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/1.jpg"
          // title: '送你一朵fua'
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/2.jpg"
          // title: '送你一辆车'
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
  mounted(){
    this.getList()
  },
  methods: {
   async getList(){
    try{
     const{data}= await getAllProductApi.getList({id:0})
       this.goods = data
    }catch(err){

    }

    },
    loadMore() {
      this.loading  = true
      console.log(13131);
    },
    bannerHandle() {}
  },
  components: {
    Swiper,
    LoadMore
    
  },
  directives: {
    InfiniteScroll
  }
};
</script>
<style lang="scss" scoped>
.prizeCity {
  .gold{
     color:#ffcb16;
  }
  color: #fff;
  background: #23262b;
  height: 100%;
   .nav-bar{
     box-sizing: border-box;
      font-size: 34px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center; 
      height: 74px;
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;
      background: #1b1a20;
      .left-back{
          flex: 1;
          img{
            //   width: 34px;
            //   height: 34px;
          }
      }
       .title{
            flex:1; 
            text-align: center;
       } 
       .right{
           flex: 1;
           display: flex;
           flex-direction: row;
           align-items: center;
          justify-content: flex-end;
           .heart{
             img{
               margin-left: 20px;
               height: 34px;
               width: 34px;
             }
           }
           .message{

           }

       }
    }
  .index_banner_1 {
    background: #23262b;
  }
  .box {
    position: relative;
    text-align: center;
    height: 94px;
    line-height: 94px;
    font-size: 34px
  }
  .title {
    margin: 0 15px;
  }
  .icon {
    display: inline-block;
    height: 16px;
    width: 16px;
    line-height: 8px;
    border-radius: 9px;
    background-color: #fdcd00;
  }
  .span {
    position: absolute;
    right: 0;
    font-size: 27px;
    color: #afb0b4
  }
  .hot-box {
    padding: 0 20px;
  }
  .hot {
    box-sizing: border-box;
    height: 360px;
    width: 100%;
    height: 100%;
    border: none;
  }
}
.box {
  position: relative;
  text-align: center;
  height: 94px;
  line-height: 94px;
  font-size: 34px;
}
.title {
  margin: 0 15px;
}
.icon {
  display: inline-block;
  height: 16px;
  width: 16px;
  line-height: 8px;
  border-radius: 9px;
  background-color: #fdcd00;
}
.span {
  position: absolute;
  right: 0;
  font-size: 27px;
  color: #afb0b4;
}

.hot-box {
  padding: 0 20px;
}
.hot {
  box-sizing: border-box;
  // height: 360px;
   height:auto;
  width: 100%;
  padding: 0 20px;
  background: white;
  border-radius: 10px;
  overflow-x: scroll;
  -webkit-overflow-x: scroll;
  padding-right: 20px;
  padding-top: 20px;
  white-space: nowrap;
  &::-webkit-scrollbar {
    background-color: transparent;
  }
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
  width: 230px;
  position: relative;
}
.shop_item_3_img::after {
  content: " ";
  position: absolute;
  top: 20px;
  bottom: 20px;
  right: -13px;
  border-right: 2px solid #282828;
  // transform: scaleX(0.5);
  transform-origin: 100% 100%;
}
.shop_item_3:last-child {
  .shop_item_3_img::after {
    content: none;
  }
}

.shop_item_3_img img {
  display: block;
  width: 100%;
  height: 100%;
}

.shop_item_3_msg {
  height: 50px;
  line-height: 50px;
  font-size: 24px;
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
  height: 25px;
  // line-height: 64px;
  text-align: center;
}

.shop_item_3_price span {
  font-size: 22px;
  color: #333;
  img{
    width: 25px;
    height: 25px;
  }
  // margin-right: 0.4rem;
}

.shop_item_3_price del {
  font-size: 0.26667rem;
  color: #999;
}
.list-goods{
  padding: 0 20px 20px 20px;
  .list_content {
     border-radius: 10px;
  background-color: rgb(255, 255, 255);
  padding: 0 30px;
  position: relative;
      &:nth-child(even) .list_item{
         margin-left: 0px !important;
      }
  .list_item {
    margin-top: 30px;
    width: 50%;
    // margin-left: 12px;
    display: inline-block;
    vertical-align: top;
    position: relative;
    &:nth-child(odd)::after {
        content: " ";
        position: absolute;
        top: 60px;
        bottom: 180px;
        right: -2px;
        border-right: 2px solid #282828;
        // transform: scaleX(0.5);
        transform-origin: 100% 100%;
      }
        &:nth-child(even) .list_item_imgBox{
        //  padding-right: 0 !important;
      }
    .list_item_imgBox {
      padding: 10px;
      // border: 1px solid rgb(230, 230, 230);
      .list_logo {
        position: absolute;
        display: inline-block;
        width: 42px;
        height: 21px;
      }
      .list_img {
        display: inline-block;
        width: 100%;
        height: 260px;
        //position: absolute
      }
    }
    .list_item_title {
      text-align: center;
      height: 46px;
      line-height: 30px;
      font-size: 24px;
      color: rgb(51, 51, 51);
      padding: 15px 0px;
      // border-bottom: 1px solid rgb(230, 230, 230);
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .list_item_description {
      font-size: 22px;
      color: #999999;
      text-align: center;
      padding: 10px 0px;
      line-height: 30px;
      span img{
        width: 25px;
        height:25px;
      }
    }
    .list_item_orice {
      font-size: 24px;
      color: rgb(51, 51, 51);
      padding: 10px 0px;
    }
  }
  .linear_item_linear {
    display: block !important;
    padding: 27px 0px 27px 235px;
    position: relative;
    width: auto;
    .list_item_imgBox {
      position: absolute;
      left: 0;
      padding: 0px;
      border: 1px solid rgb(230, 230, 230);
      .list_logo {
        position: absolute;
        display: inline-block;
        width: 42px;
        height: 21px;
      }
      .list_img {
        display: inline-block;
        width: 165px;
        height: 165px;
        //position: absolute
      }
    }
    .list_item_title {
      height: 46px;
      line-height: 30px;
      font-size: 24px;
      color: rgb(51, 51, 51);
      padding: 15px 0px;
      border-bottom: none;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .list_item_description {
      font-size: 22px;
      color: #979797;
      text-align: left;
      padding: 10px 0px;
      line-height: 30px;
    }
    .list_item_orice {
      font-size: 24px;
      color: #000000;
      padding: 10px 0px;
    }
  }
}
}

</style>


