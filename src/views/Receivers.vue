<template>
    <div class="receivers">
        <!-- <div class="close">
                            <router-link to="/"><img src="../assets/img/close.png"></router-link>
                        </div> -->
        <div class="receiversTitle">编辑收货地址</div>
        <div class="addrForm">
            <x-input name="username" placeholder="请输入姓名" is-type="china-name" :show-clear="false"></x-input>
            <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :show-clear="false"></x-input>
            <!-- 收货地址开始 -->
            <x-address :title="title" :list="addressData" placeholder="点击选择" v-model="areaValue">
                <template slot="title" slot-scope="props">
                </template>
                </x-address>
            <!-- 收货地址结束 -->
                <x-textarea :max="200" name="detail" placeholder="街道" :show-counter="false"></x-textarea>
                <x-button type="primary">保存</x-button>
        </div>
        {{areaValue}}
    </div>
</template>
<script>
    import {
        XInput,
        XAddress,
        ChinaAddressV4Data,
        XTextarea,
        Group,
        XButton
    } from 'vux';
    export default {
        name: "Receivers",
        components: {
            XInput,
            XAddress,
            XTextarea,
            Group,
            XButton
        },
        data() {
            return {
                addressData: ChinaAddressV4Data,
                title: '请选择收货地址',
                areaValue: ['110000','110100','110101'],
            };
        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>
    .receivers {
        background-color: #23262b;
        height: 100%;
        color:#fff;
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
    .receiversTitle {
        font-size: 34px;
        color: #fff;
        text-align: center;
        padding: 26px 0 0 0;
    }
</style>
<style>
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
    button.weui-btn, input.weui-btn{
        margin-top:219px;
        height:78px;
        background-color: #ffcb16;
	box-shadow: 0px 4px 3px 0px 
        rgba(0, 0, 0, 0.04);
        font-size: 32px;
        color:#333;
        letter-spacing: 5px;
    }
    .weui-btn_primary:not(.weui-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6)!important;
    background-color: #fcc400!important;
    }
</style>



