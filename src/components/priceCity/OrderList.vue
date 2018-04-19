<template>
    <div class="order-list">
        <Header title="订单清单" :isShow='true'></Header>
        <tab v-model="tabActive"
             style="margin-top:20px;"
             prevent-default
             active-color='#fdcd00'
             bar-active-color="#fdcd00"
             default-color='#ffffff'
             @on-before-index-change="switchTabItem">
            <tab-item >待支付</tab-item>
            <tab-item>待发货</tab-item>
            <tab-item>全部订单</tab-item>
        </tab>
        <div>
           <div v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
            <div class="order-content" @click='$router.push({name:"order",query:{code:item.code}})'
               v-for="(item,key) in list" :key='key'>
            <div class="content-title">
                <div class="title-left">{{item.placeAt|dateFilter}}</div>
                <!-- <div class="title-center">{{item.status|orderStatus}}</div> -->
                <div class="title-right">{{item.grandTotal}}积分</div>
            </div>
            <div class="content-list">
                <div class="img-content">
                    <div class="content"  v-for="(items,keys) in item.items" :key='keys' v-if='keys<3'>
             <img v-lazy="items.product.imagePath" alt="">
                    </div>
                </div>
                <div class="content-right">
                    >
                </div>
            </div>
           </div>
            <load-more v-if='loading&&list.length'
                   :tip="'正在加载'"></load-more>
        <divider class="divider" v-if='noMoreData&&list.length'>我是有底线的</divider>
           
        </div>
        </div>
       
         <Dialog :visible.sync='showToast' @success='success' @cancel='cancel'>
      <template slot="header">
            您还没有登录
      </template>
        <template slot="content">
          是否前往登录?
        </template>
          <!-- <template slot="footer"></template> -->
    </Dialog> 
    </div>
</template>

<script>
import { Tab, TabItem,LoadMore,Divider } from "vux";
import Header from "@/components/common/Header.vue";
import { orderListApi } from "@/api/api";
import { common } from "@/logic";
import { InfiniteScroll } from "mint-ui";
import { timingSafeEqual } from 'crypto';
export default {
   directives: {
    InfiniteScroll
  },
  data() {
    return {
      showToast:false,
      loading:false,
      tabActive: Number(this.$route.query.index)||0,
      page:1,
      count:0,
      noMoreData:false,
      list:[],
    };
  },
  mounted() {
    this.getList();
  },
  components: {
    Tab,
    TabItem,
    Header,
   LoadMore,
   Divider
  },
  methods: {
    cancel(){

    },
    success(){
     this.$router.push({name:'Login'})
    },
    loadMore() {
      if (this.list.length >= this.count) {
        this.loading = false;
        this.noMoreData = true;
        return;
      }
      this.page += 1;
      this.getList();
    },
    async getList() {
       this.loading = true;
       var token = {
          headers: { "x-auth-token": common.getCommon("TOKEN") }
        };
      if(!common.getCommon("TOKEN")){
        this.showToast = true;
       }else{
      var dataList = [];
      var count = 0;
      if (this.tabActive == 0) {
        try {
       const {data} =   await orderListApi.unpaid({ id: this.page }, token);
        dataList = data.records
         this.count = data.count;
         this.loading = false;
        console.log(  dataList )
        } catch (error) {}
      } else if (this.tabActive == 1) {
        try {
         const {data} =   await orderListApi.unreceived({ id: this.page }, token);
        dataList = data.records
         this.count = data.count;
          this.loading = false;
        } catch (error) {}
      } else {
           try {
          const {data} =   await orderListApi.all({ id: this.page }, token);
           dataList = data.records
             this.count = data.count;
           this.loading = false;
        } catch (error) {}
      }
        for (let index = 0; index < dataList.length; index++) {
          const element = dataList[index];
          this.list.push(element);
        }
       }

    },
    switchTabItem(index) {
      this.tabActive = index;
      this.page = 1;
      this.list = [];
      this.getList()
    }
  }
};
</script>

<style lang='scss' scoped>
.divider{
  padding-top:40px;
  padding-bottom: 40px;
}
.order-list {
  color: #fff;
  background: #23262b;
  height: 100%;
  box-sizing: border-box;
  .order-scoller{
    min-height: 80%;
  }
  .nav-bar {
    font-size: 34px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 74px;
    width: 100%;
    padding-left: 20px;
    background: #1b1a20;
    .left-back {
      flex: 1;
      img {
        //   width: 34px;
        //   height: 34px;
      }
    }
    .title {
      flex: 1;
      text-align: center;
    }
    .right {
      flex: 1;
    }
  }
  .order-content {
    font-size: 28px;
    height: 388px;
    padding-left: 20px;
    padding-right: 20px;
    background: #2a2d36;
    .content-title {
      height: 128px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content:space-between;
      .title-left {
        // flex: 1;
        text-align: left;
      }
      .title-center {
        // flex: 1;
        text-align: center;
      }
      .title-right {
        // flex: 1;
        text-align: right;
      }
    }
    .content-list {
      padding-top: 15px;
      display: flex;
      flex-wrap: nowrap;
      height: 206px;
      align-items: center;
      justify-content: center;
      .img-content {
        height: 100%;
        flex: 20;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        align-items: center;
        .content {
          width: 200px;
          // flex: 1;
          // background: red;
          height: 100%;
          margin-right: 10px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .content-right {
        flex: 1;
      }
    }
  }
}
</style>

