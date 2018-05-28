<template>
  <div class="avatar">
    <Header title="我的头像" :isShow="true"></Header>
    <div class="imgCont">
      <img :src="querySrc" alt="" id="img">
    </div>
    <!-- 原有的 -->
    <!-- <vue-core-image-upload :crop="false" inputOfFile='avatar' inputAccept='image/jpg,image/jpeg,image/png' 
    @imageuploaded="imageuploaded"
     @imagechanged="imagechanged" 
     @errorhandle="errorhandle"
     :max-file-size="6291456" compress="95" :headers="data" text='修改头像' :url="avatar">
    </vue-core-image-upload> -->
    <div class="g-core-image-upload-btn">
      修改头像
    <input type="file" accept="image/png,image/jpeg,image/jpg" @change="change($event)" name="avatar">
    </div>
  </div>
</template>
<script>
  import Header from "../common/Header";
  import config from "@/api/config";
  import VueCoreImageUpload from "vue-core-image-upload";
  import Vue from 'vue'
  
  import {
    mapGetters
  } from 'vuex'
  import {
    loginApi
  } from "../../api/api";
  export default {
    name: "Avatar",
    data() {
      return {
        data: {
          "x-auth-token": sessionStorage.getItem("TOKEN")
        },
        querySrc: this.defaultAvatar, //默认头像转base64时候可能太大存不到本地存储中，所以用了vuex
        avatar: config.imgUrl[config.env.NODE_ENV] + "/gateway/mobile/member/avatar"
      };
    },
    computed: {
      ...mapGetters(["defaultAvatar"])
    },
    mounted() {
      if(this.defaultAvatar){
        this.querySrc = this.defaultAvatar
      }else{
        this.GetList();
      }
    },
    methods: {
      imagechanged(code) {
        console.log(code)
        this.$vux.loading.show({
          text: "正在加载....",
          // onShow() {
          //   this.$root.eventHub.$emit("LodingShow");
          // },
          // onHide() {
          //   this.$root.eventHub.$emit("LodingHide");
          // }
        });
      },
      imageuploading(res) {
        console.log(res)
      },
      imageuploaded(res, data) {
        var imgPrifex = config.imgUrl[config.env.NODE_ENV];
        var that = this;
        if (res.indexOf("images") !== -1) {
          this.changeToBase64(imgPrifex + res + '?r=' + new Date().getTime()).then(response => {
            that.$vux.loading.hide();
            this.querySrc = response// 头像加时间戳
            this.$store.dispatch("toggleUpdateAvatar", response);
            this.$vux.toast.show({
              text: "修改成功!"
            });
          })
        } else if (res.indexOf("图片大小超出上限") !== -1) {
          that.$vux.loading.hide();
          this.$vux.toast.show({
            text: res
          });
        } else {
          that.$vux.loading.hide();
          this.$vux.toast.show({
            text: "头像修改失败!"
          });
        }
      },
      // 异常处理
      errorhandle(err) {
        if(err.indexOf("LARGER MAX FILE") !== -1){ //头像大于6M不发送请求
          this.$vux.toast.show({
            text: '修改失败! 头像应小于6M!'
          });
        }else{
          this.$vux.toast.show({
            text: '头像修改失败!'
          });
        }
      },
      getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        var dataURL = canvas.toDataURL("image/" + ext);
        return dataURL;
      },
      changeToBase64(url) {
        var that = this;
        var img = document.createElement("img");
        img.src = url; //此处自己替换本地图片的地址
        return new Promise(function(resolve, reject) { //onload是异步
          img.onload = function() {
            var data = that.getBase64Image(img);
            // var img1 = document.createElement("img");
            // img1.src = data;
            // document.body.appendChild(img1);
            resolve(data)
            return data;
          };
        });
      },
      GetList(){
        loginApi.entity({}, {
                data: {},
                headers: {
                    'x-auth-token': sessionStorage.getItem("TOKEN")
                }
            }).then(res => {
                const {data} = res;
                var imgPrifex = config.imgUrl[config.env.NODE_ENV]
                if (!this.defaultAvatar) {
                    this.changeToBase64(imgPrifex + data.avatar).then(response => {
                        this.querySrc = response;
                        this.$store.dispatch("toggleUpdateAvatar", response);
                    })
                } else {
                    this.querySrc = this.defaultAvatar
                }
            }).catch(error => {
                console.log(error.response.status)
            });
      },
      // 新加
      change(e){
        console.log(e)
        let image = document.getElementById('img');
        console.log(11111111)
        // console.log(this.postImg(imageData))
      
        this.clip(  event,{
          resultObj:image,
          aspectRadio:1
        })
      }
    },
    components: {
      "vue-core-image-upload": VueCoreImageUpload,
      Header
    }
  };
</script>
<style lang="scss" scoped>
  .avatar {
    color: #fff;
    height: 100%;
    overflow: hidden;
    padding-top:94px;
    .imgCont {
      height: 80%;
      width: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%; // height:400px;
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
    position: relative;
    overflow: hidden;
      height: 61px;
  }
  .avatar .g-core-image-upload-btn input{
      width:100%;
      height:100%;
      opacity: 0;
      position: absolute;
      top:0;
      left:0;
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
    background: #000 !important;
  }
</style>
<style>
#clip_button {
  position: absolute;
  right: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border:none;
  border-radius: 2px;
  background: #1AAD19;
  color: #fff;
}
#cancel_clip{
  position: absolute;
  left: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border:none;
  border-radius: 2px;
  color: #fff;
  background:#E64340;
}
#clip_container.container {
  z-index: 99;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background:rgba(0,0,0,1);
}
#clip_container.container > div{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
#clip_image {
  max-width: 100%;
}
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none
}
.crop_loading , .crop_success {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.crop_loading .crop_content{
  position: absolute;
  top: 50% ;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  height: 100px;
  width: 100px;
  vertical-align: middle;
  color: #fff;
  padding-top: 20px;
  font-size: 16px;
  border-radius:3px;
  transform: translate(-50%,-50%);
}
.crop_loading .crop_content img{
  margin-top: 15px;
  margin-bottom: 10px;
}
.crop_success .crop_success_text{
  position: absolute;
  top: 50% ;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  font-size: 16px;
  border-radius:3px;
  transform: translate(-50%,-50%);
}
.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg
}
.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cropper-wrap-box {
  overflow: hidden;
}
.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
.cropper-modal {
  opacity: .5;
  background-color: #000;
}
.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}
.cropper-dashed {
  position: absolute;

  display: block;

  opacity: .5;
  border: 0 dashed #eee
}
.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px
}
.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px
}
.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: .75
}
.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: ' ';
  background-color: #eee
}
.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px
}
.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px
}
.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: .1;
}
.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}
.cropper-line {
  background-color: #39f
}
.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize
}
.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize
}
.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize
}
.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize
}
.cropper-point {
  width: 5px;
  height: 5px;

  opacity: .75;
  background-color: #39f
}
.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize
}
.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize
}
.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize
}
.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize
}
.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize
}
.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize
}
.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize
}
.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1
}
@media (min-width: 768px) {
.cropper-point.point-se {
    width: 15px;
    height: 15px
}
}
@media (min-width: 992px) {
.cropper-point.point-se {
    width: 10px;
    height: 10px
}
}
@media (min-width: 1200px) {
.cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: .75
}
}
.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  opacity: 0;
  background-color: #39f
}
.cropper-invisible {
  opacity: 0;
}
.cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}
.cropper-hidden {
  display: none !important;
}
.cropper-move {
  cursor: move;
}
.cropper-crop {
  cursor: crosshair;
}
.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}

</style>





