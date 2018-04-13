<template>
    <div class="rename">
        <x-header :left-options="{backText: ''}">修改用户昵称</x-header>
        <x-input title="" placeholder="" :min="2" :max="20" :value="name" :icon-type="iconType"></x-input>
        <!-- 报错信息 -->
        <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
        </div>
        <!-- 按钮 -->
        <div class="btn">
            <div class="redBtn active" @click=register()>
                立&nbsp;即&nbsp;修&nbsp;改
            </div>
        </div>
    </div>
</template>
<script>
    import '../../style/btn.scss';
    import '../../style/isError.scss';
    import '../../style/header.scss';
    import {
        XHeader,
        XInput
    } from 'vux'
    export default {
        name: 'Rename',
        components: {
            XHeader,
            XInput,
        },
        data() {
            return {
                isError: '',
                name: this.$route.query.name,
                iconType: '',
            }
        },
        mounted() {
            console.log(this.$route.query.name)
        },
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



