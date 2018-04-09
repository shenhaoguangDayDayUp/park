<template>
    <div class="right-change">
        <RightChange></RightChange>
        <RightChangeItems class="m-t-20"></RightChangeItems>
         <RightChangeItems></RightChangeItems>
         <div class="order">
             <div class="right-price-box">
                 <div class="price">奖品小计:</div>
                 <div class="score">10000积分</div>
             </div>
                 <div class="right-price-box">
                 <div class="price">快递费:</div>
                 <div class="score">10000积分</div>
             </div>
            <div class="right-price-box">
                 <div class="price">订单合计:</div>
                 <div class="score color-gold">10000积分</div>
             </div>
         </div>
          <div class="submit-box">
              <div class="submit-btn" @click='gotoSubmit'>提交</div>
          </div>
    </div>
</template>
<script>
import RightChange from "./RightChangeAddress.vue";
import RightChangeItems from "./RightChangeItems.vue";

export default {
  components: {
      RightChange,
      RightChangeItems
  },
  methods: {
    gotoSubmit(){
        this.$router.push({name:'order'})
    }
  }
};
</script>
<style lang='scss' scoped>
.right-change {
   
  color: #fff;
  background: #23262b;
  height: 100%;
  .order{
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
      .right-price-box{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content:flex-end;
        align-items: center;
          .price{
      
          }
          .score{
              margin-left: 20px;
             
          }
           .color-gold{
                  color:#ffcb16;
              }
      }
  }
  .submit-box{
      height: 120px;
      padding-top:21px;
       padding-right:18px;
          padding-left:18px;
         padding-bottom:21px;
         box-sizing: content-box;
         display: flex;
         flex-direction: column;
         justify-content: center;
         .submit-btn{
             line-height: 78px;
             height: 78px;
             background:#ffcb16; 
             border-radius: 10px;
             text-align: center;
             color: #000;
         }
  }
}
.m-t-20{
    margin-top:20px;
}
</style>


