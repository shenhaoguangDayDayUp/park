<template>
    <div class="entity">
         <Header title="会员信息" :isShow="true"></Header>
        <ul class="messList">
            <li class="logoIcon">
                <span>头像</span>
                <router-link to="./messageDetail">
                    <img data-v-48713cc3="" src="../../assets/img/touxiang2@2x.png" height="60" width="60">
                </router-link>
                <span></span>
            </li>
            <li>
                <span>昵称</span>
                <span>{{nickname}}</span>
                <router-link :to="{name:'Rename',query: {name: nickname}}">
                    <div class="right-arrow"></div>
                </router-link>
            </li>
        </ul>
        <ul class="messList">
            <li>
                <span>姓名</span>
                <span>{{userName}}</span>
                <span></span>
            </li>
            <li>
                <span>手机号</span>
                <span>{{mobileNumber}}</span>
                <router-link to="./ReMessage">
                    <div class="right-arrow"></div>
                </router-link>
            </li>
            <li>
                <span>身份证号</span>
                <span>123456789123456</span>
                <span></span>
            </li>
        </ul>
        <ul class="messList">
            <li>
                <span>重置密码</span>
                <span></span>
                <router-link to="./password">
                    <div class="right-arrow"></div>
                </router-link>
            </li>
            <li>
                <span>收货地址</span>
                <span></span>
                <router-link to="./receivers">
                    <div class="right-arrow"></div>
                </router-link>
            </li>
        </ul>
        <input  name="imgLocal" type='file' accept="image/*" @change="selectImg"/>
        <div class="linshi" style="color:#fff;padding:10px;" @click="toLogout()">
            退出登录
        </div>
    </div>
</template>
<script>
     import Header from '../common/Header'
    import {
        user
    } from '@/logic'
    import {
        loginApi,
    } from '../../api/api';
    export default {
        name: "entity",
        components: {
            Header
        },
        data() {
            return {
                userName: '',
                mobileNumber: '',
                nickname:''
            }
        },
        mounted() {
            const TOKEN = sessionStorage.getItem('TOKEN')
            // 请求用户信息
            loginApi.entity({}, {
                data: {},
                headers: {
                    'x-auth-token': TOKEN
                }
            }).then(res => {
                // console.log(res)
                const {
                    data
                } = res;
                this.mobileNumber = data.mobileNumber;
                this.userName = data.name;
                this.nickname = data.nickname;
            }).catch(error => {
                // console.log(error.response.status)
            });
        },
        methods: {
            // 退出登录请求
            toLogout() {
                const TOKEN = sessionStorage.getItem('TOKEN')
                loginApi.logout({}, {
                    data: {},
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    const {
                        data,
                        status
                    } = res;
                    if (status == 200) {
                        localStorage.removeItem('$LoginUser')
                        sessionStorage.removeItem('TOKEN')
                        this.$router.push({
                            path: '/login'
                        });
                    }
                }).catch(error => {
                    console.log(error.response.status)
                });
            },
            // 更改头像
            selectImg(){
                alert(1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .entity {
        background-color: #23262b;
        height: 100%;
        color: #fff;
        .messList {
            margin-bottom: 26px;
            li {
                height: 92px;
                border-bottom: 2px solid #323540; // margin-bottom: 26px;
                color: #d7dae1;
                font-size: 30px;
                padding: 0 23px;
                background: #2a2d36;
                display: flex;
                justify-content: space-between;
                span {
                    height: 100%;
                    line-height: 92px;
                }
                span:nth-child(1) {
                    width: 25%;
                }
                span:nth-child(2) {
                    width: 65%;
                    text-align: right; // padding-right: 35px;
                }
                span:nth-child(3) {
                    width: 10%;
                }
                a {
                    width: 10%;
                    height: 100%;
                    line-height: 92px;
                    text-align: right;
                    vertical-align: center;
                    .right-arrow {
                        display: inline-block;
                        border-right: 5px solid #ccc;
                        border-bottom: 5px solid #ccc;
                        width: 22px;
                        height: 22px;
                        transform: rotate(315deg);
                        -webkit-transform: rotate(315deg);
                    }
                    img {
                        height: 89px;
                        width: 89px;
                        border-radius: 100%;
                        border: solid #ffffff 2px;
                        box-shadow: border-box;
                    }
                }
            }
            li.logoIcon {
                height: 119px;
                a {
                    line-height: 119px;
                    width: 65%;
                    text-align: right;
                }
                span {
                    line-height: 119px;
                }
            }
        }
        .messList:nth-child(2) {
            li {}
        }
    }
</style>



