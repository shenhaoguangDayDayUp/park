<template>
    <div class="avatar">
        <Header title="我的头像" :isShow="true"></Header>
        <div class="imgCont">
            <img :src="querySrc" alt="">
            <!-- <img  src="../../assets/img/touxiang2@2x.png"> -->
        </div>
        <vue-core-image-upload 
        :crop="false" 
        inputOfFile='avatar' 
        inputAccept='image/jpg,image/jpeg,image/png'
        @imagechanged="imagechanged"
        :max-file-size="5242880" compress="80" :headers="data" text='修改头像' url="/api/gateway/mobile/member/avatar">
        </vue-core-image-upload>
    </div>
</template>
<script>
    import Header from '../common/Header'
    import config from '../../api/config.js'
    import VueCoreImageUpload from 'vue-core-image-upload';
    import {
        loginApi,
    } from '../../api/api';
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
             imagechanged(code) {
                 console.log(code)
             },
             imageuploading(res) {
                console.log(res)
             },
            // imageuploaded(res, data,done,errorUpload,isBinary,) {
            imageuploaded(res, data) {
                console.log(res)
                console.log('data')
                console.log(data)
                // console.log(res.contains(200)) 
                // if (res.errcode == 500) {
                //     this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
                // }
                if (res.indexOf('images') !== -1) {
                    this.querySrc = config.apiUrlPrefix[process.env.NODE_ENV]+ res + '?r=' + new Date().getTime();// 头像加时间戳
                    this.$vux.toast.show({
                        text: '修改成功!',
                    });
                } else {
                    this.$vux.toast.show({
                        text: '头像修改失败!',
                    });
                }
            },
            // 异常处理
            errorhandle(err) {  
                console.log(111)
                console.log(err.response);
            }
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
            height: 80%;
            width: 100%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            img {
                width: 100%; // height:200px;
            }
        }
        .g-core-image-upload-form input[name="avatar"] {
            font-size: 30px;
            text-align: center;
        }
    }
</style>
<style>
    .avatar .g-core-image-upload-btn {
        font-size: 30px;
        text-align: center;
        letter-spacing: 2px;
    }
    .avatar .g-core-image-corp-container .btn-upload:hover {
        border-color: #ffcb16;
    }
    .avatar .image-mask {
        position: absolute;
        z-index: 999;
        /* background: #000; */
    }
    .avatar .g-core-image-corp-container .info-aside {
        position: absolute;
        bottom: 0;
        left: 0;
        background: #000;
    }
    .avatar .g-core-image-corp-container .btn-upload {
        background: #ffcb16;
        border-color: #ffcb16;
        width: 100px;
    }
    .avatar .image-mask .mask {
        background: #000!important;
    }
</style>




