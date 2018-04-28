<template>
    <div class="change-item">
        <div :class="['item-time',item.type=='PAYMENT'?'':'gold']">{{item.updateAt|dateFilter('yyyy-MM-dd hh:mm')}}</div>
         <div :class="['item',item.type=='PAYMENT'?'':'gold']">{{item.note}}</div>
          <div :class="['item-type',item.type=='PAYMENT'?'':'gold']">{{item.type|recordStatus}}</div>
           <div :class="['item-amount',item.type=='PAYMENT'?'':'gold']">{{item.amount|currency}}</div>
    </div>
</template>
<script>
export default {
    props:{
        item:{
            type:[Object],
            default(){
                return {}
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .change-item{
        width: 100%;
        font-size: 28px;
        color: white;
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 87px;
        border-bottom: 2px solid #323540;
        .gold{
            color:#ffcb16;
        }
        .item-time{
            width: 40%;
           text-align: left;
        }
        .item{
            flex: 1;
            text-align: center;
        }
        .item-type{
              flex: 1;
            text-align: center;
        }
        .item-amount{
             flex: 1;
            text-align: right;
        }
    }
</style>


