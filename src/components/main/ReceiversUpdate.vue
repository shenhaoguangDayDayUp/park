<template>
    <div class="receiverUpdate">
        <Header title="编辑收货地址" :isShow="true"></Header>
        <div class="addrForm">
            <x-input name="username" placeholder="请输入姓名" is-type="china-name" :show-clear="false" v-model="userName" :icon-type="iconType"></x-input>
            <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" mask="999 9999 9999" :max="13" is-type="china-mobile" :show-clear="false" v-model="mobileNumber" :icon-type="iconType"></x-input>
            <!-- 收货地址开始 -->
            <x-address :title="title" :list="addressData" placeholder="点击选择" v-model="areaValue">
                <template slot="title" slot-scope="props">
</template>
                </x-address>
            <!-- 收货地址结束 -->
                <x-textarea :max="200" name="detail" placeholder="街道" :show-counter="false" v-model="street"></x-textarea>
                <Checker checkerTitle="设置为默认地址" :ischoosen.sync="show"></Checker>
        <!-- 报错信息 -->
          <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
          </div>
          <x-button type="primary" @click.native="rcvrSubmit">保存</x-button>
        </div>
        {{areaValue}}
        {{getName(areaValue)}}
    </div>
</template>
<script>
    import '../../style/btn.scss';
    import '../../style/isError.scss';
    import {
        loginApi,
    } from '../../api/api';
   import Header from '../common/Header'
   import Checker from '../common/Checker'
    import MapsCoding from '../../common/MapsCoding.json'
    import {
        XInput,
        XAddress,
        ChinaAddressV4Data,
        XTextarea,
        XButton,
        Value2nameFilter as value2name,
    } from 'vux';
    export default {
        name: "ReceiverUpdate",
        components: {
            XInput,
            XAddress,
            XTextarea,
            XButton,
            Header,
            Checker
        },
        data() {
            return {
                show:true,
                addressData: MapsCoding,
                title: '请选择收货地址',
                areaValue: ['110000', '110100', '110101'],
                userName: '',
                mobileNumber: '',
                street: '',
                isError: '',
                iconType: '',
            };
        },
        mounted() {
            let code = this.$route.query.code
            if (code) {
                // 查询用户收货地址信息
                loginApi.receiversFind({
                    id: this.$route.query.code
                }, {
                    data: {},
                    headers: {
                        'x-auth-token': sessionStorage.getItem('TOKEN')
                    }
                }).then(res => {
                    let {
                        status,
                        data
                    } = res;
                    if (res.status == 200) {
                        console.log(res)
                        this.userName = data.name;
                        this.mobileNumber = data.mobileNumber;
                        this.street = data.street;
                        this.areaValue = [data.provinceID,data.cityID,data.districtID]
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
            } else {
                console.log('else')
            }
        },
        methods: {
            rcvrSubmit() {
                const areaName = this.$options.methods.getName(this.areaValue)
                var arr = areaName.split(" ");
                // 修改地址
                if (this.$route.query.code) {
                    const editList = {
                        "code": this.$route.query.code,
                        "name": this.userName,
                        "mobileNumber": this.mobileNumber,
                        "province": arr[0],
                        "city": arr[1],
                        "district": arr[2],
                        "street": this.street,
                        "provinceID": "2",
                        "cityID": "2822",
                        "districtID": "51979"
                    }
                    // 修改用户收货地址信息
                    loginApi.receiversEdit({}, {
                        data: editList,
                        headers: {
                            'x-auth-token': sessionStorage.getItem('TOKEN')
                        }
                    }).then(res => {
                        if (res.status == 200) {
                       window.global.$root.eventHub.$emit('addressUpdate')
                            this.$router.go(-1)

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
                    // 增加地址
                } else {
                    // 增加用户收货地址信息
                    const addList = {
                        "name": this.userName,
                        "mobileNumber": this.mobileNumber,
                        "province": arr[0],
                        "city": arr[1],
                        "district": arr[2],
                        "street": this.street,
                        "provinceID": "2",
                        "cityID": "2822",
                        "districtID": "51979"
                    }
                    loginApi.receiversUpdate({}, {
                        data: addList,
                        headers: {
                            'x-auth-token': sessionStorage.getItem('TOKEN')
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            this.$router.push({
                                name: 'Receivers'
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
            },
            getName(areaValue) {
                return value2name(areaValue, ChinaAddressV4Data)
            },
        }
    };
</script>
<style lang="scss" scoped>
    .receiverUpdate {
        background-color: #23262b;
        height: 100%;
        color: #fff;
        .addrForm {
            margin: 56px 80px 0;
        }
    }
    .close {
        height: 40px;
        width: 100px;
        img {
            width: 18px;
            margin-left: 20px;
            margin-top: 11px;
            margin-bottom: 11px;
        }
    }
</style>
<style lang="scss">
    .receiverUpdate {
        .weui-input {
            font-size: 28px!important;
        }
        .weui-cell {
            padding: 25px 0!important;
            font-size: 28px;
            color: #d6dae2;
            border-bottom: 1px solid #898a8c;
        }
        .vux-input-icon.weui-icon-warn:before,
        .vux-input-icon.weui-icon-success:before {
            font-size: 28px;
        }
        .weui-icon-warn {
            font-size: 28px;
            color: #ffcb16!important;
        }
        .vux-flexbox {
            font-size: 38px!important;
        }
        .weui-cell_access {
            color: #d6dae2!important;
        }
        .weui-textarea {
            background: transparent;
        }
        .weui-cell:before {
            border-top: 0!important;
        }
        .vux-cell-box:not(:first-child):before {
            border-top: 0!important;
        }
        button.weui-btn,
        input.weui-btn {
            margin-top: 219px;
            height: 78px;
            background-color: #ffcb16;
            box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.04);
            font-size: 32px;
            color: #333;
            letter-spacing: 5px;
        }
        .weui-btn_primary:not(.weui-btn_disabled):active {
            color: rgba(255, 255, 255, 0.6)!important;
            background-color: #fcc400!important;
        }
    }
</style>



