<template>
    <div class="message">
        <Header title="消息清单" :isShow="true"></Header>
        <ul class="messList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="(v,i) in msgsList" :key="i" >
                <router-link :to="{name:'MessageDetail',query: {id: v.code}}" v-if = (!v.readAt) style="color:#fff;">
                    <span>{{v.sendAt}}<span>{{v.title}}</span></span>
                </router-link>
                <router-link :to="{name:'MessageDetail',query: {id: v.code}}" style="color:#ffcb16;"  v-else>
                    <span>{{v.sendAt}}<span>{{v.title}}</span></span>
                </router-link>
            </li>
            <load-more v-if='loading' :tip="'正在加载'"></load-more>
            <divider v-if='noMoreData'>没有更多消息了</divider>
        </ul>
    </div>
</template>
<script>
    import Header from '../common/Header'
    import {
        InfiniteScroll
    } from "mint-ui";
    import Vue from 'vue';
    Vue.use(InfiniteScroll); // 使用Vue的分页
    import {
        getMsgApi
    } from "@/api/api";
    import {
        LoadMore,
        Divider
    } from 'vux'
    export default {
        name: "Message",
        data() {
            return {
                loading: false,
                msgsList: [],
                count: 0,
                page: 1,
                noMoreData: false,
            };
        },
        mounted() {
            this.list();
        },
        methods: {
            list() {
                this.loading = true;
                const TOKEN = sessionStorage.getItem('TOKEN');
                getMsgApi.msgList({
                    id: this.page
                }, {
                    data: {},
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    this.loading = false;
                    const {
                        data
                    } = res;
                    for (let index = 0; index < data.records.length; index++) {
                        data.records[index].sendAt = this.timeStamp(data.records[index].sendAt)
                        const element = data.records[index];
                        this.msgsList.push(element);
                    }
                    this.count = data.count;
                }).catch(error => {})
            },
            loadMore() {
                if (this.msgsList.length >= this.count) { //当拉到底的时候
                    this.loading = false;
                    this.noMoreData = true;
                    return;
                }
                this.page += 1;
                this.list();
            },
            timeStamp(t) {
                var date = new Date(t);
                const Y = date.getFullYear() + '-';
                const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                const D = date.getDate() + ' ';
                const h = date.getHours() + ':';
                const m = date.getMinutes() + ':';
                const s = date.getSeconds();
                return (Y + M + D + h + m + s);
            }
        },
        components: {
            Header,
            LoadMore,
            loading: false,
            Divider
        },
        directives: {
            InfiniteScroll
        }
    };
</script>
<style lang="scss" scoped>
    .message {
        background-color: #23262b;
        height: 100%;
        .messList {
            margin-bottom: 98px;
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
            // li:first-child a:link {
            //     color: #ffcb16;
            // }
            // li a:visited {
            //     color: #fff;
            // }
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
<style lang="scss">
.vux-loadmore>.weui-loadmore__tips{
    color:#fff;
}
</style>





