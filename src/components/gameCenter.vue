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
                fdaafasd
            </TableviewCell>
        </div>
        <mt-cell-swipe 
                       :right="[
    {
      content: 'Delete',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('delete')
    }
  ]">
    
  </mt-cell-swipe>
  
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
  methods: {
    deleteItem() {},
    tachStart(index){
        var cell = this.$refs.cell
         cell.map((item,idx)=>{
             item._endEditing()
         })
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


