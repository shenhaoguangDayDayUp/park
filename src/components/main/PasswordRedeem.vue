<template>
    <div class="payoutpassword">
        <Header title="设定支付密码" :isShow="true"></Header>
        <div class="container">
            <div class="item" v-for="i in 6">{{numbers[i-1]}}</div>
            <input v-model="numbers" maxlength="6" type="number" autofocus="autofocus" @click="num" />
        </div>
        <submit text="下一步" :disabled="submitBtnDisabled" @click.native="next()"></submit>
    </div>
</template>

<script>
    import Header from "@/components/common/Header.vue";
    import Submit from "@/components/common/Button.vue";
    export default {
        name: "PasswordRedeem",
        data() {
            return {
                numbers: '',
            };
        },
        watch: {},
        computed: {
            submitBtnDisabled(){
                console.log(this.numbers.length)
                if(this.numbers.length == 6) return false;
                return true;
            }
        },
        mounted() {},
        methods: {
            num() {
                // console.log(1)
                var that = this;
                var keyboard = null;
                keyboard = new JKeyboard({
                    onInput(key, rs) {
                        that.numbers = rs;
                    },
                    onClose() {
                        // clearInterval(pointerTimer);
                        // pointer.classList.add('hide');
                        console.log('onclose')
                        keyboard.close();
                    },
                    onClosed() {
                        console.log('onclosed');
                        keyboard.close();
                    },
                    onShow() {
                        // pointer.classList.remove('hide');
                    },
                    onDelete(rs) {
                        console.log(rs)
                        that.numbers = rs;
                    }
                });
                keyboard.show();
            },
            next(){

            }
        },
        components: {
            Header,
            Submit
        },
    };
</script>
<style lang="scss" scoped>
    .payoutpassword {
        background-color: #23262b;
        color: #fff;
        height: 100%;
        width: 100%;
        padding-top: 94px;
        background-size: cover;
        padding-top: 94px; // overflow: auto;
        .container {
            position: relative;
            margin: auto;
            height: 80px;
            width: 480px;
            display: flex;
            border: 1px solid #fff;
        }
        .item {
            flex-basis: 25%;
            font-size: 40px;
            text-align: center;
            line-height: 80px;
        }
        .item:not(:last-of-type) {
            border-right: 1px solid #fff;
        }
        input {
            position: absolute;
            height: 80px;
            opacity: 0;
            left: 0;
            width: 100%;
            color: transparent;
        }
    }
</style>

