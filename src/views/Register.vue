<template>
  <div class="changepsd">
    <Header title="用户注册" :isShow="true"></Header>
    <div class="logo">
      <!-- <img src="../assets/img/images/logo.png" alt=""> -->
    </div>
    <div class="normalTab">L O G O</div>
    <div class="content">
      <ul class="slide">
        <li class="slide_son" style="display: inline-block;width: 100%;">
          <!--账号登录begin-->
          <ul class="normalLogin">
            <li>
              <i class="isTip isTel" v-if=judgePhone><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
              <input ref="userTel" v-model="userTel" id="userTel" type="number" @blur="blurPhone()" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent" oninput="if(value.length>11)value=value.slice(0,11)" maxlength="11">
            </li>
            <!-- 短信验证码 -->
            <li id="msg" class="isErrors">
              <input ref="smsCode" v-model="smsCode" id="lg_msg" class="sms" maxlength="4" type="tel" autocomplete="off" placeholder="短信验证码" style="background-color:transparent " >
              <button class="smsCode" @click="getCode()" :disabled="!show">
                                            <span v-show="show">发送验证码</span>
                                            <span v-show="!show">{{count}}秒后重发</span>
                                        </button>
              <!-- <div id="sendCode" class="smsCode reCode" ></div> -->
            </li>
            <!-- 输入新密码 -->
            <li class="lg_border">
              <i class="isTip ispwd"  v-if=judgePwd><img src="../assets/img/tishi@2x.png">请输入6-20位字母数字及非空字符</i>
              <input ref="normalPwd" v-model="normalPwd" id="newPwd" @blur="blurPwd()" placeholder="登录密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(0,20)" maxlength="20">
              <i class="icon-eye eye-grey"></i>
              <i class="icon-eye eye-red" style="display:none;"></i>
            </li>
            <!-- 姓名 -->
            <li class="lg_border">
              <i class="isTip" v-if=judgeName><img src="../assets/img/tishi@2x.png">输入姓名有误</i>
              <input ref="userName" v-model="userName" id="userName" @blur="blurName()" placeholder="姓名" autocomplete="off" type="text" style="background-color:transparent ">
              <i class="icon-eye eye-grey"></i>
              <i class="icon-eye eye-red" style="display:none;"></i>
            </li>
            <!-- 身份证号 -->
            <li class="lg_border">
              <i class="isTip" v-if=judgeCode><img src="../assets/img/tishi@2x.png">输入的身份证号有误</i>
              <input ref="userCode"  v-model="userCode" id="userCode" @blur="blurCode()" placeholder="身份证号" autocomplete="off" type="text" style="background-color:transparent " oninput="if(value.length>18)value=value.slice(0,18)" maxlength="18">
              <i class="icon-eye eye-grey"></i>
              <i class="icon-eye eye-red" style="display:none;"></i>
            </li>
          </ul>
          <!-- 账号密码登录特有的忘记密码 -->
          <div class="forget">
            <label class="mint-checklist-label"  @click.prevent="ischoosen">
              <span class="mint-checkbox">
                <input type="checkbox" v-model='choosen' class="mint-checkbox-input"> 
                <span class="mint-checkbox-core">
                </span>
              </span> 
              <span class="mint-checkbox-label"><span style="color:#fff;">同意</span> 长影娱乐服务条款</span>
          </label>
          </div>
          <!--账号登录end-->
          <!-- 报错信息 -->
          <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../assets/img/tishi@2x.png">{{isError}}</span>
          </div>
        </li>
      </ul>
      <!-- 按钮 -->
      <!-- <div class="btn">
        <div class="redBtn active" @click=register() v-if="isActive">
          立&nbsp;即&nbsp;注&nbsp;册
        </div>
        <div class="redBtn" @click=submits() v-else>
          立&nbsp;即&nbsp;注&nbsp;册
        </div>
      </div> -->
      <submit text="注册" :disabled="submitBtnDisabled" @click.native="register"></submit>
      <div>手机动态码：{{sCode}}</div>
    </div>
    
  </div>
