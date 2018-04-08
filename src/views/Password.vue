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
            <div class="nav-tab " @click=choosenP() :class="{ 'tabActive': tabActive}">
                <mt-button size="small" @click.native.prevent="active = 'tab-container1'">密码验证</mt-button>
            </div>
            <div class="nav-tab" @click=choosenM() :class="{ 'tabActive': !tabActive}">
                <mt-button size="small" @click.native.prevent="active = 'tab-container2'">短信验证</mt-button>
            </div>
        </div>
        <mt-tab-container v-model="active" swipeable>
            <mt-tab-container-item id="tab-container1">
                <div class="slide_son" style="display: inline-block;width: 100%;">
                    <!--账号登录begin-->
                    <ul class="normalLogin">
                        <li>
                            <i class="isTip isTel" v-if="judgePhone"><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
                            <input ref="userName" @blur="blurPhone()" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent ">
                        </li>
                        <li>
                            <i class="isTip isPsw" v-if="judgePwd"><img src="../assets/img/tishi@2x.png">当前密码不能为空</i>
                            <input @blur="blurPwd()" ref="normalPwd" placeholder="当前密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <span class="icon-eye eye-grey" v-show=seen @click=toggle()><img src="../assets/img/hide.png"></span>
                            <span class="icon-eye eye-red" v-show=!seen @click=toggle()><img src="../assets/img/show.png"></span>
                        </li>
                        <li>
                            <i class="isTip isPsw" v-if="judgePwd"><img src="../assets/img/tishi@2x.png">新密码不能为空</i>
                            <input @blur="blurPwd()" ref="newPwd" placeholder="新密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <span class="icon-eye eye-grey" v-show=seen @click=toggle()><img src="../assets/img/hide.png"></span>
                            <span class="icon-eye eye-red" v-show=!seen @click=toggle()><img src="../assets/img/show.png"></span>
                        </li>
                        <li>
                            <i class="isTip isPsw" v-if="judgePwd"><img src="../assets/img/tishi@2x.png">两次输入不一致</i>
                            <input @blur="blurPwd()" ref="renewPwd" placeholder="确认新密码" autocomplete="off" type="password" style="background-color:transparent ">
                        </li>
                    </ul>
                    <!--账号登录end-->
                    <div class="isError">
                        <span class="isTip isPsw"><img src="../assets/img/tishi@2x.png">注册失败!请稍后重试!</span>
                    </div>
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
                            <input ref="userName_" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent ">
                        </li>
                        <li id="msg" class="errorTips">
                            <input ref="smsCode" class="sms" maxlength="6" type="tel" autocomplete="off" placeholder="短信验证码" style="background-color:transparent ">
                            <button class="smsCode" @click="getCode()" :disabled="!show">
                                                            <span v-show="show">发送验证码</span>
                                                            <span v-show="!show">{{count}}秒后重发</span>
                                                        </button>
                        </li>
                        <li>
                            <i class="isTip isPsw"><img src="../assets/img/tishi@2x.png">新密码不能为空</i>
                            <input ref="normalPwd1" placeholder="新密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <i class="icon-eye eye-grey" v-show=seen @click=toggle()></i>
                            <i class="icon-eye eye-red" v-show=!seen @click=toggle()></i>
                        </li>
                        <li>
                            <i class="isTip isPsw"><img src="../assets/img/tishi@2x.png">两次输入不一致</i>
                            <input ref="normalPwd__" placeholder="确认新密码" autocomplete="off" type="password" style="background-color:transparent ">
                            <i class="icon-eye eye-grey" v-show=seen @click=toggle()></i>
                            <i class="icon-eye eye-red" v-show=!seen @click=toggle()></i>
                        </li>
                    </ul>
                    <!--账号登录end-->
                    <div class="isError">
                        <span class="isTip isPsw"><img src="../assets/img/tishi@2x.png">{{isError}}</span>
                    </div>
                </div>
                <div class="btn">
                    <div class="redBtn" @click=submits_()>
                        提&nbsp;交
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    // mint-ui
    import Vue from 'vue';
    import { Navbar, TabItem, Button, TabContainer, TabContainerItem } from 'mint-ui';
    Vue.component(Navbar.name, Navbar);
    Vue.component(TabItem.name, TabItem);
    Vue.component(Button.name, Button);
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    // sweetalert
    import swal from 'sweetalert';
    // sha1加密
    import sha1 from 'js-sha1'
    import {
        user
    } from '@/logic'
    import {
        loginApi,
        getCodeApi
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
                count: "",
                tabActive: true,
                isError: '',
                TOKEN:JSON.parse(localStorage.getItem('$LoginUser'))['x-auth-token']
            };
        },
        methods: {
            choosenP() {
                this.tabActive = true;
            },
            choosenM() {
                this.tabActive = false;
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
            // 旧密码提交登录请求
            submits() {
                // const TOKEN = JSON.parse(localStorage.getItem('$LoginUser'))['x-auth-token'];
                var resetParams = {
                    password: sha1(this.$refs.normalPwd.value),
                    code: sha1(this.$refs.newPwd.value),
                };
                loginApi.reset(resetParams,{
                    headers: {
                        'x-auth-token': this.TOKEN
                    }
                }).then(res => {
                    this.$router.push({
                        name: 'Home'
                    })
                }).catch(error => {
                    this.isError = error.response.data
                });
            },
            // 动态验证码修改密码
            getCode() {
                const mobileNumber = JSON.parse(localStorage.getItem('$LoginUser')).mobileNumber;
                getCodeApi.getcode({id:mobileNumber},{
                    data:{}
                }).then(res=>{
                }).catch(error=>{
                })
            },
            submits_(){
                // const TOKEN = JSON.parse(localStorage.getItem('$LoginUser'))['x-auth-token'];
                var resetParams = {
                    note: this.$refs.smsCode.value, //短信验证码
                    code: sha1(this.$refs.normalPwd1.value),//新密码
                };
                loginApi.reset(resetParams,{
                    headers: {
                        'x-auth-token': this.TOKEN
                    }
                }).then(res => {
                    this.$router.push({
                        name: 'Home'
                    })
                }).catch(error => {
                    // this.isError = error.response.data
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '../style/myform.scss';
    .password {
        background-image: url("../assets/img/bg.png");
        color: #fff;
        height: 100%;
        .normalTab {
            margin-top: 36px;
            font-size: 34px;
            letter-spacing: 2px;
        }
        .mint-tab-container {
            margin: 75px 81px 0 79px;
        }
        .mint-button--small {
            display: inline-block;
            font-size: 30px;
            line-height: 30px;
            padding: 0 12px;
        }
        .mint-button--default {
            color: #fff;
            border: none;
            background-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
            width: 100%;
        }
        .nav {
            display: flex;
            justify-content: space-around;
            margin-top: 61px;
            .nav-tab {
                width: 50%;
            }
            .tabActive {
                padding-bottom: 27px;
                border-bottom: 4px solid #ffcb16;
                .mint-button--default {
                    color: #ffcb16;
                }
            }
        }
    }
</style>

