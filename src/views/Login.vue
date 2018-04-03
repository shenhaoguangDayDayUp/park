<template>
  <div class="login">
    <div class="close">
      <router-link to="/"><img src="../assets/img/close.png"></router-link>
    </div>
    <div class="normalTab">L O G O</div>
    <div class="content">
      <div class="slide_son" style="display: inline-block;width: 100%;">
        <!--账号登录begin-->
        <ul id="normalLogin">
          <li>
            <i class="isTip isTel" v-if=judgePhone><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
            <input ref="userName" @blur="blurPhone()" id="userName" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent ">
          </li>
          <li class="lg_border">
            <i class="isTip isPsw" v-if=judgePwd><img src="../assets/img/tishi@2x.png">登录密码有误</i>
            <input @blur="blurPwd()" ref="normalPwd" id="normalPwd" placeholder="登录密码" autocomplete="off" type="password" style="background-color:transparent ">
            <span class="icon-eye eye-grey" v-show=seen @click=toggle()><img src="../assets/img/hide.png"></span>
            <span class="icon-eye eye-red" v-show=!seen @click=toggle()><img src="../assets/img/show.png"></span>
          </li>
        </ul>
        <!--账号登录end-->
        <!-- 账号密码登录特有的忘记密码 -->
        <div class="forget">
          <label class="mint-checklist-label">
                                <span class="mint-checkbox">
                                  <input type="checkbox" class="mint-checkbox-input" value="choosen"> 
                                  <span class="mint-checkbox-core">
                                  </span>
                                </span> 
                                <span class="mint-checkbox-label">下次自动登录</span>
                            </label>
          <a href="#/password">重置密码</a>
        </div>
      </div>
      <div class="btn">
        <div class="redBtn active" @click=submits() v-if="isActive">
          登&nbsp;录
        </div>
        <div class="redBtn" @click=submits() v-else>
          登&nbsp;录
        </div>
      </div>
    </div>
    <div class="toRegister">
      没有账号？
      <router-link to="/register" style="color:#ffcb16;">立即注册</router-link>
    </div>
  </div>
</template>

