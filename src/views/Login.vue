<template>
  <div class="login">
    <Header title="用户登录" :isShow="true"></Header>
    <div class="normalTab">L O G O</div>
    <div class="content">
      <div class="slide_son" style="display: inline-block;width: 100%;">
        <!--账号登录begin-->
        <form @submit.prevent="validateBeforeSubmit">
          <ul class="normalLogin">
            <li>
              <i class="isTip isTel" v-if=judgePhone><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
              <input ref="userName" @blur="blurPhone()" id="userName" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent " oninput="if(value.length>11)value=value.slice(0,11)" maxlength="11">
            </li>
            <li class="lg_border">
              <i class="isTip ispwd" v-if=judgePwd><img src="../assets/img/tishi@2x.png">请输入6-20位字母数字及非空字符</i>
              <input @blur="blurPwd()" ref="normalPwd" id="normalPwd" placeholder="登录密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(6,20)" maxlength="20">
              <span class="icon-eye eye-grey" v-show=seen @click=toggle()><img src="../assets/img/hide.png"></span>
              <span class="icon-eye eye-red" v-show=!seen @click=toggle()><img src="../assets/img/show.png"></span>
            </li>
          </ul>
        </form>
        <!--账号登录end-->
        <!-- 账号密码登录特有的忘记密码 -->
        <div class="forget">
          <label class="mint-checklist-label">
                      <span class="mint-checkbox"  @click.prevent="ischoosen">
                        <input type="checkbox" v-model='choosen' class="mint-checkbox-input" > 
                        <span class="mint-checkbox-core">
                        </span>
                      </span> 
                      <span class="mint-checkbox-label">下次自动登录</span>
                  </label>
          <router-link :to="{path:'/password',query: {code: 1,title:'找回密码'}}">忘记密码</router-link>
        </div>
      <!-- 报错信息 -->
        <div class="isError" v-if="isError">
          <span class="isTip ispwd"><img src="../assets/img/tishi@2x.png">{{isError}}</span>
        </div>
      </div>
      <div class="btn">
        <div class="redBtn active" @click=submits() v-if="submitActive">
          登&nbsp;录
        </div>
        <div class="redBtn" @click=submits() v-else>
          登&nbsp;录
        </div>
      </div>
      <!-- <submit :text="submit"  @click.native='$router.push({name:"ReceiversUpdate",query: {title:"添加收货地址"}})' :disabled="disabled"></submit>        -->

    </div>
    <div class="toRegister" @click="toRegister">
      没有账号？
      <span style="color:#ffcb16;">立即注册</span>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import Submit from "@/components/common/Button.vue";
  // mint-ui
  import Vue from 'vue'
  import {
    Checklist
  } from 'mint-ui';
  Vue.component(Checklist.name, Checklist);
  import swal from 'sweetalert';
  // sha1加密
  import sha1 from 'js-sha1'
  import {
    user
  } from '@/logic'
  import {
    loginApi,
    integralApi
  } from '../api/api';
  export default {
    name: "Login",
    components:{
      Header,
      Submit
    },
    data() {
      return {
        loading: true,
        res: "memberLogin=A&userPassword=B",
        wise: 1,
        judgePhone: '',
        judgePwd: '',
        seen: 'ok',
        msg: '',
        submitActive: true,
        isError: '',
        phone: '',
        choosen: true,
        tipActive: false,
        errorTip: '',
      };
    },
    methods: {
      ischoosen() {
        this.choosen = !this.choosen;
        console.log(this.choosen)
      },
      toRegister(){
        this.$router.push({
          path:'/register'
        })
      },
      //函数号码验证
      isPoneAvailable(str) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
          return false;
        } else {
          return true;
        }
      },
      // 密码验证
        isPwd(pwd) {
          var patrn = /^(\S){6,20}$/;
          if (!patrn.exec(pwd)) return false;
          return true
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
              this.judgePhone = 'ok';
            } else {
              this.judgePhone = '';
              if (this.$options.methods.isPwd(this.$refs.normalPwd.value)) {
                this.submitActive = true;
              }
            }
          },
          blurPwd() {
            if (!this.$options.methods.isPwd(this.$refs.normalPwd.value)) {
              this.judgePwd = 'ok'
            } else {
              this.judgePwd = ''
              if (this.$options.methods.isPoneAvailable(this.$refs.normalPwd.value)) {
                this.submitActive = true;
              }
            }
          },
          // 提交登录请求
          submits() {
            if( this.$options.methods.isPwd(this.$refs.normalPwd.value) && this.$options.methods.isPoneAvailable(this.$refs.userName.value)) {
              this.submitActive = true;
              var loginParams = {
                mobileNumber: this.$refs.userName.value,
                password: sha1(this.$refs.normalPwd.value)
              };
              loginApi.login(loginParams).then(res => {
                const {
                  headers
                } = res
                console.log(res)
                // 判断用户下次是否直接登录
                if (this.choosen) {
                  var profile = Object.assign({}, loginParams)
                  sessionStorage.setItem("TOKEN", headers['x-auth-token']);
                  user.setLoginUser(profile)
                } else {
                  console.log(headers['x-auth-token'])
                  sessionStorage.setItem("TOKEN", headers['x-auth-token']);
                }
                this.$router.go(-1)
              }).catch(error => {
                this.tipActive = true;
                this.isError = '登录失败!'
              });
            }
          }
          
      },
    };
</script>
<style lang="scss" scoped>
  @import '../style/myform.scss';
  .login {
    background-image: url("../assets/img/bg.jpg");
    color: #fff;
    height: 100%;
  }
  .toRegister {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 26px;
    height: 90px;
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


