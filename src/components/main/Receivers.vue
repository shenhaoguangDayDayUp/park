<template>
    <div class="receivers">
        <Header title="收货地址" :isShow="true"></Header>
        <!-- 报错信息 -->
        <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
        </div>
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
                    <span @click="chooseFav(v.code)">
                                        <check-icon :value.sync="v.favorite" > 默认地址</check-icon>
                                        </span>
                    <div>
                        <router-link :to="{path:'/receiversUpdate',query: {code: v.code}}"><span><img src="../../assets/img/edit.png" alt="">编辑</span></router-link>
                        <span @click="deleteList(v.code,i)"><img src="../../assets/img/delete.png" alt="">删除</span>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 按钮 -->
        <div class="btn">
            <div class="redBtn active">
                <router-link to='/receiversUpdate'>添加一个新地址</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import '../../style/isError.scss';
    import '../../style/btn.scss';
    import Header from '../common/Header'
    import {
        loginApi,
    } from '../../api/api';
    import {
        CheckIcon
    } from 'vux';
    export default {
        name: "Receivers",
        components: {
            Header,
            CheckIcon
        },
        data() {
            return {
                isError: '',
                List: [],
            };
        },
        mounted() {   
                const TOKEN = sessionStorage.getItem('TOKEN');
            this.$root.eventHub.$on('noteRcv', () => {
                this.mountedApi(TOKEN);
            })
            this.mountedApi(TOKEN);
        },
        methods: {
            // 修改默认地址的请求
            chooseFav(code) {
                loginApi.receiversSetDefault({
                    id: code
                }, {
                    headers: {
                        'x-auth-token': sessionStorage.getItem('TOKEN')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$vux.toast.show({
                            text: '修改成功',
                        });
                        this.$root.eventHub.$emit('noteRcv')
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
                console.log(i)
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
            mountedApi(TOKEN) {
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
            }
        }
    };
</script>
<style lang="scss" scoped>
    .receivers {
        background-color: #23262b;
        height: 100%;
        color: #fff;
        .receiversList {
            li {
                box-sizing: inherit;
                height: 288px;
                padding: 23px;
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
                    span {
                        height: 94px;
                        line-height: 94px;
                    }
                }
            }
        }
        .btn {
            margin: 71px 82px 0 78px;
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



