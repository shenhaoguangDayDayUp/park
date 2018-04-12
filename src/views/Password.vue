<template>
    <div class="password">
        <Header title="重置密码"></Header>
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
                            <input ref="userName" @blur="blurPhone()" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent " oninput="if(value.length>11)value=value.slice(0,11)" maxlength="11">
                        </li>
                        <li>
                            <i class="isTip isPwd" v-if="judgePwd"><img src="../assets/img/tishi@2x.png">请输入6-20位字母数字及非空字符</i>
                            <input @blur="blurPwd()" ref="normalPwd" placeholder="当前密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(6,20)" maxlength="20">
                            <!-- <span class="icon-eye eye-grey" v-show=seen @click=toggle()><img src="../assets/img/hide.png"></span>
                                <span class="icon-eye eye-red" v-show=!seen @click=toggle()><img src="../assets/img/show.png"></span> -->
                        </li>
                        <li>
                            <i class="isTip isPwd" v-if="judgeNewPwd"><img src="../assets/img/tishi@2x.png">新密码为6-20位字母数字及非空字符</i>
                            <input @blur="blurNewPwd()" ref="newPwd" placeholder="新密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(6,20)" maxlength="20">
                            <!-- <span class="icon-eye eye-grey" v-show='seen_' @click=toggle()><img src="../assets/img/hide.png"></span>
                                <span class="icon-eye eye-red" v-show='!seen_' @click=toggle()><img src="../assets/img/show.png"></span> -->
                        </li>
                        <li>
                            <i class="isTip isPwd" v-if="judgeReNewPwd"><img src="../assets/img/tishi@2x.png">两次输入密码不一致</i>
                            <input @blur="blurReNewPwd()" ref="reNewPwd" placeholder="确认新密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(6,20)" maxlength="20">
                        </li>
                    </ul>
                    <!--账号登录end-->
                    <div class="isError" v-show="tipActive">
                        <span class="isTip isPwd"><img src="../assets/img/tishi@2x.png">{{isError}}</span>
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
                            <i class="isTip isTel" v-if="judgePhone_"><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
                            <input ref="userName_" @blur="blurPhone_()" type="number" placeholder="手机号" autocomplete="off" autofocus="autofocus" style="background-color:transparent " oninput="if(value.length>11)value=value.slice(0,11)" maxlength="11">
                        </li>
                        <li id="msg" class="errorTips">
                            <input ref="smsCode" class="sms" type="tel" autocomplete="off" placeholder="短信验证码" style="background-color:transparent " maxlength="4">
                            <button class="smsCode" @click="getCode()" :disabled="!show">
                                            <span v-show="show">发送验证码</span>
                                            <span v-show="!show">{{count}}秒后重发</span>
                                        </button>
                        </li>
                        <li>
                            <i class="isTip isPwd" v-if="judgeNewPwd_"><img src="../assets/img/tishi@2x.png">新密码为6-20位字母数字及非空字符</i>
                            <input ref="newPwd_" @blur="blurNewPwd_()" placeholder="新密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(6,20)" maxlength="20">
                            <!-- <span class="icon-eye eye-grey" v-show='seen_' @click=toggle()><img src="../assets/img/hide.png"></span>
                                <span class="icon-eye eye-red" v-show='!seen_' @click=toggle()><img src="../assets/img/show.png"></span> -->
                        </li>
                        <li>
                            <i class="isTip isPwd" v-if="judgeReNewPwd_"><img src="../assets/img/tishi@2x.png">两次密码输入不一致</i>
                            <input ref="reNewPwd_" @blur="blurReNewPwd_()" placeholder="确认新密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(6,20)" maxlength="20">
                        </li>
                    </ul>
                    <!--账号登录end-->
                </div>
                <div class="isError" v-if="tipActive_">
                    <span class="isTip isPwd"><img src="../assets/img/tishi@2x.png">{{isError}}</span>
                </div>
                <div class="btn">
                    <div class="redBtn" @click=submits_()>
                        提&nbsp;交
                    </div>
                </div>
                <div>手机动态码：{{sCode}}</div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import Header from "@/components/common/Header.vue";
    // mint-ui
    import Vue from 'vue';
    import {
        Navbar,
        TabItem,
        Button,
        TabContainer,
        TabContainerItem
    } from 'mint-ui';
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
        components: {
            Header
        },
        data() {
            return {
                show: true,
                loading: true,
                res: "memberLogin=A&userPassword=B",
                wise: 1,
                judgePhone: '',
                judgePhone_: '',
                judgePwd: '',
                judgeNewPwd: '',
                judgeNewPwd_: '',
                judgeReNewPwd: '',
                judgeReNewPwd_: '',
                // seen: 'ok',
                // seen_: 'ok',
                msg: '',
                active: 'tab-container1',
                ok: false,
                count: "",
                tabActive: true,
                isError: '', // 请求报错内容
                tipActive: false, //请求报错显示
                tipActive_: false, //请求报错显示
                sCode: '',
                timer: null,
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
                    this.judgePhone = 'ok'
                } else {
                    this.judgePhone = ''
                }
            },
            blurPhone_() {
                if (!this.$options.methods.isPoneAvailable(this.$refs.userName_.value)) {
                    this.judgePhone_ = 'ok'
                } else {
                    this.judgePhone_ = ''
                }
            },
            blurPwd() {
                if (!this.$options.methods.isPwd(this.$refs.normalPwd.value)) {
                    this.judgePwd = 'ok'
                } else {
                    this.judgePwd = ''
                }
            },
            blurNewPwd() {
                if (!this.$options.methods.isPwd(this.$refs.newPwd.value)) {
                    this.judgeNewPwd = 'ok'
                } else {
                    this.judgeNewPwd = ''
                }
            },
            blurNewPwd_() {
                if (!this.$options.methods.isPwd(this.$refs.newPwd_.value)) {
                    this.judgeNewPwd_ = 'ok'
                } else {
                    this.judgeNewPwd_ = ''
                }
            },
            blurReNewPwd_() {
                if (this.$refs.reNewPwd_.value == this.$refs.newPwd_.value) {
                    this.judgeReNewPwd_ = ''
                } else {
                    this.judgeReNewPwd_ = 'ok'
                }
            },
            blurReNewPwd() {
                if (this.$refs.newPwd.value == this.$refs.reNewPwd.value) {
                    this.judgeReNewPwd = ''
                } else {
                    this.judgeReNewPwd = 'ok'
                }
            },
            // 旧密码提交登录请求
            submits() {
                const TOKEN = sessionStorage.getItem('TOKEN')
                if (this.$options.methods.isPoneAvailable(this.$refs.userName.value) && this.$options.methods.isPwd(this.$refs.normalPwd.value) && this.$options.methods.isPwd(this.$refs.newPwd.value) && (this.$refs.newPwd.value == this.$refs.reNewPwd.value)) {
                    if (TOKEN) {
                        var resetParams = {
                            password: sha1(this.$refs.normalPwd.value),
                            code: sha1(this.$refs.newPwd.value),
                        };
                        loginApi.reset(resetParams, {
                            headers: {
                                'x-auth-token': TOKEN
                            }
                        }).then(res => {
                            this.$router.push({
                                name: 'Entity'
                            })
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        this.tipActive = true;
                        this.isError = '修改失败!';
                    }
                } else {
                }
            },
            // 动态验证码修改密码
            getCode() {
                if (this.judgePhone_ == '') {
                    this.timer = null; //打开倒计时开关
                    const mobileNumber = this.$refs.userName_.value;
                    getCodeApi.getcode({
                        id: mobileNumber
                    }, {
                        data: {}
                    }).then(res => {
                        this.sCode = res.data;
                    }).catch(error => {
                        this.tipActive_ = true;
                        this.isError = '获取验证码失败!';
                    })
                } else {
                    this.show = true; //打开可以重新获取验证码的开关
                    this.timer = 1; //关闭倒计时
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
            submits_() {
                const TOKEN = sessionStorage.getItem('TOKEN');
                if (this.$options.methods.isPoneAvailable(this.$refs.userName_.value) && this.$options.methods.isPwd(this.$refs.newPwd_.value) && (this.$refs.reNewPwd_.value == this.$refs.newPwd_.value)) {
                    if (TOKEN) {
                        var resetParams = {
                            note: this.$refs.smsCode.value, //短信验证码
                            code: sha1(this.$refs.newPwd_.value), //新密码
                        };
                        loginApi.reset(resetParams, {
                            headers: {
                                'x-auth-token': TOKEN
                            }
                        }).then(res => {
                            this.$router.push({
                                name: 'Entity'
                            })
                        }).catch(error => {
                            // console.log(error);
                            this.tipActive_ = true;
                            this.isError = '修改失败!';
                        });
                    } else {
                        this.tipActive_ = true;
                        this.isError = '修改失败!';
                    }
                }
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
            // margin-top: 36px;
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
        .btn div.redBtn {
            background: #ffcb16;
            color: #000;
            height: 1.04rem;
            line-height: 1.04rem;
            letter-spacing: 0.06667rem;
            font-size: 0.41333rem;
        }
    }
</style>

