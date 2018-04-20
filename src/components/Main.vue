<template>
    <div id="my">
        <div class="mainContent">
            <Header title="我的主页" :isShow="true">
                <router-link to="./message" slot="right" class="msgWrap">
                    <img src="../assets/img/xinxiaoxi.png"  alt="">
                    <badge :text=unreadMsg v-show="unreadMsg"></badge>
                </router-link>
            </Header>
            <div class="user-header">
                <div class="user-mess">
                </div>
            </div>
            <div class="mint-cell mint-cell-wrapper">
                <div class="mint-cell-title" v-if=isActive>
                    <div class="cell-logo">
                        <img :src = avatar height="60" width="60">
                        <div class="mint-cell-text" style="padding-left:40px;">
                            <span>{{list.userName}}</span>
                            <span>{{list.mobileNumber}}</span>
                        </div>
                    </div>
                    <router-link to="/entity">
                        <div class="right-arrow"></div>
                    </router-link>
                </div>
                <div class="mint-cell-title" v-else>
                    <div class="cell-logo" @click=toLogin>
                        <img data-v-48713cc3="" src="../assets/img/touxiang2@2x.png" height="60" width="60">
                        <div class="mint-cell-text" style="padding-left:40px;">
                            <span>请登录</span>
                        </div>
                    </div>
                    <router-link to="/login">
                        <div class="right-arrow"></div>
                    </router-link>
                </div>
            </div>
            <div class="user-option">
                <div class="user-option-title">
                    <span>积分信息</span>
                </div>
                <!-- <hr /> -->
                <div class="user-option-con mint-tabbar">
                    <div class="mint-tab-item" @click='viewPoint'>
                        <div class="mint-icon yue">
                            <span>{{list.point}}</span>
                        </div>
                        <div class="mint-tab-item-label">余额</div>
                    </div>
                    <div class="mint-tab-item" @click='$router.push({name:"charge"})'>
                        <div class="mint-icon">
                            <img src="../assets/img/chongzhi.png" alt="">
                        </div>
                        <div class="mint-tab-item-label">在线充值</div>
                    </div>
                    <div class="mint-tab-item" @click='$router.push({name:"change"})'>
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
                    <div class="mint-tab-item" @click='$router.push({path:"/heart/list"})'>
                        <div class="mint-icon">
                            <img src="../assets/img/xinyuandan.png" alt="">
                            <badge :text=wishList v-show="wishList"></badge>
                        </div>
                        <div class="mint-tab-item-label">心愿单</div>
                    </div>
                    <div class="mint-tab-item"  @click='$router.push({ name: "orderLsit", query: { index: 0 } })'>
                        <div class="mint-icon">
                            <img src="../assets/img/daifukuan.png" alt="">
                            <badge :text=unpaid v-show="unpaid"></badge>
                        </div>
                        <div class="mint-tab-item-label">待付款</div>
                    </div>
                    <div class="mint-tab-item"  @click='$router.push({ name: "orderLsit", query: { index: 1 } })'>
                        <div class="mint-icon">
                            <img src="../assets/img/daishouhuo.png" alt="">
                        <badge :text=ungoods v-show="ungoods"></badge>
                        </div>
                        <div class="mint-tab-item-label">待收货</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "./common/Header.vue";
    import {
        XHeader,
        Badge
    } from 'vux'
    import swal from 'sweetalert';
    import axios from 'axios';
    import {
        user
    } from '@/logic'
    import {
        integralApi,
        loginApi,
        getMsgApi
    } from '../api/api';
    export default {
        name: "Login",
        components: {
            XHeader,
            Badge,
            Header
        },
        data() {
            return {
                isActive: false,
                unreadMsg: '',
                ungoods: '',
                unpaid:'',
                wishList:'',
                list: {
                    userName: '',
                    mobileNumber: '',
                    point: '== ==',
                },
                avatar:''
            };
        },
        mounted() {
            this.$root.eventHub.$on('notification', () => {
                this.Api();
            })
            // 如果用户信息存在(半小时后token过期了)或者token存在(登录时候没选下次自动登录)时再发请求
            if (user.getLoginUser('$LoginUser') || sessionStorage.getItem('TOKEN')) {
                this.Api();
            }
        },
        methods: {
            toLogin() {
                this.$router.push({
                    path: '/login'
                });
            },
            viewPoint() {
                // if (this.point == '== ==') {
                //     const TOKEN = sessionStorage.getItem('TOKEN')
                //     // 请求积分信息
                //     integralApi.account({}, {
                //         data: {},
                //         headers: {
                //             'x-auth-token': TOKEN
                //         }
                //     }).then(res => {
                //         const {
                //             headers,
                //             data
                //         } = res
                //         this.point = data
                //     }).catch(error => {
                //         console.log(error)
                //     });
                // }
            },
            Api() {
                const TOKEN = sessionStorage.getItem('TOKEN')
                loginApi.main({}, {
                    data: {},
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    const {
                        data
                    } = res;
                    this.isActive = true;
                    this.unreadMsg = data['message.unread.count'];
                    this.ungoods = data["order.process.count"],// 待收货
                    this.unpaid = data[ "order.request.count"],// 待付款
                    this.wishList = data['cart.item.count'],// 心愿单
                    this.list = {
                        userName: data['member.name'],
                        mobileNumber: data['member.mobileNumber'].replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
                        point:data['account.balance'].toLocaleString()
                    }
                    this.avatar = require('/api'+ data["member.avatar"] + '?r=' + new Date().getTime()); // 头像加时间戳
                }).catch(error => {
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    #my {
        background: #23262B; // height: 100%;
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
        .right-arrow {
            display: inline-block;
            border-right: 5px solid #ccc;
            border-bottom: 5px solid #ccc;
            width: 22px;
            height: 22px;
            transform: rotate(315deg);
            -webkit-transform: rotate(315deg);
        }
        .msgWrap{
            position: relative;
            .vux-badge{
            position: absolute;
            right:-5px;
            top:-5px;
            background: #000;
            color:#fff;
            }
        }
    }
    .mainContent {
        display: flex;
        flex-direction: column;
        img {
            width: 36px;
            height: 35px;
        }
    }
    .user-option {
        background-color: #2F323B;
        margin-top: 23px;
        color: #fff;
        .user-option-title {
            span {
                border-left: 4px solid #ffcb16;
                padding-left: 16px;
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
</style>
<style lang="scss">
    #my {
        .mint-icon {
            width: 100%;
        }
        .vux-header .vux-header-left,
        .vux-header .vux-header-right {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            /* 50%为自身尺寸的一半 */
            height: 35px;
            width: 36px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
<style lang="scss">
#mytab{
.vux-badge{
    background:#2F323B;
    border-radius:100%;
    border:1px solid #fff;
    width:25px;
    height:25px;
    box-sizing:border-box;
    line-height:25px;
    text-align:center;
    padding:0;
}
}
</style>




