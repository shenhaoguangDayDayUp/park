<template>
  <div class="heart">
    <Header title="心愿单"
            :isShow="true"></Header>
    <HeartGrop class='heart-group'>
      <TableviewCell ref='cell'
                     v-for="(item,index) in list"
                     :key='index'
                     @deleteItem="deleteItem"
                     :index='index'
                     @tachStart='tachStart'
                     class='m-b-22'>
        <HeartItems v-outside='outside'
                    :key="item.code"
                    :url="item.imagePath"
                    :title="item.name"
                    :desc="item.specification"
                    :price="item.price"
                    :selected.sync="item.selected"
                    @left-click='leftClick'
                    radio>
          <div slot="right">
            <HeartCard @valueChange='valueChange'
                       :num.sync='item.quantity'
                       :index='index'></HeartCard>
          </div>
        </HeartItems>
      </TableviewCell>

    </HeartGrop>
    <!-- <toast v-model="showToast" type="text" :time="800" is-show-mask text="Hello World" :position="position">{{ $t('Basic Usage') }}</toast> -->
    <FooterBar :amount='amount'
               :total='total'
               :allSelect.sync='allSelect'
               @gotoChange='selectProduct'
               @selectAll='selectAll'></FooterBar>
    <!-- <x-dialog v-model="showToast">
      <div class="my-dialog">
        <div class="title">是否前往登录</div>
        <div class="content">是否前往登录</div>
        <div class='bottom'>
          <div class="left" @click='gotoCancel'>取消</div>
          <div class="right" @click='gotoConfirm'>确定</div>
        </div>
      </div>
    </x-dialog> -->
    <!-- :visible.sync='showToast' -->
    <!-- <Dialog :visible.sync='showToast' @success='success' @cancel='cancel'>
      <template slot="header">
            您还没有登录
      </template>
        <template slot="content">
          是否前往登录?
        </template>

    </Dialog> -->
    <Empty :show.sync='show'></Empty>

  </div>
</template>
<script>
import HeartItems from "./HeartItems";
import HeartGrop from "./HeartGrop";
import HeartCard from "@/components/mine/HeartCard.vue";
import FooterBar from "./FooterBar.vue";
import Header from "@/components/common/Header.vue";
import { Swipeout, SwipeoutItem, SwipeoutButton, Toast, XDialog } from "vux";
import TableviewCell from "@/common/TableviewCell";
import { heartCartApi, orderCheckOutApi } from "@/api/api";
import { common } from "@/logic";
import { mapGetters } from "vuex";

