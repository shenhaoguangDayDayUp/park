<template>
    <div class="gameCenter">
        游戏中心
        <HeartCard :num.sync='quntity'></HeartCard>
        <Images :class="['test']"
                imageSrc='http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'></Images>
        <div v-for="i in list"
             :key='i'>
            <TableviewCell ref='cell' style="height:100px"
                           :index="i"
                           @deleteItem="deleteItem"
                           @tachStart='tachStart'>
                <!-- fdaafasd -->
            </TableviewCell>
        </div>

  
        <!-- <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in swipeList">
                <a :href="item.url">
              </a>
            </mt-swipe-item>
        </mt-swipe> -->
    </div>
</template>
<script>
import HeartCard from "./mine/HeartCard";
import Images from "@/common/Image";
import TableviewCell from "@/common/TableviewCell";
export default {
  mounted(){
  this.alipay()
  },
  methods: {
    deleteItem() {},
    tachStart(index){
        var cell = this.$refs.cell
         cell.map((item,idx)=>{
             item._endEditing()
         })
    },
    alipay(){
        //  const div = document.createElement('div');
        //  div.innerHTML = '<form name=\"punchout_form\" method=\"post\" action=\"https://openapi.alipaydev.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=KDW980dqSU4WRbomJFiwQalJW0H4otLHLitS9UqfATZgRjTILpiiO3ggD9qhdLwqOciFrsVDLaAi32jwTp%2BfPNPfxws5XGDOiJ58sJg5yFXwOMZ5zUzTHbBWfChIzuSz3fKM79Zb71dIfpZ7wwovymDTbnkcov74fuFb9xa00iQyTMgEfNWG%2FEinik320EQJ23Z6tdFFsFbkmcPHlJtZqE9plOyeepQpzn%2Brwn46F0DvImRxqrPVps0DoZXdLFPWroTnd9KOraw2bb4qO%2BuwVbWmxLu%2BeKyznk3TmjcJmlm58C%2FoMeJDm8i3DeBSRlvxI%2BLip5G6BD9U3Sy3xTWN1A%3D%3D&version=1.0&app_id=2016091000480588&sign_type=RSA2&timestamp=2018-04-09+17%3A12%3A52&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json\">\n<input type=\"hidden\" name=\"biz_content\" value=\"{&quot;out_trade_no&quot;:&quot;180409000000383&quot;,&quot;product_code&quot;:&quot;QUICK_WAP_WAY&quot;,&quot;subject&quot;:&quot;在线充值&quot;,&quot;total_amount&quot;:&quot;5&quot;}\">\n<input type=\"submit\" value=\"立即支付\" style=\"display:none\" >\n</form>\n'
        //   document.body.appendChild(div);
        //  document.forms.punchout_form.submit(); 
    }
  },
  data() {
    return {
      list: [1, 2, 3, 4],
      quntity: 1,
      swipeList: [
        {
          url: "http://www.itcast.cn/subject/phoneweb/index.html",
          img: "http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg"
        },
        {
          url: "http://www.itcast.cn/subject/phoneweb/index.html",
          img: "http://ofv795nmp.bkt.clouddn.com/vuelogobanner2-1.jpg"
        }
      ]
    };
  },
  components: {
    HeartCard,
    Images,
    TableviewCell
  }
};
</script>
<style lang="scss">
.test {
  height: 100px;
  width: 100px;
}
// .gameCenter {
//     background: #23262B;
//     height:100%;
//     color:#fff;
//     .mint-swipe-items-wrap{
//         height:200px;
//         width:100%;
//         background: red;
//     }
// }
</style>


