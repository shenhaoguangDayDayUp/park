<template>
    <div id="my">
        <div class="mainContent">
            <Header title="个人中心">
              <span class="msgWrap" slot="right">
            <img src="../assets/img/xinxiaoxi.png"
                 alt=""
                 @click.stop='$router.push({name:"Message"})' >
                 <badge v-show="unreadMsg"></badge>
          </span>
                <!-- <router-link to="./message"
                             slot="right"
                             class="msgWrap">
                    <img src="../assets/img/xinxiaoxi.png"
                         alt="">
                    
                </router-link> -->
            </Header>
            <div class="user-header">
                <div class="user-mess">
                </div>
            </div>
            <!-- 已登陆状态下 -->
            <div class="mint-cell mint-cell-wrapper"
                 v-if=isActive
                 @click='$router.push({name:"Entity"})'>
                <div class="mint-cell-title">
                    <div class="cell-logo">
                        <img v-lazy="avatar"
                             height="60"
                             width="60">
                        <div class="mint-cell-text"
                             style="padding-left:40px;">
                            <span>{{list.userName}}</span>
                            <span>{{list.mobileNumber}}</span>
                        </div>
                    </div>
                    <router-link to="/entity">
                        <div class="right-arrow"></div>
                    </router-link>
                </div>
            </div>
            <!-- 未登录状态下 -->
            <div class="mint-cell mint-cell-wrapper"
                 @click='$router.push({name:"Login"})'
                 v-else>
                <div class="mint-cell-title">
                    <div class="cell-logo">
                        <img
                             :src= "defaultImg"
                             height="60"
                             width="60">
                             <!-- <img src="../assets/img/touxiang2@2x.png" alt=""> -->
                        <div class="mint-cell-text"
                             style="padding-left:40px;">
                            <span>请登录</span>
                        </div>
                    </div>
                    <router-link to="/login">
                        <div class="right-arrow"></div>
                    </router-link>
                </div>
            </div>
            <div class="user-option">
                <div class="user-option-title">
                    <span>积分信息</span>
                </div>
                <!-- <hr /> -->
                <div class="user-option-con mint-tabbar">
                    <div class="mint-tab-item"
                         @click='viewPoint'>
                        <div class="mint-icon yue">
                            <span>{{list.point}}</span>
                        </div>
                        <div class="mint-tab-item-label">余额</div>
                    </div>
                    <div class="mint-tab-item"
                         @click='$router.push({name:"charge"})'>
                        <div class="mint-icon">
                            <img src="../assets/img/chongzhi.png"
                                 alt="" class="pulse">
                        </div>
                        <div class="mint-tab-item-label">在线充值</div>
                    </div>
                    <div class="mint-tab-item"
                         @click='$router.push({name:"change"})'>
                        <div class="mint-icon">
                            <img src="../assets/img/jiaoyimingxi.png"
                                 alt="" class="pulse">
                        </div>
                        <div class="mint-tab-item-label">交易明细</div>
                    </div>
                </div>
            </div>
            <div class="user-option">
                <div class="user-option-title">
                    <span>兑换信息</span>
                </div>
                <!-- <hr/> -->
                <div class="user-option-con mint-tabbar">
                    <div class="mint-tab-item"
                         @click='$router.push({path:"/heart/list"})'>
                        <div class="mint-icon">
                            <div class="mint-icon-img">
                              <img src="../assets/img/xinyuandan.png"
                                 alt=""
                                 class="pulse">
                              <badge v-show="wishList"></badge>
                            </div>
                        </div>
                        <div class="mint-tab-item-label">心愿单</div>
                    </div>
                    <div class="mint-tab-item"
                         @click='$router.push({ name: "orderLsit", query: { index: 0 } })'>
                        <div class="mint-icon">
                          <div class="mint-icon-img"> 
                            <img src="../assets/img/daifukuan.png"
                                 alt=""
                                 class="pulse">
                            <badge v-show="unpaid"></badge>
                          </div>
                        </div>
                        <div class="mint-tab-item-label">待付款</div>
                    </div>
                    <div class="mint-tab-item"
                         @click='$router.push({ name: "orderLsit", query: { index: 1 } })'>
                        <div class="mint-icon">
                          <div class="mint-icon-img">
                            <img src="../assets/img/daishouhuo.png"
                                 alt=""
                                 class="pulse">
                            <badge v-show="ungoods"></badge>
                          </div>
                        </div>
                        <div class="mint-tab-item-label">待收货</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "./common/Header.vue";
