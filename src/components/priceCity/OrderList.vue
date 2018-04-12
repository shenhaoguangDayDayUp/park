<template>
    <div class="order-list">
        <div class="nav-bar">
            <div class="left-back">
              <img src="../../assets/img/close.png"
                     alt="" @click.stop='$router.go(-1)'>
            </div>
            <div class="title">
                订单详情
            </div>
            <div class="right">
          
            </div>
        </div>
        <div class="order-content">
            <div class="content-title">
                 <div class="title-left">2018.12.12</div>
                 <div class="title-center">已完成</div>
                 <div class="title-right">12323积分</div>
            </div>
             <div class="content-list" @click='$router.push({name:"order"})'>
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
export default {

};
</script>

<style lang='scss' scoped>
.order-list {
  color: #fff;
  background: #23262b;
   height: 100%;
  .nav-bar{
      font-size: 34px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center; 
      height: 74px;
      width: 100%;
      padding-left: 20px;
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
       }
    }
  .order-content{
      font-size: 28px;
      height: 388px;
      padding-left: 20px;
      padding-right: 20px; 
      background: #2a2d36;
      .content-title{
          height: 128px;
          display: flex;
          flex-direction: row;
          align-items: center;
          .title-left{
              flex: 1;
              text-align:left;
          }
           .title-center{
              flex: 1;
              text-align:center;
          }
           .title-right{
              flex: 1;
              text-align:right;
          }
      }
      .content-list{
          padding-top:15px;
          display: flex;
          flex-wrap: nowrap;
          height: 206px;
          align-items: center;
         justify-content:center;
          .img-content{
              height: 100%;
             flex: 20;
             display: flex;
             flex-direction: row;
             box-sizing: border-box;
             align-items: center;
             .content{
                 flex: 1;
                 background: red;
                 height: 100%;
                 margin-right: 10px
             }
          }
          .content-right{
              flex: 1
          }
      }
  }
}
</style>

