<template>
    <div class="change-item">
        <div>{{item.updateAt|dateFilter}}</div>
         <div>{{item.note}}</div>
          <div>{{item.type|recordStatus}}</div>
           <div>{{item.amount}}</div>
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
    }
</style>


