<template>
  <div class="avatar">
    <Header title="我的头像" :isShow="true"></Header>
    <div class="imgCont">
      <img :src="querySrc" alt="">
    </div>
    <vue-core-image-upload :crop="false" inputOfFile='avatar' inputAccept='image/jpg,image/jpeg,image/png' 
    @imageuploaded="imageuploaded"
     @imagechanged="imagechanged" 
     @errorhandle="errorhandle"
     :max-file-size="6291456" compress="95" :headers="data" text='修改头像' :url="avatar">
    </vue-core-image-upload>
  </div>
</template>
<script>
  import Header from "../common/Header";
  import config from "@/api/config";
  import VueCoreImageUpload from "vue-core-image-upload";
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
        querySrc: this.defaultAvatar,
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




