<template>
    <div class="change-address">
        <div class="receive">
            <span class='title'>收货人:</span>
            <span>{{item.receiverName}}</span>
        </div>
        <div class="tel">
            {{item.receiverMobileNumber}}
        </div>
        <div class="receive-detail">
            <div class="address">
                <span class='title'>
                    <span style="margin-right:20px">详细地址</span>:上海市黄浦区梅山镇上海市黄浦区梅山镇:上海市黄浦区梅山镇:上海市黄浦区梅山镇:上海市黄浦区梅山镇上海市黄浦区梅山镇:上海市黄浦区梅山镇:上海市黄浦区梅山镇:
                </span>
            </div>
            <div class="right-img" @click='editAddress' v-if='show'>
                    >
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "RightChange",
  methods:{
    editAddress(){
      this.$router.push({name:'ReceiversUpdate',query:{code:3}}) 
    }
  },
 computed: {
    show: {
      get() {
        return this.showEidt;
      },
      set(val) {
        this.$emit("update:showEidt", val);
      }
    }
  },
  props:{
    showEidt:{
        type:[Boolean],
       default(){
         return true
       }
    },
   
    item:{
       type:[Object,String],
       default(){
         return ''
       }
    }
  }
};
</script>
<style lang='scss' scoped>
.change-address {
  height: 230px;
  width: 100%;
  background: #2a2d36;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  //   justify-content: space-between;
  font-size: 33px;
  .receive {
    height: 108px;
    width: 50%;
    line-height: 108px;
    //   flex: 1;
    .title {
      margin-left: 20px;
    }
    .name {
      margin-left: 20px;
    }
  }
  .tel {
    flex: 1;
    line-height: 108px;
    text-align: right;
    margin-right: 20px;
  }
  .receive-detail {
    padding-right: 20px;
    padding-left: 20px;
    height: 122px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .right-img{
        width: 30px;
    }
    .title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>


