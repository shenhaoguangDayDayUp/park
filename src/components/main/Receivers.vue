<template>
    <div class="receivers">
        <x-header :left-options="{backText: ''}">收货地址</x-header>
        <ul class="receiversList">
            <li>
                <div class="receiversMsg">
                    <div class="MsgTop">
                        <span>张三</span>
                        <span>13830082550</span>
                    </div>
                    <div class="MsgBottom">
                        贷记卡JFK打扫房间贷记卡时间flak上的飞机设计的疯狂撒djdjak大家坷拉激发拉开圣诞节放假地方
                    </div>
                </div>
                <div class="receiversUpdate">
                    <span><check-icon :value.sync="checker"> 默认操作</check-icon></span>
                    <span><img src="../../assets/img/edit.png" alt="">编辑</span>
                    <span><img src="../../assets/img/delete.png" alt="">删除</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import '../../style/header.scss';
    import {
        XHeader,
        CheckIcon
    } from 'vux';
    export default {
        name: "Receivers",
        components: {
            XHeader,
            CheckIcon
        },
        data() {
            return {
                checker: true,
            };
        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>
    .receivers {
        background-color: #23262b;
        height: 100%;
        color: #fff;
        .receiversList {
            li {
                height: 288px;
                padding: 23px;
                background: #2a2d36;
                font-size: 30px;
                margin-bottom:20px;
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
                .receiversUpdate {}
            }
            
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
        .vux-check-icon > span{
            color:#fff;
        }
        .weui-icon-circle{
            font-size: 28px;
            color:#ffcb16;
        }
    }
</style>



