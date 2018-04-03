<template>
    <div class="password">
        <div class="close">
           <router-link to="/login">
               <img src="../assets/img/close.png">
           </router-link>
            
        </div>
        <div class="logo">
            <!-- <img src="../assets/img/images/logo.png" alt=""> -->
        </div>
        <div class="normalTab">重置密码</div>
        <div class="nav">
            <div class="nav-tab" @click=choosenP()>
                <mt-button size="small" @click.native.prevent="active = 'tab-container1'">密码验证</mt-button>
                <hr v-if = line />
            </div>
            <div class="nav-tab" @click=choosenM()>
                <mt-button size="small" @click.native.prevent="active = 'tab-container2'" >短信验证</mt-button>
                <hr v-if = !line />
            </div>
        </div>
        <mt-tab-container v-model="active" swipeable>
            <mt-tab-container-item id="tab-container1">
                <div class="slide_son" style="display: inline-block;width: 100%;">
                    <!--账号登录begin-->
                    <ul class="normalLogin">
                        <li>
                            <i class="isTip isTel" v-if=judgePhone><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
                            <input ref="userName" @blur="blurPhone()"  type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent ">
                        </li>
                        <li>
                            <i class="isTip isPsw" v-if= judgePwd><img src="../assets/img/tishi@2x.png">登录密码有误</i>
                            <input @blur="blurPwd()" ref="normalPwd" placeholder="当前密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <i class="icon-eye eye-grey" v-show=seen @click=toggle()></i>
                            <i class="icon-eye eye-red" v-show=!seen @click=toggle()></i>
                        </li>
                        <li>
                            <i class="isTip isPsw" v-if=judgePwd><img src="../assets/img/tishi@2x.png">新密码不能为空</i>
                            <input @blur="blurPwd()" ref="normalPwd"  placeholder="新密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <i class="icon-eye eye-grey" v-show=seen @click=toggle()></i>
                            <i class="icon-eye eye-red" v-show=!seen @click=toggle()></i>
                        </li>
                        <li>
                            <i class="isTip isPsw" v-if=judgePwd><img src="../assets/img/tishi@2x.png">两次输入不一致</i>
                            <input @blur="blurPwd()" ref="normalPwd"  placeholder="确认新密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <i class="icon-eye eye-grey" v-show=seen @click=toggle()></i>
                            <i class="icon-eye eye-red" v-show=!seen @click=toggle()></i>
                        </li>
                    </ul>
                    <!--账号登录end-->
                </div>
                <div class="btn">
                    <div class="redBtn" @click=submits()>
                        提&nbsp;交
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <div class="slide_son" style="display: inline-block;width: 100%;">
                    <!--账号登录begin-->
                    <ul class="normalLogin">
                        <li>
                            <i class="isTip isTel"><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
                            <input ref="userName" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent ">
                        </li>
                        <li id="msg" class="errorTips">
                            <input ref="smsCode" class="sms" maxlength="6" type="tel" autocomplete="off" placeholder="短信验证码" style="background-color:transparent ">
                            <button class="smsCode" @click="getCode()" :disabled="!show">
                                <span v-show="show">发送验证码</span>
                                <span v-show="!show">{{count}}秒后重发</span>
                            </button>
                        </li>
                        <li>
                            <i class="isTip isPsw" ><img src="../assets/img/tishi@2x.png">新密码不能为空</i>
                            <input ref="normalPwd"  placeholder="新密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <i class="icon-eye eye-grey" v-show=seen @click=toggle()></i>
                            <i class="icon-eye eye-red" v-show=!seen @click=toggle()></i>
                        </li>
                        <li>
                            <i class="isTip isPsw" ><img src="../assets/img/tishi@2x.png">两次输入不一致</i>
                            <input ref="normalPwd" placeholder="确认新密码" autocomplete="off" type="password" style="background-color:transparent ">
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
                        <a href="#/changepsd">重设密码</a>
                    </div>
                </div>
                <div class="btn">
                    <div class="redBtn" @click=submits()>
                        提&nbsp;交
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    // sweetalert
    import swal from 'sweetalert';
    // sha1加密
    import sha1 from 'js-sha1'
    import {
        requestLogin
    } from '../api/api';
    export default {
        name: "Password",
        data() {
            return {
                show: true,
                loading: true,
                res: "memberLogin=A&userPassword=B",
                wise: 1,
                judgePhone: '',
                judgePwd: '',
                seen: 'ok',
                msg: '',
                active: 'tab-container1',
                ok: false,
                line: 'ok',
                count: "",
            };
        },
        methods: {
            choosenP(){
                this.line = 'ok';
            },
            choosenM(){
                this.line = !this.line;
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
                // swal("账户或密码有误!");
                // 如果手机号验证通过
                // if (this.$options.methods.isPoneAvailable(this.$refs.userName.value) && this.$options.methods.isNull(normalPwd)) {
                //   this.$router.push({
                //     name: 'Home'
                //   })
                // 发送请求
                // 第一个请求
                var loginParams = {
                    mobileNumber: this.$refs.userName.value,
                    password: sha1(this.$refs.normalPwd.value)
                };
                requestLogin(loginParams).then(res => {
                    console.log(res);
                    $router.push({
                        path: '/'
                    });
                    // // }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
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
                .smsCode {
                    right: 0;
                    display: block;
                    width: 108px;
                    height: 20px;
                    line-height: 20px;
                    text-align: right;
                    font-size: 14px;
                    text-decoration: none;
                    position: absolute;
                    top: 13px;
                    outline: 0;
                    /* border-left: 1px solid #d8d8d8; */
                    color: #ffcb16;
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
                border-color: #fff;
            }
            .mint-checkbox-input:checked+.mint-checkbox-core::after {
                border-color: #ffcb16;
            }
        }
    }
    .password {
        hr {
            background: #ffcb16;
            height: 2px;
            border: none;
        }
        .mint-button--small {
            display: inline-block;
            font-size: 16px;
            padding: 0 12px;
            height: 33px;
        }
        .mint-button--default {
            color: #fff;
            border: none;
            background-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
            width: 100%;
        }
        .mint-button::after {
            background-color: transparent;
            border-bottom: 1px solid #ffcb16;
            content: " ";
            opacity: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            position: absolute;
        }
        .nav {
            display: flex;
            justify-content: space-around;
            .nav-tab {
                width: 50%;
            }
        }
        .mint-tab-container {
            margin: 30px 37px 0;
        }
    }
    .content {
        margin: 30px 37px 0;
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
    .btn div.redBtn {
        background: #ffcb16;
        box-shadow: 0 2px 6px 0 rgba(0, 32, 99, 0.4);
        color: #000;
    }
    .btn div {
        width: 100%;
        height: 46px;
        line-height: 46px;
        border-radius: 8px;
        text-align: center;
    }
    .slide_son li {
        padding: 5px 0;
        border-bottom: 1px solid #d8d8d8;
        box-sizing: border-box;
        position: relative;
    }
    .slide_son li input {
        border: none;
        height: 40px;
        max-height: 40px;
        width: 70%;
        outline: 0;
        overflow: hidden;
        font-size: 16px;
    }
    .slide_son .forget {
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
            border-color: #fff;
        }
        .mint-checkbox-input:checked+.mint-checkbox-core::after {
            border-color: #ffcb16;
        }
    }
    .btn {
        font-size: 18px;
        margin-top: 30px;
    }
    .normalTab {
        height: 32px;
        font-size: 20px;
        text-align: center;
        letter-spacing: 2px;
        margin-bottom:30px;
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
    .password {
        background-image: url("../assets/img/bg.png");
        color: #fff;
        height: 100%;
    }
    /* 消除手机端input高亮 */
    .normalLogin input {
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

