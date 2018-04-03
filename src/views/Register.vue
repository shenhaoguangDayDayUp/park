<template>
  <div class="changepsd">
    <div class="close">
      <a href="#/"><img src="../assets/img/close.png"></a>
    </div>
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
              <input ref="userTel" id="userTel" type="number" @blur="blurPhone()" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent ">
            </li>
            <!-- 短信验证码 -->
            <li id="msg" class="errorTips">
              <input ref="smsCode" id="lg_msg" class="sms" maxlength="6" type="tel" autocomplete="off" placeholder="短信验证码" style="background-color:transparent ">
              <button class="smsCode" @click="getCode()" :disabled="!show">
                              <span v-show="show">发送验证码</span>
                              <span v-show="!show">{{count}}秒后重发</span>
                          </button>
              <!-- <div id="sendCode" class="smsCode reCode" ></div> -->
            </li>
            <!-- 输入新密码 -->
            <li class="lg_border">
              <i class="isTip isPsw" v-if=judgePwd><img src="../assets/img/tishi@2x.png">输入的密码有误</i>
              <input ref="normalPwd" id="newPwd" @blur="blurPwd()" placeholder="登录密码" autocomplete="off" type="password" style="background-color:transparent ">
              <i class="icon-eye eye-grey"></i>
              <i class="icon-eye eye-red" style="display:none;"></i>
            </li>
            <!-- 姓名 -->
            <li class="lg_border">
              <!-- <i class="isTip" v-if=judgeName><img src="../assets/img/tishi@2x.png">输入姓名不能为空</i> -->
              <input ref="userName" id="userName" @blur="blurName()" placeholder="姓名" autocomplete="off" type="text" style="background-color:transparent ">
              <i class="icon-eye eye-grey"></i>
              <i class="icon-eye eye-red" style="display:none;"></i>
            </li>
            <!-- 身份证号 -->
            <li class="lg_border">
              <i class="isTip" v-if=judgeCode><img src="../assets/img/tishi@2x.png">输入的身份证号有误</i>
              <input ref="userCode" id="userCode" @blur="blurCode()" placeholder="身份证号" autocomplete="off" type="text" style="background-color:transparent ">
              <i class="icon-eye eye-grey"></i>
              <i class="icon-eye eye-red" style="display:none;"></i>
            </li>
          </ul>
          <!-- 账号密码登录特有的忘记密码 -->
          <div class="forget">
            <label class="mint-checklist-label">
                            <span class="mint-checkbox">
                              <input type="checkbox" class="mint-checkbox-input" value="choosen"> 
                              <span class="mint-checkbox-core">
                              </span>
                            </span> 
                            <span class="mint-checkbox-label"><span style="color:#fff;">同意</span> 长影娱乐服务条款</span>
                        </label>
          </div>
          <!--账号登录end-->
        </li>
      </ul>
      <div class="btn">
        <div class="redBtn active" @click=register() v-if="isActive">
          立&nbsp;即&nbsp;注&nbsp;册
        </div>
        <div class="redBtn" @click=submits() v-else>
          立&nbsp;即&nbsp;注&nbsp;册
        </div>
      </div>
      <div>手机动态码：{{sCode}}</div>
    </div>
  </div>
</template>
<script>
  // sha1加密
  import sha1 from 'js-sha1'
  import {
    userRegister,
    smsValidate
  } from '../api/api';
  import axios from 'axios';
  import {
    IdentityCodeValid
  } from '../common/isCode.js'
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
        isActive: false
      };
    },
    methods: {
      //判断密码是否为空
      isNull(psw) {
        if (psw) {
          return true;
        } else {
          // swal("密码不能为空!");
          return false;
        }
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
        if (!this.$options.methods.isPoneAvailable(this.$refs.userTel.value)) {
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
      blurName() {
        if (!this.$options.methods.isPoneAvailable(this.$refs.userName.value)) {
          this.judgeName = 'ok'
        } else {
          this.judgeName = ''
        }
      },
      blurCode() {
        if (!this.$options.methods.isNull(this.$refs.userCode.value)) {
          this.judgeCode = 'ok'
        } else {
          this.judgeCode = ''
        }
      },
      // 点击获取动态码
      getCode() {
        if (this.judgePhone == '') {
          this.timer = null; //打开倒计时开关
          var url = this.$refs.userTel.value
          var data = ''
          axios.get(`/api/sms/validationCode/${url}`, {
              // axios.get(`http://192.168.1.192/gateway/mobile/sms/validationCode/${url}`, {
              data: data || {}
            })
            .then(res => {
              if (res.status == 200) {
                console.log(res)
                // 请求短信验证码的同时保存token
                // localStorage.setItem("token", headers['x-auth-token']);
                this.sCode = res.data
              } else {
                swal('短信息已经发送过')
              }
            })
        } else {
          this.show = true; //打开可以重新获取验证码的开关
          //this.timer =1; //关闭倒计时
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
        // if (this.vfcode) { //验证码请求返回200以后开关才打开
        //   var userTel = document.querySelector('#userTel').value;
        //   var newPwd = document.querySelector('#newPwd').value;
        //   var code = document.querySelector('#lg_msg').value;
        //   var str = `cellphone=${userTel}&password=${newPwd}&code=${code}`;
        //   // 发送请求,判断新密码是否为空
        //   if (this.$options.methods.isNull(newPwd)) {
        //     //  fetch("/api/badila/member/updateUserPwd", {
        //   } else {
        //     swal('请发送验证码!')
        //   }
        // }
        var registerParams = {
          mobileNumber: this.$refs.userTel.value,
          password: sha1(this.$refs.normalPwd.value),
          name: this.$refs.userName.value,
          idCardNumber: this.$refs.userCode.value,
          note: this.$refs.smsCode.value,
        };
        // axios.post('/api/member/register',
        // // axios.post('http://192.168.1.192/gateway/mobile/member/register',
        //     registerParams
        //   )
        //   .then(res => {
        //     console.log(res)
        //     this.$router.push({
        //       path: '/'
        //     });
        //   })
        //   .catch(error=>{
        //     swal(error.response.data)
        //   });
      }
    },
  }
</script>
<style scoped lang="scss">
  button {
    padding: 0;
  }
  .changepsd {
    background-image: url("../assets/img/bg.png");
    color: #fff;
    height: 100%;
  }
  .content {
    margin: 71px 82px 0 78px;
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
  .slide_son {
    .normalLogin {
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
        button {
          position: absolute;
          right: 0;
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
  .slide_son .forget {
    display: flex;
    justify-content: space-between;
    margin-top: 42px;
    color: #ffcb16;
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
  .normalTab {
    text-align: center;
    letter-spacing: 12px;
    margin-top: 119px; // font-family: MyriadPro-Bold;
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
  .icon-eye.eye-grey {
    /* background: url(../assets/img/images/hide.png) 15px 18px no-repeat; */
    background-size: 50%;
  }
  .icon-eye.eye-red {
    /* background: url(../assets/img/images/show.png) 15px 16px no-repeat; */
    background-size: 50%;
  }
  a {
    color: white;
    text-decoration: none;
  }
  /* 输入动态码 */
  .slide_son li input.sms {
    width: 60%;
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

