<template>
    <div class="order-list">
        <Header title="订单清单"></Header>
        <tab v-model="tabActive"
             style="margin-top:20px;"
             prevent-default
             active-color='#fdcd00'
             bar-active-color="#fdcd00"
             default-color='#ffffff'
             @on-before-index-change="switchTabItem">
            <tab-item selected>待支付</tab-item>
            <tab-item>待发货</tab-item>
            <tab-item>全部订单</tab-item>
        </tab>
        <div class="order-content">
            <div class="content-title">
                <div class="title-left">2018.12.12</div>
                <div class="title-center">已完成</div>
                <div class="title-right">12323积分</div>
            </div>
            <div class="content-list"
                 @click='$router.push({name:"order"})'>
                <div class="img-content">
                    <div class="content"></div>
                    <div class="content"></div>
                    <div class="content"></div>
                </div>
                <div class="content-right">
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import Header from "@/components/common/Header.vue";
import { orderListApi } from "@/api/api";
import { common } from "@/logic";
export default {
  data() {
    return {
      tabActive: 0
    };
  },
  mounted() {
    this.getList(0);
  },
  components: {
    Tab,
    TabItem,
    Header
  },
  methods: {
    async getList(idx) {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      if (idx == 0) {
        try {
          await orderListApi.unpaid({ id: 0 }, token);
        } catch (error) {}
      } else if (idx == 1) {
        try {
          await orderListApi.unreceived({ id: 0 }, token);
        } catch (error) {}
      } else {
           try {
          await orderListApi.all({ id: 0 }, token);
        } catch (error) {}
      }
    },
    switchTabItem(index) {
      this.tabActive = index;
      this.getList(index)
    }
  }
};
</script>

<style lang='scss' scoped>
.order-list {
  color: #fff;
  background: #23262b;
  height: 100%;
  box-sizing: border-box;
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
      .title-left {
        flex: 1;
        text-align: left;
      }
      .title-center {
        flex: 1;
        text-align: center;
      }
      .title-right {
        flex: 1;
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
          flex: 1;
          background: red;
          height: 100%;
          margin-right: 10px;
        }
      }
      .content-right {
        flex: 1;
      }
    }
  }
}
</style>

