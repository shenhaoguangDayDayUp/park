<template>
    <div class="message">
        <Header title="消息清单" :isShow="true"></Header>
        <ul class="messList">
            <li v-for="v in 20">
                <router-link to="./messageDetail">
                    <span>2018.04.03<span>充值提醒</span></span>
                </router-link>
            </li>
            <li>
                <span>2018.04.03<span>充值提醒</span></span>
            </li>
        </ul>
          <load-more v-if='loading' :tip="'正在加载'"></load-more>
    </div>
</template>
<script>
    import Header from '../common/Header'
    import {
        LoadMore
    } from 'vux'
    export default {
        name: "Message",
        components: {
            Header,
            LoadMore
        },
        data() {
            return {
                loading:false
            };
        },
        methods: {
            loadMore() {
                this.loading = true
                console.log(13131);
            },
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
            li:first-child a:link {
                color: #ffcb16;
            }
            li a:visited {
                color: #fff;
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




