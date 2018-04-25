<template>
  <div class="change">
        <Header  title="交易明细"
            :isShow='show'></Header>


    <!-- <Header  title="交易明细"
            :isShow='show'></Header> -->
    <div class="content">
      <div class="sticky-content">
               <sticky :offset="0" :check-sticky-support="false">
  <div class="title">
        <div class="title-left">余额</div>
        <div class="title-right">{{remaind}}</div>
      </div>
</sticky>
      </div>
 
    
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <ChangeItem :item='item'
                    v-for=" (item,index) in list"
                    :key='index'></ChangeItem>
      <load-more v-if='loading&&list.length'
                   :tip="'正在加载'"></load-more>
        <divider class="divider" v-if='noMoreData'>没有更多交易明细了</divider>
         <br>
        <br>
      </div>
       
    </div>
  </div>
</template>
<script>
import Header from "@/components/common/Header.vue";
import ChangeItem from "./ChangeItem.vue";
import { transactionsApi } from "@/api/api";
import { common } from "@/logic";
import { LoadMore, Divider,  Sticky } from "vux";
import { InfiniteScroll } from "mint-ui";
export default {
  name: "",
  computed:{
    show(){
      return this.$route.query.hasOwnProperty('show')?false:true
    }
  },
  data() {
    return {
      page: 1,
      loading: false,
      noMoreData: false,
      count: 0,
      list: [],
      remaind: 0
    };
  },
  methods: {
    loadMore() {
      if (this.list.length >= this.count) {
        this.loading = false;
        this.noMoreData = true;
        return;
      }
      this.page += 1;
      this.getList();
    },
    async getRemaind() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        const { data } = await transactionsApi.remaind({}, token);
        this.remaind = data;
      } catch (error) {}
    },
    async getList() {
      this.loading = true;
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        const { data } = await transactionsApi.CRD({ id: this.page }, token);
        this.loading = false;
        for (let index = 0; index < data.records.length; index++) {
          const element = data.records[index];
          this.list.push(element);
        }
        this.count = data.count;
      } catch (error) {}
    }
  },
  mounted() {
    this.getList();
    this.getRemaind();
  },
  components: {
    Header,
    ChangeItem,
    LoadMore,
    Divider,
    Sticky,
  },
  directives: {
    InfiniteScroll
  }
};
</script>
<style lang="scss" scoped>
.divider{
  padding-top:40px;
  padding-bottom: 40px;
  font-size: 20px;
}
.change {
  color: #fff;
  background: #23262b;
  height: 100%;
  font-size: 28px;
  box-sizing: border-box;
  .content {
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    box-sizing: border-box;
    .sticky-content{
      height: 100px;
    }
    .vux-fixed{
      width: 95% !important;
    }
    // height: 100%;
    .title {
      background: #23262b;
      display: flex;
      flex-direction: row;
      height: 94px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ffcb16;
      &-left {
        // flex: 1;
        color: #ffcb16;
      }
      &-right {
        // flex: 1;
        color: #ffcb16;
      }
    }
  }
}
</style>