</template>
<script>
  import Header from "@/components/common/Header.vue";
  import Submit from "@/components/common/Button.vue";
  // 验证
  import myValidator from '@/common/myValidator.js' 
  // sha1加密
  import sha1 from 'js-sha1';
  import {
    user
  } from '@/logic'
  import {
    userRegister,
    smsValidate,
    loginApi,
    getCodeApi
  } from '../api/api';
  export default {
    name: "Login",
    data() {
      return {
        show: true,
        count: "",
        //倒计时的开关
        timer: null,
        //确认修改的开关,验证码请求返回200以后开关才打开
        vfcode: false,
        judgePhone: '',
        judgePwd: '',
        judgeName: '',
        judgeCode: '',
        sCode: '',
        isActive: true,
        isError: '',
        choosen: true,
        userTel:'',
        normalPwd:'',
        userCode:'',
        userName:'',
        smsCode:'',
      };
    },
    computed: {
      submitBtnDisabled() {
        const _this = myValidator;
        if(_this.isPoneAvailable(this.userTel) && _this.isPwd(this.normalPwd) && _this.idCode(this.userCode) && _this.isUsername(this.userName) && this.choosen) return false;  
          return true;
      }
    },
    methods: {
      ischoosen() {
        this.choosen = !this.choosen;
        if(this.choosen){
          this.isError = '';
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
        if (!myValidator.isPoneAvailable(this.$refs.userTel.value)) {
          this.judgePhone = 'ok'
        } else {
          this.judgePhone = ''
        }
      },
      blurPwd() {
        if (!myValidator.isPwd(this.$refs.normalPwd.value)) {
          this.judgePwd = 'ok'
        } else {
          this.judgePwd = ''
        }
      },
      blurName() {
        if (!myValidator.isUsername(this.$refs.userName.value)) {
          this.judgeName = 'ok'
        } else {
          this.judgeName = ''
        }
      },
      blurCode() {
         if (!myValidator.idCode(this.$refs.userCode.value)) {
          this.judgeCode = 'ok'
        } else {
          this.judgeCode = ''
        }
        
      },
      // 点击获取动态码
      getCode() {
        if (this.$refs.userTel.value) {
          this.timer = null; //打开倒计时开关
          var url = this.$refs.userTel.value;
          const mobileNumber = this.$refs.userTel.value;
            getCodeApi.getcode({
            id: mobileNumber
            }, {
              data: {}
            }).then(res => {
              this.sCode = res.data
            }).catch(error => {
              this.isError = '获取验证码失败!'
              this.tipActive = true;
            })
          
        } else {
          this.show = true; //打开可以重新获取验证码的开关
          this.timer =1; //关闭倒计时
          this.judgePhone = 'ok' //确定输入的是存在的手机号
        }
        // 倒计时60s
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 1 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        // 出现的问题是如果上面的请求失败的话,时间还在倒计时，所以要打开开关！
      },
      register() {
        var registerParams = {
          "mobileNumber": this.$refs.userTel.value,
          "password": sha1(this.$refs.normalPwd.value),
          "name": this.$refs.userName.value,
          "idCardNumber": this.$refs.userCode.value,
          "note": this.$refs.smsCode.value,
        };
        if(this.choosen){
          loginApi.register(registerParams).then(res => {
          console.log(res)
          const {
            headers,
            status
          } = res
          if(status == 200){
            sessionStorage.setItem("TOKEN", headers['x-auth-token']);
            this.$router.push({
              name: 'Main'
            }) 
          }
        }).catch(error => {
          switch (error.status) {
            case 456:
                this.isError = error.data
                break;
            case 567:
                this.isError = '系统错误!'
                break;
            default:
                this.isError = '系统错误!'
                break;
          }
        });
        }else{
          this.isError = '请同意长影娱乐服务条款';
        }
        
      }
    },
    components:{
      Header,
      Submit
    },
  }
</script>
<style scoped lang="scss">
  @import '../style/myform.scss';
  .changepsd {
    background-image: url("../assets/img/bg.jpg");
    color: #fff;
    height: 100%;
  }
</style>

