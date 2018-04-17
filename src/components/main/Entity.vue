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
            <li @click.stop='$router.push({name:"Rename",query: {name: nickname}})'>
                <span>昵称</span>
                <span>{{nickname}}</span>
                <div class="right">
                    <div class="right-arrow"></div>
                </div>
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
                <span></span>
            </li>
            <li>
                <span>身份证号</span>
                <span>{{idCardNumber}}</span>
                <span></span>
            </li>
        </ul>
        <ul class="messList">
            <li @click.stop='$router.push({name:"Receivers"})'>
                <span>收货地址</span>
                <span></span>
                <div class="right">
                    <div class="right-arrow"></div>
                </div>
            </li>
        </ul>
        <ul class="messList">
            <li @click.stop='$router.push({name:"Password"})'>
                <span>重置密码</span>
                <span></span>
                <div class="right">
                    <div class="right-arrow"></div>
                </div>
            </li>
        </ul>
        <ul class="messList" style="margin-top:100px;">
            <li @click="toLogout(e)" style="display:flex;
    align-items:center;
    justify-content:center;">
                退出登录
            </li>
        </ul>
        <!-- <input name="imgLocal" type='file' accept="image/*" @change="selectImg" /> -->
    </div>
</template>
<script>
    import Header from '../common/Header'
    import axios from 'axios'
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
                nickname: '',
                idCardNumber: ''
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
                this.mobileNumber = data.mobileNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                this.userName = data.name;
                this.nickname = data.nickname;
                this.idCardNumber = data.idCardNumber;
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
            selectImg(e) {
                // console.log(e)
                // const TOKEN = sessionStorage.getItem('TOKEN')
                // let imgFile = e.srcElement.files[0]; //取到上传的图片
                // console.log(imgFile); 
                // let formData = new FormData(); //通过formdata上传
                // formData.append('avatar', imgFile);
                // axios.post('/api/gateway/mobile/member/avatar', , {
                //     method: 'post',
                //     headers: {
                //         'Content-Type': 'form-data',
                //         'x-auth-token': TOKEN
                //     }
                // }).then(function(res) {
                //     console.log(res); //
                // }).catch(function(error) {
                //     console.log(error);
                // })
                // loginApi.avatar({},
                // {
                //     data: formData,
                //     headers: {
                //         'x-auth-token': TOKEN,
                //         'Content-Type': 'form-data',
                //     }
                // }).then(function(res) {
                //     console.log(res); //
                // }).catch(function(error) {
                //     console.log(error);
                // })
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
                .right {
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
                    img{
                        height:92px;
                        width:92px;
                    }
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



