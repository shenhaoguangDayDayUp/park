<template>
    <div class="footer-bar">
        <div class="select-all-img" @click.stop='selectClick'>
            <img v-if='allSelect'  src="../../../assets/img/fuxuan2@1x.png"
                 alt="">
            <img v-else src="../../../assets/img/yuan@1x.png"
                 alt="">
        </div>
        <div class="select-all-quntity">
            共
            <span>{{amount}}</span>件,
        </div>
        <div class="select-all-score">
            <span>{{total}}积分</span>
        </div>
        <div class="select-all-button">
            <div class="select-all-pay" @click='$router.push({name:"rightChange"})'>兑换</div>
        </div>
    </div>
</template>
<script>
export default {
   methods:{
       selectClick(){
           this.$emit('update:allSelect', !this.allSelect)
    

               this.$emit("selectAll");
  
 
       }
   },
  props: {
    amount: {
      type: [Number, String],
      default() {
        return 0;
      }
    },
    total: {
      type: [Number, String],
      default() {
        return 0;
      }
    },
    allSelect: {
      type: [Boolean],
      default() {
        return false;
      }
    }

  }
};
</script>
<style lang="scss" scoped>
.footer-bar {
  width: 100%;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  height: 122px;
  border-top: 1px solid #323540;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #23262b;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28px;
  .select-all-img {
    margin-right: 10px;
    img{
       width: 30px;
       height: 30px;
       line-height:122px

    }
  }
  .select-all-quntity {
    span {
      color: #ffcb16;
    }
  }
  .select-all-score {
    color: #ffcb16;
    margin-left: 10px;
  }
  .select-all-button {
    margin-left: 20px;
    background: #ffcb16;
    height: 80px;
    padding: 20px;
    flex: 1;
    text-align: center;
    border-radius: 10px;
    .select-all-pay {
      color: black;
    }
  }
}
</style>


