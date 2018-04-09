<template>
    <div id="my">
        <div class="mainContent">
            <div class="user-header">
                <div class="user-mess">
                    <router-link to="./message"><img src="../assets/img/xinxiaoxi@2x.png" alt=""></router-link>
                </div>
            </div>
            <div class="mint-cell mint-cell-wrapper">
                <div class="mint-cell-title" v-if=isActive>
                    <div class="cell-logo">
                        <img data-v-48713cc3="" src="../assets/img/toux@2x.png" height="60" width="60">
                        <div class="mint-cell-text" style="padding-left:40px;">
                            <span>{{userName}}</span>
                            <span>{{mobileNumber}}</span>
                        </div>
                        <i data-v-1b0f58d8="" class="mint-cell-allow-right"></i>
                    </div>
                    <i class="mint-cell-allow-right"></i>
                </div>
                <div class="mint-cell-title" v-else @click=toLogin>
                    <div class="cell-logo">
                        <img data-v-48713cc3="" src="../assets/img/touxiang2@2x.png" height="60" width="60">
                        <div class="mint-cell-text" style="padding-left:40px;">
                            <span>请登录</span>
                        </div>
                        <i data-v-1b0f58d8="" class="mint-cell-allow-right"></i>
                    </div>
                    <i class="mint-cell-allow-right"></i>
                </div>
            </div>
            <div class="user-option">
                <div class="user-option-title">
                    <span>积分信息</span>
                </div>
                <!-- <hr /> -->
                <div class="user-option-con mint-tabbar">
                    <div class="mint-tab-item">
                        <div class="mint-icon yue">
                            <span>{{point}}</span>
                        </div>
                        <div class="mint-tab-item-label">余额</div>
                    </div>
                    <div class="mint-tab-item">
                        <div class="mint-icon">
                            <img src="../assets/img/chongzhi.png" alt="">
                        </div>
                        <div class="mint-tab-item-label">在线充值</div>
                    </div>
                    <div class="mint-tab-item">
                        <div class="mint-icon">
                            <img src="../assets/img/jiaoyimingxi.png" alt="">
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
                    <div class="mint-tab-item">
                        <div class="mint-icon">
                            <img src="../assets/img/xinyuandan.png" alt="">
                        </div>
                        <div class="mint-tab-item-label">心愿单</div>
                    </div>
                    <div class="mint-tab-item">
                        <div class="mint-icon">
                            <img src="../assets/img/daifukuan.png" alt="">
                        </div>
                        <div class="mint-tab-item-label">待付款</div>
                    </div>
                    <div class="mint-tab-item">
                        <div class="mint-icon">
                            <img src="../assets/img/daishouhuo.png" alt="">
                        </div>
                        <div class="mint-tab-item-label">待收货</div>
                    </div>
                </div>
            </div>
            <div class="linshi" style="color:#fff;padding:10px;" @click="toLogout()">
                退出登录
            </div>
        </div>
    </div>
</template>
<script>
    import swal from 'sweetalert';
    import axios from 'axios';
    import {
        user
    } from '@/logic'
    import {
        integralApi,
        loginApi,
    } from '../api/api';
    export default {
        name: "Login",
        data() {
            return {
                point: '== ==',
                isActive: false,
                userName: '',
                mobileNumber: ''
            };
        },
        mounted() {
            // var XTOKEN = JSON.parse(localStorage.getItem('$LoginUser'))['x-auth-token']
                integralApi.account({}, {
                    data: {},
                    headers: {
                        'x-auth-token': XTOKEN
                    }
                }).then(res => {
                    const {
                        headers,
                        data
                    } = res
                    this.point = data
                }).catch(error => {
                    console.log(error.response)
                });
            const TOKEN = JSON.parse(localStorage.getItem('$LoginUser'))
            // 如果用户账号密码在本地存在，则半个小时token过期后再发送请求。
            if (TOKEN) {
                var loginParams = {
                    mobileNumber: JSON.parse(localStorage.getItem('$LoginUser'))['mobileNumber'],
                    password: JSON.parse(localStorage.getItem('$LoginUser'))['password']
                };
                loginApi.login(loginParams).then(res => {
                    const {
                        headers
                    } = res
                    // 本地存储
                    var profile = Object.assign({}, loginParams, headers)
                    user.setLoginUser(profile)
                }).catch(error => {
                    sweetAlert("哎呦……", "出错了！", "error");
                });
                // 请求用户信息和积分信息 
                var XTOKEN = JSON.parse(localStorage.getItem('$LoginUser'))['x-auth-token']
                integralApi.account({}, {
                    data: {},
                    headers: {
                        'x-auth-token': XTOKEN
                    }
                }).then(res => {
                    const {
                        headers,
                        data
                    } = res
                    this.point = data
                }).catch(error => {
                    console.log(error.response.data)
                });
                loginApi.entity({}, {
                    data: {},
                    headers: {
                        'x-auth-token': XTOKEN
                    }
                }).then(res => {
                    this.userName = res.data.name;
                    this.mobileNumber = res.data.mobileNumber;
                    this.isActive = true;
                }).catch(error => {})
            }
        },
        methods: {
            toLogin() {
                this.$router.push({
                    path: '/login'
                });
            },
            toLogout() {
                localStorage.removeItem('token')
                localStorage.removeItem('accountInfo')
                this.$router.push({
                    path: '/login'
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    #my {
        background: #23262B;
        height: 100%;
        .mint-cell:last-child {
            background-position-x: 10px;
        }
        .mint-cell {
            background: #2F323B;
            color: #fff;
            height: 118px;
            padding: 0;
            img {
                height: 124px;
                width: 124px;
                border-radius: 100%;
                border: solid #ffffff 2px;
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
        }
        .mint-cell-allow-right::after {
            border: 2px solid #c8c8cd;
            border-bottom-width: 0;
            border-left-width: 0;
            content: " ";
            top: 50%;
            right: 20px;
            position: absolute;
            width: 5px;
            height: 5px;
            transform: translateY(-50%) rotate(45deg);
            right: 53px;
            height: 15px;
            width: 15px;
        }
    }
    .mainContent {
        display: flex;
        flex-direction: column;
    }
    .user-header {
        padding: 0 10px;
        height: 94px;
        .user-mess {
            float: right;
            height: 36px;
            width: 36px;
            margin-top: 29px;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .user-option {
        background-color: #2F323B;
        margin-top: 23px;
        color: #fff;
        .user-option-title {
            span {
                border-left: 4px solid #ffcb16;
                padding-left: 20px;
                font-size: 30px;
                margin-left: 24px;
            }
            height: 78px;
            line-height:78px;
            border-bottom:2px solid #323540;
            box-sizing: border-box;
        }
        .user-option-con.mint-tabbar {
            position: static;
            background: #2F323B;
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
    .mint-cell-allow-right:after {}
</style>
<style>
    .mint-icon {
        width: 100%;
    }
</style>



