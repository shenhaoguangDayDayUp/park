<template>
  <div class="login">
    <div class="close">
      <router-link to="/"><img src="../assets/img/close.png"></router-link>
    </div>
    <div class="logo">
      <!-- <img src="../assets/img/images/logo.png" alt=""> -->
    </div>
    <div class="normalTab">L O G O</div>
    <div class="content">
      <div class="slide_son" style="display: inline-block;width: 100%;">
        <!--账号登录begin-->
        <ul id="normalLogin">
          <li>
            <i class="isTip isTel" v-if=judgePhone><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
            <input ref="userName" @blur="blurPhone()" id="userName" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent">
          </li>
          <li class="lg_border">
            <i class="isTip isPsw" v-if=judgePwd><img src="../assets/img/tishi@2x.png">登录密码有误</i>
            <input @blur="blurPwd()" ref="normalPwd" id="normalPwd" placeholder="登录密码" autocomplete="off" type="password" style="background-color:transparent ">
            <i class="icon-eye eye-grey" v-show=seen @click=toggle()></i>
            <i class="icon-eye eye-red" v-show=!seen @click=toggle()></i>
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
          <a href="#/password">重设密码</a>
        </div>
      </div>
      <div class="btn">
        <div class="redBtn" @click=submits()>
          登&nbsp;录
        </div>
      </div>
    </div>
    <div class="toRegister" style="display:flex;
    align-items:center;
    justify-content:center;
    margin-top:10px;color:#ffcb16;">
      <router-link to="/register" style="color:#ffcb16;">立 即 注 册> ></router-link>
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
     async submits() {
        if (this.judgePhone == '' && this.judgePwd == '') {
          var loginParams = {
            mobileNumber: this.$refs.userName.value,
            password: sha1(this.$refs.normalPwd.value)
          };
          try {
            const { status,
              headers,
              data} =  await loginApi.login(loginParams);
          } catch (error) {
            console.log(error.response)
          }
      
          // requestLogin(loginParams).then(res => {
          //   console.log(res)
          //   this.logining = false;
          //   let {
          //     status,
          //     headers,
          //     data
          //   } = res;
          //   if (status !== 200) {
          //     this.$message({
          //       message: status,
          //       type: 'error'
          //     });
          //   } else {
          //     localStorage.setItem("token", headers['x-auth-token']);
          //     localStorage.setItem("accountInfo", JSON.stringify(loginParams));
          //     this.$router.push({
          //       path: '/'
          //     });
          //   }
          // });
        }
      }
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
  .content {
    margin: 30px 37px 0;
  }
  .btn {
    font-size: 18px;
    margin-top: 30px;
    div.redBtn {
      background: #ffcb16;
      box-shadow: 0 2px 6px 0 rgba(0, 32, 99, 0.4);
      color: #000;
    }
    div {
      width: 100%;
      height: 46px;
      line-height: 46px;
      border-radius: 8px;
      text-align: center;
    }
  }
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
        img {
          width: 1.2rem;
          margin-right: 5px;
          margin-bottom: 0.1rem;
        }
      }
      li {
        padding: 5px 0;
        border-bottom: 1px solid #d8d8d8;
        box-sizing: border-box;
        position: relative;
        input {
          border: none;
          height: 40px;
          max-height: 40px;
          width: 70%;
          outline: 0;
          overflow: hidden;
          font-size: 16px;
        }
      }
    }
    .forget {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      a {
        font-size: 14px;
        color: #ffcb16;
      }
      .mint-checklist-label {
        display: block;
        padding: 0;
      }
      .mint-checkbox-core {
        border-radius: 3px;
        background-color: transparent;
      }
      .mint-checkbox-input:checked+.mint-checkbox-core {
        background-color: transparent;
        border-color: #ffcb16;
      }
      .mint-checkbox-input:checked+.mint-checkbox-core::after {
        border-color: #fff;
      }
    }
  }
  .normalTab {
    height: 32px;
    font-size: 30px;
    text-align: center;
    letter-spacing: 2px;
  }
  .logo img {
    display: block;
    width: 144px;
    height: 108px;
    margin: 0 auto;
  }
  .close {
    height: 40px;
    width: 100px;
  }
  .close img {
    width: 18px;
    height: 18px;
    margin-left: 15px;
    margin-top: 11px;
    margin-bottom: 11px;
  }
  .icon-eye {
    position: absolute;
    height: 40px;
    width: 40px;
    right: 0;
    bottom: 3px;
  }
  .icon-eye.eye-grey {
    background: url("../assets/img/hide.png") 15px 18px no-repeat;
    background-size: 50%;
  }
  .icon-eye.eye-red {
    background: url("../assets/img/show.png") 15px 16px no-repeat;
    background-size: 50%;
  }
  .el-message-box__wrapper .el-message-box {
    width: 375px !important;
  }
  .login {
    background-image: url("../assets/img/bg.png");
    color: #fff;
    height: 100%;
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
  /* muze-ui */
  .mu-raised-button.mu-raised-button-inverse {
    width: 100%;
    height: 100%;
    background: none;
    color: #000;
    border: none;
    letter-spacing: 5px;
    border-radius: 100px;
    color: #fff;
  }
</style>

