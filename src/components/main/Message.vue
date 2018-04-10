<template>
    <div class="message">
        <x-header :left-options="{backText: ''}">消息清单</x-header>
        <ul class="messList">
            <li>
                <router-link to="./messageDetail">
                    <span>2018.04.03<span>充值提醒</span></span>
                </router-link>
            </li>
            <li>
                <span>2018.04.03<span>充值提醒</span></span>
            </li>
        </ul>
    </div>
</template>
<script>
    import '../../style/header.scss';
    import {
        XHeader
    } from 'vux'
    export default {
        name: "Message",
        components: {
            XHeader
        },
        data() {
            return {};
        },
        mounted() {
            
        }
    };
</script>
<style lang="scss" scoped>
    .message {
        background-color: #23262b;
        height: 100%;
        .messList {
            li {
                height: 93px;
                border-bottom: 2px solid #323540;
                margin-bottom: 26px;
                color: #fff;
                font-size: 30px;
                padding-left: 23px;
                background: #2a2d36;
                display: flex;
                justify-content: center;
                flex-direction: column;
                span span {
                    margin-left: 27px;
                }
            }
            li:first-child a:link{
                color: #ffcb16;
            }
            li a:visited{
                color:#fff;
            }
            li:last-child {
                margin: 0;
            }
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