import config from "@/api/config.js";
import { XHeader, Badge } from "vux";
import swal from "sweetalert";
import axios from "axios";
import { user } from "@/logic";
import { integralApi, loginApi, getMsgApi } from "../api/api";
import { mapGetters } from 'vuex'
export default {
  name: "Login",
  components: {
    XHeader,
    Badge,
    Header,
  },
  computed:{
    ...mapGetters(["defaultAvatar"])
  },
  data() {
    return {
      isActive: false,
      unreadMsg: "",
      ungoods: "",
      unpaid: "",
      wishList: "",
      list: {
        userName: "",
        mobileNumber: "",
        point: "---"
      },
      avatar: "",
      defaultImg: ""
    };
  },
  mounted() {
    // var defaultAvatar = require("../assets/img/touxiang2@2x.png");
    // console.log(this.avatar)
    // this.avatar = "" || defaultAvatar,
    // console.log(this.avatar)
    this.$root.eventHub.$on("notification", () => {
      this.Api();
    });
    // 如果用户信息存在(半小时后token过期了)或者token存在(登录时候没选下次自动登录)时再发请求
    if (user.getLoginUser("$LoginUser") || sessionStorage.getItem("TOKEN")) {
      this.Api();
    }else{
      console.log(1111111)
      this.defaultImg = require("../assets/img/touxiang2@2x.png");
      console.log(this.defaultImg)
    }
  },
  methods: {
    viewPoint() {
      // if (this.point == '== ==') {
      //     const TOKEN = sessionStorage.getItem('TOKEN')
      //     // 请求积分信息
      //     integralApi.account({}, {
      //         data: {},
      //         headers: {
      //             'x-auth-token': TOKEN
      //         }
      //     }).then(res => {
      //         const {
      //             headers,
      //             data
      //         } = res
      //         this.point = data
      //     }).catch(error => {
      //         console.log(error)
      //     });
      // }
    },
    Api() {
      const TOKEN = sessionStorage.getItem("TOKEN");
      loginApi
        .main(
          {},
          {
            data: {},
            headers: {
              "x-auth-token": TOKEN
            }
          }
        )
        .then(res => {
          const { data } = res;
          this.isActive = true;
          this.unreadMsg = data["message.unread.count"];
          (this.ungoods = data["order.process.count"]), // 待收货
            (this.unpaid = data["order.request.count"]), // 待付款
            (this.wishList = data["cart.item.count"]), // 心愿单
            (this.list = {
              userName: data["member.name"],
              mobileNumber: data["member.mobileNumber"].replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
              ),
              point: data["account.balance"].toLocaleString()
            });
          var imgPrifex = config.imgUrl[config.env.NODE_ENV];
          if(!this.defaultAvatar){
              this.changeToBase64(imgPrifex + data["member.avatar"]+ '?r=' + new Date().getTime()).then(res=>{
                //    sessionStorage.setItem("AVATAR",res);
                   this.avatar = res;
                   this.$store.dispatch("toggleUpdateAvatar", res);
              })
          }else{
              this.avatar = this.defaultAvatar
          }
        //   if (!sessionStorage.getItem("AVATAR")) {
        //        this.changeToBase64(imgPrifex + data["member.avatar"]).then(res=>{
        //            sessionStorage.setItem("AVATAR",res);
        //            this.avatar = res;
        //            console.log(res)
        //        })
        //   } else {
        //     this.avatar = sessionStorage.getItem("AVATAR");
        //   }
          // this.avatar = imgPrifex + data["member.avatar"] + '?r=' + new Date().getTime();// 头像加时间戳
        })
        .catch(error => {});
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
        //   var img1 = document.createElement("img");
        //   img1.src = data;
        //   document.body.appendChild(img1);
             resolve(data)
          return data;
        };
      });
      // img.onload = function() {
      //     var data = that.getBase64Image(img);
      //     var img1 = document.createElement('img');
      //     img1.src = data;
      //     document.body.appendChild(img1);
      //     console.log(img1);
      //     console.log(data)
      //     return data;
      // }
    }
  }
};
</script>

