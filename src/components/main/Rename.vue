<template>
    <div class="rename">
        <Header title="修改用户昵称" :isShow="true"></Header>
        <x-input title="" placeholder="" :min="2" :max="20" :icon-type="iconType" v-model="name"></x-input>
        <!-- 报错信息 -->
        <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
        </div>
        <!-- 按钮 -->
        <div class="btn">
            <div class="redBtn active" @click=rename()>
                立&nbsp;即&nbsp;修&nbsp;改
            </div>
        </div>
    </div>
</template>
<script>
    import '../../style/btn.scss';
    import '../../style/isError.scss';
    import Header from '../common/Header'
    import {
        loginApi,
    } from '../../api/api';
    import {
        XInput
    } from 'vux'
    export default {
        name: 'Rename',
        components: {
            XInput,
            Header
        },
        data() {
            return {
                isError: '',
                name: this.$route.query.name,
                iconType: '',
            }
        },
        methods: {
            rename() {
                // 修改用户昵称
                const nickname = {"nickname": this.name}
                loginApi.nickname({}, {
                    data: nickname,
                    headers: {
                        'x-auth-token': sessionStorage.getItem('TOKEN')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$router.push({
                            path:'/entity'
                        })
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    .rename {
        background-color: #23262b;
        height: 100%;
        color: #fff;
        .btn,
        .isError {
            margin: 71px 82px 0 78px;
        }
    }
</style>
<style lang="scss">
    .rename {
        .vux-x-input.weui-cell {
            height: 92px;
            background: #2a2d36;
            font-size: 30px;
            padding-left: 23px;
        }
        .vux-x-input.weui-cell:before {
            border: none;
        }
        .weui-icon.weui_icon_clear.weui-icon-clear {
            font-size: 20px;
        }
    }
</style>



