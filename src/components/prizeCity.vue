<template>
  <div class="prizeCity">
      <div class="index_banner_1">
        <mt-swipe>
          <mt-swipe-item v-for="(banner, index)  in bannerData" :key="index">
            <div class="index_banner_1">
              <img v-lazy="banner.url" @click="bannerHandle(banner)">
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      bannerData:[]
    }
  }
} 
</script>
<style lang="scss" scoped>
.prizeCity{
  color:#fff;
  background: #23262B;
  height:100%;
}
</style>