<script>
  // sweetalert
  import swal from 'sweetalert';
  // sha1加密
  import sha1 from 'js-sha1'
  import {
    requestLogin,
    loginApi
  } from '../api/api';
  export default {
    name: "Login",
    data() {
      return {
        loading: true,
        res: "memberLogin=A&userPassword=B",
        wise: 1,
        judgePhone: '',
        judgePwd: '',
        seen: 'ok',
        msg: '',
        isActive: false
      };
    },
    methods: {
      //函数号码验证
      isPoneAvailable(str) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
          return false;
        } else {
          return true;
        }
      },
      //判断密码是否为空
      isNull(psw) {
        if (psw) {
          return true;
        } else {
          return false;
        }
      },
      // 密码明暗 切换input type
      toggle() {
        if (this.seen == '') {
          this.seen = 'ok'
          this.$refs.normalPwd.type = 'password'
        } else {
          this.seen = '';
          this.$refs.normalPwd.type = 'text'
        }
      },
      // 表单判断
      blurPhone() {
        if (!this.$options.methods.isPoneAvailable(this.$refs.userName.value)) {
          this.judgePhone = 'ok'
        } else {
          this.judgePhone = ''
        }
      },
      blurPwd() {
        if (!this.$options.methods.isNull(this.$refs.normalPwd.value)) {
          this.judgePwd = 'ok'
        } else {
          this.judgePwd = ''
        }
      },
      // 提交登录请求
      submits() {
        if (this.judgePhone == '' && this.judgePwd == '') {
          this.isActive = true;
          var loginParams = {
            mobileNumber: this.$refs.userName.value,
            password: sha1(this.$refs.normalPwd.value)
          };
          requestLogin(loginParams).then(res => {
            console.log(res)
            this.logining = false;
            let {
              status,
              headers,
              data
            } = res;
            if (status !== 200) {
              this.$message({
                message: status,
                type: 'error'
              });
            } else {
              localStorage.setItem("token", headers['x-auth-token']);
              localStorage.setItem("accountInfo", JSON.stringify(loginParams));
              this.$router.push({
                path: '/'
              });
            }
          });
        }
      }
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
  .login {
    background-image: url("../assets/img/bg.png");
    color: #fff;
    height: 100%;
  }
  .content {
    margin: 71px 82px 0 78px;
    .slide_son {
      #normalLogin {
        input {
          /* -webkit-tap-highlight-color: rgba(255, 255, 255, 0); */
          -moz-user-select: none;
          -webkit-appearance: none;
          outline: none;
          border: none;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset;
          border: none;
          background-color: transparent;
          filter: alpha(opacity=0)
        }
        .isTip {
          color: #ffcb16;
          display: block;
          font-size: 25px;
          img {
            height: 25px;
            margin-right: 5px;
            margin-bottom: 0.1rem;
          }
        }
        li {
          padding: 24px 0;
          border-bottom: 1px solid #d8d8d8;
          box-sizing: border-box;
          position: relative;
          input {
            border: none;
            width: 70%;
            outline: 0;
            overflow: hidden;
            font-size: 28px;
            height: 46px;
          }
        }
        .icon-eye {
          position: absolute;
          height: 21px;
          width: 36px;
          right: 0;
          bottom: 24px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .forget {
        display: flex;
        justify-content: space-between;
        margin-top: 42px;
        font-size: 26px;
        a {
          font-size: 14px;
          color: #ffcb16;
          font-size: 26px;
        }
        .mint-checklist-label {
          display: block;
          padding: 0;
        }
        .mint-checkbox-core {
          border-radius: 3px;
          background-color: transparent;
          height: 27px;
          width: 27px;
        }
        .mint-checkbox-input:checked+.mint-checkbox-core {
          background-color: transparent;
          border: solid 2px #d6dae2;
        }
        .mint-checkbox-input:checked+.mint-checkbox-core::after {
          border-color: #ffcb16;
          width: 10px;
          height: 15px;
          left: 7px;
          top: -3px;
        }
      }
    }
    .btn {
      font-size: 18px;
      margin-top: 47px;
      div.redBtn.active {
        background: #ffcb16;
        box-shadow: 0 2px 6px 0 rgba(0, 32, 99, 0.4);
        color: #000;
        height: 78px;
        line-height: 78px;
        letter-spacing: 5px;
        font-size: 31px;
      }
      div.redBtn {
        background: #f8f9fa; // opacity:0.5;
        color: #aaadb4;
        height: 78px;
        line-height: 78px;
        letter-spacing: 5px;
        font-size: 31px;
      }
      div {
        width: 100%;
        height: 46px;
        line-height: 46px;
        border-radius: 8px;
        text-align: center;
      }
    }
  }
  .normalTab {
    text-align: center;
    letter-spacing: 12px;
    margin-top: 79px; // font-family: MyriadPro-Bold;
    font-size: 60px;
  }
  .close {
    height: 40px;
    width: 100px;
    img {
      width: 18px;
      margin-left: 20px;
      margin-top: 11px;
      margin-bottom: 11px;
    }
  }
  .el-message-box__wrapper .el-message-box {
    width: 375px !important;
  }
  /* 消除手机端input高亮 */
  input {
    /* -webkit-tap-highlight-color: rgba(255, 255, 255, 0); */
    -moz-user-select: none;
    -webkit-appearance: none;
    outline: none;
    border: none;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    border: none;
    background-color: transparent;
    filter: alpha(opacity=0)
  }
  a {
    -webkit-user-select: auto!important;
  }
  .toRegister {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    font-size: 26px;
    a {
      color: #ffcb16;
      height: 28px;
      text-decoration: underline;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

