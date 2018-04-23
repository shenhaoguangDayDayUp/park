<template>
    <div class="receivers">
        <Header title="收货地址" :isShow="true"></Header>
        <!-- 报错信息 -->
        <!-- <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
        </div> -->
        <ul class="receiversList" v-for="(v,i) in List" :key='i'>
            <li>
                <div class="receiversMsg">
                    <div class="MsgTop">
                        <span>{{v.name}}</span>
                        <span>{{v.mobileNumber}}</span>
                    </div>
                    <div class="MsgBottom">
                        {{v.province}}{{v.city}}{{v.district}}{{v.street}}
                    </div>
                </div>
                <div class="receiversUpdate">
                    <div @click="chooseFav(v.code)" class="rcvDefault">
                            <check-icon :value.sync="v.favorite" > 默认地址</check-icon>
                    </div>
                    <div class="rcvDone">
                        <div @click='$router.push({path:"/receiversUpdate",query: {code: v.code,title:"编辑收货地址"}})'><img src="../../assets/img/edit.png" alt=""><span>编辑</span></div>
                        <div @click="deleteList(v.code,i)"><img src="../../assets/img/delete.png" alt=""><span >删除</span></div>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 按钮 -->
        <div class="btn">
            <div class="redBtn active">
                <router-link :to="{path:'/receiversUpdate',query: {title:'添加收货地址 '}}">添加一个新地址</router-link>       
            </div>
        </div>
        <!-- <button :text="submit001"  @click.native="processButton001" type="primary"></button> -->
        <!-- <submit :text="submit"  @click.native='$router.push({name: "ReceiversUpdate",query: {title: "添加收货地址"}}) ' :disabled="disabled"></submit>        -->
    </div>
</template>
<script>
    import '../../style/isError.scss';
    import '../../style/btn.scss';
    import Header from '../common/Header';
    import Submit from '../common/Button';
    import {
        loginApi,
    } from '../../api/api';
    import {
        CheckIcon
    } from 'vux';
    export default {
        name: "Receivers",
        data() {
            return {
                isError: '',
                List: [],
                submit: '添加一个新地址',
                disabled: true,
                classes: 'btn_disabled'
            };
        },
        mounted() {
            const TOKEN = sessionStorage.getItem('TOKEN');
            this.getList(TOKEN);
        },
        methods: {
            // 修改默认地址的请求
            chooseFav(code) {
                const TOKEN = sessionStorage.getItem('TOKEN');
                loginApi.receiversSetDefault({
                    id: code
                }, {
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$vux.toast.show({
                            text: '修改成功',
                        });
                        this.getList(TOKEN);
                    } else {
                        this.isError = '出现异常!请重试!'
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
                            this.isError = '请求错误!'
                            break;
                    }
                });
            },
            // 发送删除地址的请求
            deleteList(e, i) {
                const deleteItem = {
                    "code": e
                }
                loginApi.receiversDel({}, {
                    data: deleteItem,
                    headers: {
                        'x-auth-token': sessionStorage.getItem('TOKEN')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.List.splice(i, 1);
                    } else {
                        this.isError = '出现异常!请重试!'
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
                            this.isError = '请求错误!'
                            break;
                    }
                });
            },
            getList(TOKEN) {
                // 请求用户收货地址信息
                loginApi.receivers({}, {
                    data: {},
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    const {
                        data
                    } = res;
                    this.List = data
                }).catch(error => {
                    console.log(error.response.status)
                });
            },
            //去修改
            addRcv() {
                alert(2)
            }
        },
        components: {
            Header,
            CheckIcon,
            Submit
        },
    };
</script>
<style lang="scss" scoped>
    .receivers {
        background-color: #23262b;
        height: 100%;
        color: #fff; // margin-bottom:94px;
        .receiversList {
            li {
                // box-sizing: inherit;
                // height: 288px;
                padding: 23px;
                padding-bottom: 0;
                background: #2a2d36;
                font-size: 30px;
                margin-bottom: 20px;
                .receiversMsg {
                    height: 192px;
                    border-bottom: 2px solid #323540;
                    .MsgTop {
                        height: 68px;
                        line-height: 68px;
                        span:nth-child(2) {
                            float: right;
                        }
                    }
                    .MsgBottom {
                        margin-top: 17px;
                        font-size: 24px;
                        line-height: 30px;
                        padding-right: 11px;
                    }
                }
                .receiversUpdate {
                    display: flex;
                    justify-content: space-between;
                            font-size: 24px;
                    .rcvDone {
                        display: flex;
                        justify-content: flex-start;
                    }
                    .rcvDefault {
                        line-height: 94px;
                    }
                    div {
                        height: 94px;
                        margin-right: 36px;
                        img {
                            height: 28px;
                            width: 28px;
                            vertical-align: middle;
                            margin-right: 14px;
                        }
                        span {
                            line-height: 94px;
                        }
                    }
                    div:nth-child(2){
                        margin-right:0;
                    }
                }
            }
        }
        .btn {
            margin: 71px 82px 0 78px;
            margin-bottom: 94px;
        }
    }
</style>
<style lang="scss">
    .vux-check-icon>.weui-icon-success:before,
    .vux-check-icon>.weui-icon-success-circle:before {
        color: #ffcb16!important;
    }
    .receivers {
        .weui-icon-success {
            font-size: 28px;
        }
        .vux-check-icon>span {
            color: #fff;
        }
        .weui-icon-circle {
            font-size: 28px;
            color: #ffcb16;
        }
    }
</style>



