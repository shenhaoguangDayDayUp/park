<template>
    <div class="entity">
        <x-header :left-options="{backText: ''}">会员信息</x-header>
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
                <span>{{userName}}</span>
                <router-link :to="{name:'Rename',query: {name: '哆啦A梦'}}">
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
    </div>
</template>
<script>
    import '../../style/header.scss';
    import {
        user
    } from '@/logic'
    import {
        loginApi,
    } from '../../api/api';
    import {
        XHeader
    } from 'vux'
    export default {
        name: "entity",
        components: {
            XHeader
        },
        data(){
            return{
                userName:'',
                mobileNumber:''
            }
        },
        mounted(){
            const TOKEN = sessionStorage.getItem('TOKEN')
            // 请求用户信息
            loginApi.entity({}, {
                data: {},
                headers: {
                    'x-auth-token': TOKEN
                }
            }).then(res => {
                const {
                    data
                } = res;
                this.isActive = true;
                this.mobileNumber = data.mobileNumber;
                this.userName = data.name;
            }).catch(error => {
                console.log(error.response.status)
            });
        },
        
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
            li {
                
            }
        }
    }
</style>



