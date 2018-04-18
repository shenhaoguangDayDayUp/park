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
                     style="margin-bottom:20px">
        <HeartItems v-outside='outside' :key="item.code"
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
  </div>
</template>
<script>
import HeartItems from "./HeartItems";
import HeartGrop from "./HeartGrop";
import HeartCard from "@/components/mine/HeartCard.vue";
import FooterBar from "./FooterBar.vue";
import Header from "@/components/common/Header.vue";
import { Swipeout, SwipeoutItem, SwipeoutButton, Toast } from "vux";
import TableviewCell from "@/common/TableviewCell";
import { heartCartApi, orderCheckOutApi } from "@/api/api";
import { common } from "@/logic";

export default {
 
  components: {
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
  mounted() {
    this.getList();
  },
  watch: {
    list: {
      handler(val) {
        this.gotoChangeBtn = val.filter(item => item.selected).length
          ? true
          : false;
        console.log(this.gotoChangeBtn);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    outside(e){
      this.tachStart()
    },
    async selectProduct() {
      console.log(this.gotoChangeBtn);
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
          receiverName: "Lin",
          receiverMobileNumber: "17717396576",
          receiverProvince: 2,
          receiverCity: 2822,
          receiverDistrict: 51979,
          receiverStreet: "中信廣場",
          items: []
        };
        var productList = [...this.list];
        productList = productList.filter(item => item.selected).map(item => {
          return { product: { code: item.code }, quantity: item.quantity };
        });
        personalInfo.items = productList;
        console.log(personalInfo);
        try {
          const { data } = await orderCheckOutApi.checkout(personalInfo, token);
          var productInfo = JSON.stringify(data);
          // console.log(JSON.stringify(data))
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
          this.$router.push({ name: "Login" });
        }
        console.log(this.list);
      } catch (err) {}
    },
    async deleteItem(index) {
      try {
        var product = this.list[index];
        var token = {
          headers: { "x-auth-token": common.getCommon("TOKEN") }
        };
        await heartCartApi.deleteProduct(
          { product: { code: product.code } },
          token
        );
        this.list.splice(index, 1);
        this.tachStart();
        this.getAmount();
        this.getTotal();
        this.$vux.toast.show({
          text: "删除成功",
          type: "text",
          position: "middle",
          time: 2000
        });
      } catch (error) {}
    },
    tachStart() {
      var cell = this.$refs.cell;
      cell.map((item, idx) => {
        item._endEditing();
      });
    },
    selectAll() {
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
      console.log(item);
      try {
        if (common.getCommon("TOKEN")) {
          const product = this.list[item.index];
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
        // console.log(error)
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
  computed: {},
  data() {
    return {
      gotoChangeBtn: false,
      selectedList: [],
      allSelect: false,
      amount: 0,
      total: 0,
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
  // .heart-group{
  //   padding-bottom:122px;
  // }
}
</style>


