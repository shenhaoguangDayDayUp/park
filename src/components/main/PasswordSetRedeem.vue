<template>
    <div class="payoutpassword">
        <Header title="设定兑换密码" :isShow="true"></Header>
        {{pwdinput}}
        <div class="slide_son content">
            <ul class="normalLogin">
                <li>
                    <i class="isTip ispwd" v-show='judgePwd'><img src="@/assets/img/tishi@2x.png">请输入6-20位字母数字及非空字符</i>
                    <input ref="normalPwd" v-model="normalPwd" @blur="blurPwd()" placeholder="登录密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(0,20)" maxlength="20">
                </li>
            </ul>
            <submit text="下一步" :disabled="submitBtnDisabled" @click.native="next()"></submit>
        </div>
         <KeyBord ref="pay"
         payTitle="请设置兑换密码"
        :is-pay='isPay'
        @pas-end='pasEnd'
        v-model="pwdinput"
        @close='isPay=false'></KeyBord>
    </div>
</template>

<script>
    import Header from "@/components/common/Header.vue";
    import Submit from "@/components/common/Button.vue";
    import KeyBord from "@/common/KeyBord";
    import {
        user
    } from '@/logic'
    import {
        loginApi,
    } from '@/api/api';
    export default {
        name: "PayoutPassword",
        data() {
            return {
                normalPwd: '',
                numbers: '',
                isPay:false,
                pwdinput:''
            };
        },
        watch:{
            // judgePwd:
        },
        computed: {
            submitBtnDisabled() {
                if(this.isPwd(this.normalPwd)) return false;
                return true;
            },
            judgePwd(){
                if(this.isPwd(this.normalPwd) || this.normalPwd == '') return false;
                return true;
            }
        },
        methods: {
            isPwd(pwd) {
                var patrn = /^[a-zA-Z0-9]\w{6,20}$/ 
                if (!patrn.exec(pwd)) return false;
                return true;
            },
            blurPwd(){
                if(!this.isPwd(this.normalPwd)){
                    this.judgePwd = true;
                }
            },
            next(){
                this.isPay = true;
            },
            pasEnd(){
                // console.log(this.pwdinput)
                // console.log(this.$refs.pay) //获取子组件的data
                // this.$refs.pay.lodingShow = false;
            },
        },
        components: {
            Header,
            Submit,
            KeyBord
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../style/myform.scss';
    .payoutpassword {
        background-color: #23262b;
        color: #fff;
        height: 100%;
        width: 100%;
        padding-top: 94px;
        background-size: cover;
        padding-top: 94px; // overflow: auto;
    }
</style>

