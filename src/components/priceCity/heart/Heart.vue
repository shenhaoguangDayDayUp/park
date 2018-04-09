<template>
    <div class="heart">
        <Header title="心愿单"></Header>
      
     <HeartGrop>
        <HeartItems
            v-for="(item,index) in list"
            :key="item.id"
            :url="item.thumbImage"
            :title="item.name"
            :desc="item.specification"
            :price="item.salePrice"
            :selected.sync="item.selected"
            @left-click='leftClick'
            radio>
            <div
            slot="right">
            <HeartCard @valueChange='valueChange' :num.sync='item.quantity' :index='index'></HeartCard>
            </div>
        </HeartItems>
      </HeartGrop>
      <FooterBar :amount='amount' :total='total' :allSelect.sync='allSelect' @selectAll='selectAll'></FooterBar>
    </div>
</template>
<script>
import HeartItems from './HeartItems'
import HeartGrop from './HeartGrop'
import HeartCard from '@/components/mine/HeartCard.vue'
import FooterBar from './FooterBar.vue'
import Header from '@/components/common/Header.vue'

export default {
  components:{
      HeartGrop,
      HeartItems,
      HeartCard,
      FooterBar,
      Header
  },
  methods:{
      selectAll(){
          if(this.allSelect){
            this.list = this.list.map(item =>{
            item.selected = true
            return item
           })
          }else{
             this.list = this.list.map(item =>{
            item.selected = false
            return item
           })
          }
         this.getAmount()
         this.getTotal()
      },
      leftClick(){
         this.getAmount()
         this.getTotal()
      },
      valueChange(item){
          this.getAmount();
          this.getTotal()
      },
      getAmount(){
        this.amount = this.list
        .filter(item => item.selected)
        .map(item =>  Number(item.quantity))
        .reduce((pre, cur) => {
            console.log(cur)
          return pre + cur
        }, 0)
      },
      getTotal () {
      this.total = this.list
        .filter(item => item.selected)
        .map(item => item.salePrice * Number(item.quantity))
        .reduce((pre, cur) => {
          return pre + cur
        }, 0)
      return this.total
    }
  },
  computed:{
     
  
  },
  data(){
      return {
          allSelect:false,
          amount:0,
          total:0,
          list:[{ id: 1, thumbImage: '2222444', name: '尖山发哈就是发放大发生法官法发电饭煲发多发点是发发发发发比较符合', specification: 'fadfdsa', selected: false,quantity:1,salePrice:100 },{ id: 2, thumbImage: '2222444', name: '尖山发哈就是发放大发生法官法发电饭煲发多发点是发发发发发比较符合', specification: 'fadfdsa',salePrice:200, selected: true,quantity:2 }]
      }
      
  }
}
</script>
<style lang="scss" scoped>
    .heart{
    color: #fff;
    background: #23262b;
    height: 100%;
    }
</style>


