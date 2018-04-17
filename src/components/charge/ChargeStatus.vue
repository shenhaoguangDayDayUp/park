<template>
    <div class="change-status">
        <!-- <Header title='在线充值'></Header> -->
        <div class="content">
            <img v-if='status'  src="../../assets/img/chongzhichengong@1x.png"
                 alt="">
           <img v-else  src="../../assets/img/chongzhishibai@1x.png"
                 alt="">
                 <!--取消 chongzhishibai@1x -->
            <div v-if='status' class="message-tip">恭喜您,充值成功!</div>
            <div v-else class="message-tip">很抱歉,充值失败!</div>
        </div>
        <div class="button-box">
            <div class="game-center-button">游戏厅</div>
            <div class="change-tip" @click="$router.push({name:'change'})">交易明细</div>
        </div>

    </div>
</template>
<script>
import Header from "@/components/common/Header.vue";
import {transactionsApi} from '@/api/api'
import { common } from "@/logic";
export default {
  components: {
    Header
  },
  computed:{
    status(){
      return window.location.hash.queryParameters().trade_status == 'TRADE_SUCCESS'?true:false
    }
  },
  mounted(){
    this.$nextTick(res=>{
      if(this.status){
          this.rechargeCallBack()
      }
    
    })
  },
  methods: {
     async rechargeCallBack(){
       try {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
         var code =  window.location.hash.queryParameters().out_trade_no
            await  transactionsApi.successCharge({id:code},token)
           
       } catch (error) {
         alert(error)
       }
       
     
      }
  }
};
</script>
<style lang="scss" scoped>
.change-status {
  color: #fff;
  background: #23262b;
  height: 100%;
  font-size: 28px;
  .content {
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    height: 507px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 127px;
      height: 127px;
    }
    .message-tip {
      margin-top: 20px;
    }
  }
  .button-box {
    height: 197px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;
    div{
        height: 80px;
        line-height: 80px;
        color: black;
        text-align: center;
        border-radius: 10px;
    }
    .game-center-button {
                background: #ffcb16;
                
    }
    .change-tip{
        background: #d3d3d3;
    }
  }
}
</style>


