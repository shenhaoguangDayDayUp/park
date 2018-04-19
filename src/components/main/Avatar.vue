<template>
    <div class="avatar">
        <Header title="我的头像" :isShow="true"></Header>
        <div class="imgCont">
            <img :src="querySrc" alt="">
            <!-- <img  src="../../assets/img/touxiang2@2x.png"> -->
        </div>
        <vue-core-image-upload 
        class="btn btn-primary" 
        :crop="true" 
        inputOfFile='avatar' 
        inputAccept='image/jpg,image/jpeg,image/png'
        @imageuploaded="imageuploaded" 
        :max-file-size="1048576" 
        compress="90" 
        :headers="data" 
        text='修改头像' 
        url="/api/gateway/mobile/member/avatar">
        </vue-core-image-upload>
        <!-- <form name="imgForm" id="imgForm" enctype="multipart/form-data" action="图片上传接口" method='post'>
            <input class="input-loc-img"  name="imgLocal" id="imgLocal" type='file' accept="image/*" @change="selectImg" />
        </form>  -->
    </div>
</template>
<script>
    import Header from '../common/Header'
    import VueCoreImageUpload from 'vue-core-image-upload';
    import {
        loginApi,
    } from '../../api/api';
    import axios from 'axios'
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
               this.querySrc = '/api'+ res + '?r=' + new Date().getTime(); // 头像加时间戳
                if (res.errcode == 0) {
                    this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
                }
            },
             // 更改头像
            selectImg(e) {
                const TOKEN = sessionStorage.getItem('TOKEN')
                let imgFile = e.srcElement.files[0]; //取到上传的图片
                let formData = new FormData(); //通过formdata上传
                formData.append('avatar', imgFile);
                axios.post('/api/gateway/mobile/member/avatar', formData, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'form-data',
                        'x-auth-token': TOKEN
                    }
                }).then(function(res) {
                    this.querySrc = res.data;
                }).catch(function(error) {
                    console.log(error);
                })
            }
        },
        mounted() {
            console.log(this.$route.query.src)
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
        .g-core-image-upload-form input[name="avatar"]{
            font-size:30px;
            text-align: center;
        }
    }
</style>
<style>
.avatar .g-core-image-upload-btn{
    font-size:30px;
    text-align: center;
    letter-spacing: 2px;
}
.avatar .image-mask{
    position: absolute;
    z-index: 999;
    /* background: #000; */
}
.avatar .g-core-image-corp-container .info-aside{
    position: absolute;
    bottom:0;
    left:0;
    background: #000;
}
.avatar .g-core-image-corp-container .btn-upload{
    background: #ffcb16;
    border-color: #ffcb16;
    width:100px;
}
.avatar .image-mask .mask{
    background: #000!important;
}
</style>