<style scoped lang="scss">
#my {
  background: #23262b; // height: 100%;
  .mint-cell:last-child {
    background-position-x: 10px;
  }
  .mint-cell {
    background: #2f323b;
    color: #fff;
    height: 118px;
    padding: 0;
    img {
      height: 124px;
      width: 124px; // border-radius: 100%;
      // border: solid #ffffff 3px;
    }
    .mint-cell-title {
      align-items: center;
      display: flex;
      justify-content: space-between;
      .cell-logo {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        .mint-cell-text {
          display: flex;
          justify-content: space-around;
          flex-direction: column;
        }
      }
    }
  }
  .mint-cell.mint-cell-wrapper {
    background-origin: border-box;
    height: 224px;
    padding: 0 53px;
    display: flex;
    position: relative;
    // margin-top:97px;
  }
  .right-arrow {
    display: inline-block;
    border-right: 5px solid #ccc;
    border-bottom: 5px solid #ccc;
    width: 22px;
    height: 22px;
    transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
  }
  .msgWrap {
    position: relative;
    height:100%;
    .vux-badge {
      position: absolute;
      right: -7px;
      top: -7px; 
    }
    img{
      position: absolute;
      top:0;
      right:0;
    }
  }
}
.mainContent {
  display: flex;
  flex-direction: column;
  height:100%;
  img {
    width: 36px;
    height: 35px;
  }
}
.user-option {
  background-color: #2f323b;
  margin-top: 22px;
  color: #fff;
  .user-option-title {
    span {
      border-left: 4px solid #ffcb16;
      padding-left: 16px;
      font-size: 30px;
      margin-left: 24px;
    }
    height: 78px;
    line-height: 78px;
    border-bottom: 2px solid #323540;
    box-sizing: border-box;
  }
  .user-option-con.mint-tabbar {
    position: static;
    background: #2f323b;
    height: 168px;
    display: flex;
    justify-content: space-around;
    .mint-tab-item {
      width: 30%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .mint-icon {
        display: flex;
        justify-content: center; // height: 48px;
        margin-bottom: 18px;
        .mint-icon-img{
          width: 55px;
          height: 55px;
          position: relative;
          span{
            position: absolute;
            top:-5px;
            right:-7.5px;
            // top:-7.5px;
            // right:-7.5px;
          }
        }
        img {
          width: 55px;
          height: 55px;
        }
      }
      .mint-tab-item-label {
        display: flex;
        justify-content: center;
        font-size: 28px;
      }
    }
  }
  .user-option-con .yue {
    width: 100%;
    line-height: 48px;
    span {
      font-size: 28px;
      text-align: center;
    }
  }
  .mint-tab-item {
    font-size: 28px;
  }
}
.mint-cell {
  min-height: 40px;
}
.right-arrow {
  margin-left: 10px;
}
.user-option span {
  font-size: 13px;
}
.pulse:active {
  animation: pulse_4179 0.5s linear infinite;
  transform-origin: 50% 50%;
}
@keyframes pulse_4179 {
  0% {
    transform: scale(1.1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.1);
  }
}
@-webkit-keyframes pulse_4179 {
  0% {
    transform: scale(1.1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
<style lang="scss">
#my {
  .mint-icon {
    width: 100%;
  }
  .vux-header .vux-header-left,
  .vux-header .vux-header-right {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    /* 50%为自身尺寸的一半 */
    height: 35px;
    width: 36px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
#mytab {
  .vux-badge {
    // background: #2F323B;
    border-radius: 15px; // border: 1px solid #fff;
    width: 15px;
    height: 15px;
    box-sizing: border-box; // line-height: 25px;
    text-align: center;
    padding: 0;
  }
}
</style>
<style lang="scss">
    #my .nav-bar .nav-right {
      height: 35px;
    }
</style>




