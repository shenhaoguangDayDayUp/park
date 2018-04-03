<template>
    <div class="gameCenter">
        游戏中心
        <!-- <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in swipeList">
                <a :href="item.url">
              </a>
            </mt-swipe-item>
        </mt-swipe> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                swipeList: [{
                        url: "http://www.itcast.cn/subject/phoneweb/index.html",
                        img: "http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg"
                    },
                    {
                        url: "http://www.itcast.cn/subject/phoneweb/index.html",
                        img: "http://ofv795nmp.bkt.clouddn.com/vuelogobanner2-1.jpg"
                    }
                ]
            }
        }
    }
</script>
<style lang="scss">
    .gameCenter {
        background: #23262B;
        height:100%;
        color:#fff;
        .mint-swipe-items-wrap{
            height:200px;
            width:100%;
            background: red;
        }
    }
</style>


