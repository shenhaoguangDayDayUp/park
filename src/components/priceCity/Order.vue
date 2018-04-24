<template>
  <div class="right-change">
    <Header title="订单详情"
            :isShow='true'></Header>
    <RightChange :item='defaultAderess'
                 :showEidt.sync='shows'></RightChange>
    <RightChangeItems v-for='(item,index) in detail.items'
                      :item='item'
                      :key='index'
                      :class="[index==0?'m-t-20':'']"></RightChangeItems>
    <div class="order">
      <div class="right-price-box">
        <div class="status">
          <div>
            <span>状态:</span>
            <span class='stauts-detail'>{{detail.status|orderStatus}}</span>
          </div>
        </div>
        <div class="price">奖品小计:</div>
        <div class="score">{{detail.itemsSubtotal}}积分</div>
      </div>
      <div class="right-price-box">
        <div class="price">快递费:</div>
        <div class="score">{{detail.deliveryFee}}积分</div>
      </div>
      <div class="right-price-box">
        <div class="price">订单合计:</div>
        <div class="score color-gold">{{detail.grandTotal}}积分</div>
      </div>
    </div>
    <div class="submit-box"
         v-if='detail.status =="REQUEST"'>
      <div class="submit-cancel"
           @click='gotoCancel'>取消</div>
      <div class="submit-btn"
           @click='gotoPayment'>支付</div>
    </div>
  </div>
</template>
<script>
import RightChange from "./RightChangeAddress.vue";
import RightChangeItems from "./RightChangeItems.vue";
import { common } from "@/logic";
import { orderCheckOutApi, loginApi } from "@/api/api";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["defaultAderess"]),
    shows(){
      return this.detail.status =="REQUEST"?true:false
    }
  },
  data() {
    return {
      detail: {}
    };
  },
  mounted() {
    this.getDefaultAddress();
    this.getOrderInfo();
  },
  methods: {
    async getDefaultAddress() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        const { data } = await loginApi.receiversDefault({}, token);
        if(!data){
          this.$vux.toast.show({
            text:'请先填写收货地址'
          })
        }
        this.$store.dispatch("toggleUpdateAddres", data);
      } catch (error) {
        console.log(error);
      }
    },
    async gotoCancel() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        await orderCheckOutApi.cancel({ id: this.$route.query.code }, token);
        this.$router.push({ name: "PrizeCity" });
      } catch (error) {}
    },
    async gotoPayment() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
         await orderCheckOutApi.payment({ id: this.$route.query.code }, token);
           this.$vux.toast.show({
          text: "购买成功"
        });
        
         this.$router.push({ name: "商品详情",params:{id:this.detail.items[0].product.code}, query: { index: 1,code:this.$route.query.code} });
        // this.$router.push({ name: "orderLsit", query: { index: 1 } });
      } catch (error) {
        
      }
     
    },
    async getOrderInfo() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        const { data } = await orderCheckOutApi.entity(
          { id: this.$route.query.code },
          token
        );
        this.detail = data;
      } catch (error) {}
    }
  },
  props: {
    showButton: {
      type: Boolean,
      default: true
    }
  },
  components: {
    RightChange,
    RightChangeItems
  }
};
</script>
<style lang='scss' scoped>
.right-change {
  color: #fff;
  background: #23262b;
  //   height: 100%;
  min-height: 100%;
  .order {
    width: 100%;
    box-sizing: border-box;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    height: 287px;
    padding-top: 68px;
    padding-bottom: 68px;
    padding-right: 30px;
    border-bottom: 1px solid #323540;
    .right-price-box {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .status {
        flex: 1;
        padding-left: 20px;
        .stauts-detail {
          margin-left: 10px;
        }
      }
      .price {
      }
      .score {
        margin-left: 20px;
      }
      .color-gold {
        color: #ffcb16;
      }
    }
  }
  .submit-box {
    height: 120px;
    padding-top: 21px;
    padding-right: 18px;
    padding-left: 18px;
    padding-bottom: 21px;
    box-sizing: content-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .submit-btn {
      flex: 1;
      line-height: 78px;
      height: 78px;
      background: #ffcb16;
      border-radius: 10px;
      text-align: center;
      color: #000;
    }
    .submit-cancel {
      width: 230px;
      line-height: 78px;
      height: 78px;
      background: #d3d3d3;
      border-radius: 10px;
      text-align: center;
      color: #000;
      margin-right: 26px;
    }
  }
}
.m-t-20 {
  margin-top: 20px;
}
</style>


