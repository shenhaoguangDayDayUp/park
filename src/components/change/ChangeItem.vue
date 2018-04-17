<template>
    <div class="change-item">
        <div class="item-time">{{item.updateAt|dateFilter}}</div>
         <div class="item">{{item.note}}</div>
          <div class="item">{{item.type|recordStatus}}</div>
           <div class="item">{{item.amount}}</div>
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
        .item-time{
            width: 40%;
           text-align: center;
        }
        .item{
            flex: 1;
            text-align: center;
        }
    }
</style>


