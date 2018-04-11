<template>
     <div class="nav-bar">
            <div class="left-back">
              <img src="../../assets/img/close.png"
                     alt="" @click.stop='$router.go(-1)'>
            </div>
            <div class="title">
                {{title}}
            </div>
            <div class="right">
                
            </div>
   </div>
</template>
<script>
export default {
  props:{
      title:{
          type:[String],
          default(){
              ''
          }
      }
  }
}
</script>
<style lang="scss" scoped>
    .nav-bar{
      font-size: 34px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center; 
      height: 94px;
      width: 100%;
      padding-left: 20px;
      background: #1b1a20;
      box-shadow: 0px 9px 9px 0px 
		rgba(0, 0, 0, 0.09);
      .left-back{
          flex: 1;
          img{
              width: 20px;
              height: 34px;
          }
      }
       .title{
            flex:1; 
            text-align: center;
       } 
       .right{
           flex: 1;
       }
    }
</style>


