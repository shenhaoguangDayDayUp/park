<template>
    <div class="change">
        <Header title="交易明细" :isShow='true'></Header>
        <div class="content">
            <div class="title">
                <div class="title-left">余额</div>
                <div class="title-right">1400</div>
            </div>
            <ChangeItem></ChangeItem>
            <ChangeItem></ChangeItem>
            <ChangeItem></ChangeItem>
            <ChangeItem></ChangeItem>
            <ChangeItem></ChangeItem>
            <ChangeItem></ChangeItem>
        </div>
    </div>
</template>
<script>
import Header from "@/components/common/Header.vue";
import ChangeItem from "./ChangeItem.vue";
export default {
  name: "",
  components: {
    Header,
    ChangeItem
  }
};
</script>
<style lang="scss" scoped>
.change {
  color: #fff;
  background: #23262b;
     height: 100%;
  font-size: 28px;
  .content {
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    .title {
      display: flex;
      flex-direction: row;
      height: 94px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ffcb16;
      &-left {
        // flex: 1;
        color: #ffcb16;
      }
      &-right {
        // flex: 1;
        color: #ffcb16;
      }
    }
  }
}
</style>


