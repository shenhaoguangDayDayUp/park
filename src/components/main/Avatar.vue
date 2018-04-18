<template>
    <div class="avatar">
        <Header title="我的头像" :isShow="true"></Header>
        <div class="imgCont">
            <!-- <img :src="querySrc" alt="" height="60" width="60"> -->
            <img  src="../../assets/img/touxiang2@2x.png">
        </div>
        <vue-core-image-upload class="btn btn-primary" :crop="true" resize="local" inputOfFile='avatar' @imageuploaded="imageuploaded" :max-file-size="5242880" :headers="data" crop-ratio="1:1" text='修改头像' url="/api/member/avatar">
        </vue-core-image-upload>
    </div>
</template>
<script>
    import Header from '../common/Header'
    import VueCoreImageUpload from 'vue-core-image-upload';
    export default {
        name: 'Avatar',
        data() {
            return {
                src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
                data: {
                    'x-auth-token': sessionStorage.getItem('TOKEN')
                },
                querySrc: this.$route.query.src
            }
        },
        methods: {
            imageuploaded(res) {
                console.log(res)
                if (res.errcode == 0) {
                    this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
                    
                }
            }
        },
        mounted() {
            console.log(this.querySrc)
        },
        components: {
            'vue-core-image-upload': VueCoreImageUpload,
            Header
        },
    }
</script>
<style lang="scss" scoped>
    .avatar {
        color: #fff;
        height: 100vh;
        overflow: hidden;
        .imgCont {
            height:80%;
            width:100%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            img{
                width:100%;
                // height:200px;
            }
        }
    }
</style>
<style>
/* .avatar .g-core-image-corp-container .info-aside{
    position: absolute;
    bottom:0;
    left:0;
    background: #000;
}
.avatar .image-aside{
    position: absolute;
    top:0;
}
.avatar .g-crop-image-principal{
    background: #000;
} */
</style>




