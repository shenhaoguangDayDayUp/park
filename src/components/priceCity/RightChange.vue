<template>
    <div class="right-change">
        <RightChange :item='detail'></RightChange>
        
        <RightChangeItems v-for='(item,index) in detail.items' :item='item' :key='index' :class="[index==0?'m-t-20':'']"></RightChangeItems>
         <!-- <RightChangeItems></RightChangeItems> -->
         <div class="order">
             <div class="right-price-box">
                 <div class="price">奖品小计:</div>
                 <div class="score">{{detail.grandTotal}}积分</div>
             </div>
                 <div class="right-price-box">
                 <div class="price">快递费:</div>
                 <div class="score">{{detail.deliveryFee}}积分</div>
             </div>
            <div class="right-price-box">
                 <div class="price">订单合计:</div>
                 <div class="score color-gold">{{detail.itemsSubtotal}}积分</div>
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
import {orderCheckOutApi,loginApi} from '@/api/api'
import { common } from "@/logic";
export default {
    data(){
        return{
            detail:{},
        }
    },
  components: {
      RightChange,
      RightChangeItems
  },
 async mounted(){
       this.getInfo()
      this.getDefaultAddress()
      window.global.$root.eventHub.$on('addressUpdate',()=>{
          console.log('地址更新了')
         this.$vux.toast.show({
        text: '地址更新了',
      });
      })
      
  },
  methods: {
     async getDefaultAddress(){
             var token = {
          headers: { "x-auth-token": common.getCommon("TOKEN") }
        };
         try {
          const {data} =   await loginApi.receiversDefault({},token)
         this.$store.dispatch('toggleUpdateAddres',3333)
    
         } catch (error) {
             console.log(error)
         }
 
    },
   async gotoSubmit(){
      var token = {
          headers: { "x-auth-token": common.getCommon("TOKEN") }
        };
        var personalInfo = {
          receiverName: "Lin",
          receiverMobileNumber: "17717396576",
          receiverProvince: 2,
          receiverCity: 2822,
          receiverDistrict: 51979,
          receiverStreet: "中信廣場",
          items: []
        };
        var productList=[...this.detail.items];
      productList =    productList.map(item =>{
            return {product:{code:item.product.code},quantity:item.quantity}
          })
        personalInfo.items =  productList 
        try {
          const {data} =  await orderCheckOutApi.place(personalInfo,token)   
            this.$router.push({name:'order',query:{code:data.code}})
        } catch (error) {
            
        }

        
    },
     getInfo(){
         this.detail = JSON.parse(this.$route.query.product)
         console.log(JSON.parse(this.$route.query.product)) 
    //    await orderCheckOutApi({id})
    }
  }
};
</script>
<style lang='scss' scoped>
.right-change {
   
  color: #fff;
  background: #23262b;
  min-height: 100%;
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


