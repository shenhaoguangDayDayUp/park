<template>
  <div class="message">
      <!-- <div class="close">
      <router-link to="/"><img src="../assets/img/close.png"></router-link>
      </div> -->
      <ul class="messList">
         <li>
             <span>2018.04.03<span>充值提醒</span></span>
         </li>
         <li>
             <span>2018.04.03<span>充值提醒</span></span>
         </li>
         <li>
             <span>2018.04.03<span>充值提醒</span></span>
         </li>
         <li>
             <span>2018.04.03<span>充值提醒</span></span>
         </li>
         <li>
             <span>2018.04.03<span>充值提醒</span></span>
         </li>
      </ul>
  </div>
</template>
<script>
  export default {
    name: "Message",
    data() {
      return {
      };
    },
    mounted(){

    }
  };
</script>
<style lang="scss" scoped>
    .message{
        background-color: #23262b;
        height:100%;
        .messList{
            li{
                height:93px;
                border-bottom:2px solid #323540;
                margin-bottom:26px;
                color:#fff;
                font-size:30px;
                padding-left:23px;
                background: #2a2d36;
                display: flex;
                justify-content: center;
                flex-direction: column;
                span span{
                    margin-left:27px;
                }
            }
            li:first-child{
                color: #ffcb16;
            }
            li:last-child{
                margin:0;
            }
        }
    }
    .close {
        height: 40px;
        width: 100px;
        img {
        width: 18px;
        margin-left: 20px;
        margin-top: 11px;
        margin-bottom: 11px;
        }
  }
</style>

