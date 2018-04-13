<template>
    <div class="messageDetail">
         <Header title="消息详情" :isShow="true"></Header>
        <ul class="messList">
            <li>
                <div class="listHeader">
                    <router-link to="./messageDetail">
                        <span>2018.04.03<span>充值提醒</span></span>
                    </router-link>
                </div>
                <div class="listContent">
                    大家我二姐佛i加多少积分发 的剑法开发接口撒地方就爱上了对方就 地方静安寺附近阿里山扩大飞机啊可是大家
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import Header from '../common/Header'
    import {
        XHeader
    } from 'vux'
    export default {
        name: "messageDetail",
        components: {
            Header
        },
        data() {
            return {};
        }
    };
</script>

<style scoped lang="scss">
    .messageDetail {
        background-color: #23262b;
        height: 100%;
        .messList {
            li {
                color: #fff;
                font-size: 30px;
                padding-left: 23px;
                background: #2a2d36;
                margin-bottom: 26px;
                .listHeader {
                    height: 93px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    border-bottom: 2px solid #323540;
                    span span {
                        margin-left: 27px;
                    }
                }
                .listContent {
                    padding: 28px 35px 28px 0;
                }
            }
            li:last-child {
                margin: 0;
            }
        }
    }
</style>



