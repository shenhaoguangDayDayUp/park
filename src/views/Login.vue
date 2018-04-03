<template>
  <div class="login">
    <div class="close">
      <router-link to="/"><img src="../assets/img/close.png"></router-link>
    </div>
    <div class="normalTab">L O G O</div>
    <div class="content">
      <div class="slide_son" style="display: inline-block;width: 100%;">
        <!--账号登录begin-->
        <ul class="normalLogin">
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
        <div class="isError" v-if="isError">
          <span class="isTip isPsw"><img src="../assets/img/tishi@2x.png">{{isError}}</span>
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
   import {user} from '@/logic'
  import {
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
        isActive: false,
        isError:''
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
          loginApi.login(loginParams).then(res => {
            const {headers,data} = res
            var profile = Object.assign({},headers,data)
             user.setLoginUser(profile)
             user.getLoginUser()
          }).catch(error => {
            console.log(error)
            // this.isError = error.response
          });
        }
      }
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
  @import '../style/myform.scss';
  .login {
    background-image: url("../assets/img/bg.png");
    color: #fff;
    height: 100%;
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