export default {
  components: {
    XDialog,
    HeartGrop,
    HeartItems,
    HeartCard,
    FooterBar,
    Header,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    TableviewCell,
    Toast
  },
  async mounted() {
    await this.getList();
    this.show = this.list.length > 0 ? false : true;
    this.defaultSelect();
  },
  watch: {
    list: {
      handler(val) {
        this.gotoChangeBtn = val.filter(item => item.selected).length
          ? true
          : false;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    defaultSelect() {
      if (this.goodsList.goods.length) {
        this.list.map(item => {
          this.goodsList.goods.map(res => {
            if (res.product.code == item.code) {
              return (item.selected = true);
            }
          });
        });
        this.allSelect = this.goodsList.selected;
        this.getAmount();
        this.getTotal();
        // this.selectAll()
        console.log(this.list);
      }
    },
    success() {
      this.$router.push({ name: "Login" });
    },
    cancel() {},
    outside(e) {
      this.tachStart();
    },
    async selectProduct() {
      if (!this.list.length) {
        return this.$vux.toast.show({
          text: "心愿单为空"
        });
      }
      if (!this.gotoChangeBtn) {
        this.$vux.toast.show({
          text: "请选择商品",
          type: "text",
          position: "middle",
          time: 2000
        });
      } else {
        var token = {
          headers: { "x-auth-token": common.getCommon("TOKEN") }
        };
        var personalInfo = {
          // receiverName: "Lin",
          // receiverMobileNumber: "17717396576",
          // receiverProvince: 2,
          // receiverCity: 2822,
          // receiverDistrict: 51979,
          // receiverStreet: "中信廣場",
          items: []
        };
        var productList = [...this.list];
        productList = productList.filter(item => item.selected).map(item => {
          return { product: { code: item.code }, quantity: item.quantity };
        });
        personalInfo.items = productList;
        this.$store.dispatch("toggleGoodsList", {
          goods: personalInfo.items,
          selected: this.allSelect
        });
        try {
          // const { data } = await orderCheckOutApi.checkout(personalInfo, token);
          // var productInfo = JSON.stringify(data);
          var productInfo = JSON.stringify({ personalInfo: personalInfo });
          this.$router.push({
            name: "rightChange",
            query: { product: productInfo }
          });
        } catch (error) {}
      }
    },

    async getList() {
      try {
        if (common.getCommon("TOKEN")) {
          var token = {
            headers: { "x-auth-token": common.getCommon("TOKEN") }
          };
          const { data } = await heartCartApi.entity({}, token);
          this.list = data.records;
          this.list = this.list.map(item => {
            return {
              ...item.product,
              selected: false,
              quantity: item.quantity
            };
          });
          this.getAmount();
          this.getTotal();
        } else {
          this.show = this.list.length > 0 ? false : true;
          this.$$message.confirm.show({
            confirm(vm, resolve) {
              vm.$router.push({ name: "Login" });
              resolve();
            },
            cancel(vm, resolve) {
              vm.$router.push({ name: "gameCenter" });
              resolve();
            },
            title: "您还没有登录",
            content: "是否前往登录?",
            rightBtnText: "随便看看",
            leftBtnText: "确定"
          });
       
        }
      } catch (err) {}
    },
    async deleteItem(index) {
      var that = this;
      this.$$message.confirm.show({
        confirm(vm, resolve) {
          resolve();
          try {
            var product = that.list[index];
            var token = {
              headers: { "x-auth-token": common.getCommon("TOKEN") }
            };
            heartCartApi
              .deleteProduct({ product: { code: product.code } }, token)
              .then(res => {
                that.list.splice(index, 1);
                that.show = that.list.length > 0 ? false : true;
                that.tachStart();
                that.getAmount();
                that.getTotal();
                that.$vux.toast.show({
                  text: "删除成功",
                  type: "text",
                  position: "middle",
                  time: 2000
                });
              });
          } catch (error) {}
        },
        title: "提示",
        content: "是否删除商品?",
        rightBtnText: "取消",
        leftBtnText: "确定"
      });
    },
    tachStart() {
      var cell = this.$refs.cell;
      cell.map((item, idx) => {
        item._endEditing();
      });
    },
    selectAll() {
      if (this.list.length == 0) {
        return this.$vux.toast.show({
          text: "请先添加心愿"
        });
      }
      if (this.allSelect) {
        this.list = this.list.map(item => {
          item.selected = true;
          return item;
        });
      } else {
        this.list = this.list.map(item => {
          item.selected = false;
          return item;
        });
      }
      this.getAmount();
      this.getTotal();
    },
    leftClick() {
      this.getAmount();
      this.getTotal();
      this.checkAll();
    },
    async valueChange(item) {
      const product = this.list[item.index];
      console.log(product);
      console.log(item);
      if (item.value == 1 && item.type == -1) {
        return;
        // return this.$vux.toast.show({
        //   text: "不能再少了"
        // });
      }

      try {
        if (common.getCommon("TOKEN")) {
          var obj = { product: { code: product.code }, quantity: item.type };
          var token = {
            headers: { "x-auth-token": common.getCommon("TOKEN") }
          };
          await heartCartApi.addOrdel(obj, token);
          //   await this.getList();
          this.getAmount();
          this.getTotal();
        } else {
          this.$router.push({ name: "Login" });
        }
      } catch (error) {
        
      }
    },
    getAmount() {
      this.amount = this.list
        .filter(item => item.selected)
        .map(item => Number(item.quantity))
        .reduce((pre, cur) => {
          console.log(cur);
          return pre + cur;
        }, 0);
    },
    getTotal() {
      this.total = this.list
        .filter(item => item.selected)
        .map(item => item.price * Number(item.quantity))
        .reduce((pre, cur) => {
          return pre + cur;
        }, 0);
      return this.total;
    },
    checkAll() {
      this.selectedList = this.list.filter(item => {
        if (item.selected) {
          return item;
        }
      });
      if (this.selectedList.length == this.list.length) {
        this.allSelect = true;
      } else {
        this.allSelect = false;
      }
    }
  },
  computed: {
    ...mapGetters(["goodsList"])
  },
  data() {
    return {
      showToast: false,
      gotoChangeBtn: false,
      selectedList: [],
      allSelect: false,
      amount: 0,
      total: 0,
      show: false,
      list: [
        // {
        //   id: 1,
        //   thumbImage: "2222444",
        //   name:
        //     "尖山发哈就是发放大发生法官法发电饭煲发多发点是发发发发发比较符合",
        //   specification: "fadfdsa",
        //   selected: false,
        //   quantity: 1,
        //   price: 100
        // },
        // {
        //   id: 2,
        //   thumbImage: "2222444",
        //   name:
        //     "尖山发哈就是发放大发生法官法发电饭煲发多发点是发发发发发比较符合",
        //   specification: "fadfdsa",
        //   price: 200,
        //   selected: true,
        //   quantity: 2
        // }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.heart {
  color: #fff;
  background: #23262b;
  height: 100%;
  // overflow: auto;
  padding-top: 94px;
  .m-b-22 {
    margin-bottom: 22px;
  }
  // .my-dialog {
  //   font-size: 32px;
  //   height: 368px;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   .title {
  //     height: 60px;
  //     padding: 10px;
  //     width: 100%;
  //     text-align: center;
  //     border-bottom: 1px solid #cccccc;
  //   }
  //   .content {
  //     flex: 2;
  //     display:flex;
  //     align-items:center;
  //     justify-content: center;
  //   }
  //   .bottom {
  //     flex: 1;
  //     display: flex;
  //     flex-direction: row;
  //     width: 100%;
  //     align-items: center;

  //     .left{
  //       padding:10px;
  //       flex: 1;
  //       margin-left: 20px;
  //       border: 1px solid #ffcb16;
  //       margin-right: 10px;
  //       border-radius: 5px;
  //     }
  //     .right{
  //        padding:10px;
  //        flex: 1;
  //        background: #ffcb16;
  //       margin-right: 20px;
  //         margin-left: 10px;
  //                 border-radius: 5px;
  //     }
  //   }
  // }
  // .heart-group{
  //   padding-bottom:122px;
  // }
}
</style>


