<template>
    <button :style="buttonStyle" class="btn" :class="classes" :disabled="disabled" :gradients="gradients">
    <slot>{{ text }}</slot>
    </button>
</template>

<script>
    export default {
        name: 'submit',
        props: {
            disabled: Boolean,
            mini: Boolean,
            plain: Boolean,
            text: String,
            actionType: String,
            gradients: { //按钮的渐变色
                type: Array,
                validator: function(val) {
                    return val.length === 2
                }
            }
        },
        computed: {
            noBorder() {
                return Array.isArray(this.gradients)
            },
            buttonStyle() {
                if (this.gradients) {
                    return {
                        background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
                        color: '#FFFFFF'
                    }
                }
            },
            classes() {
                return [{
                        'btn_disabled': !this.plain && this.disabled,
                        'btn_plain-disabled': this.plain && this.disabled,
                        'btn_mini': this.mini,
                        'vux-x-button-no-border': this.noBorder
                    }, !this.plain ? `btn_${this.type}` : '',
                    this.plain ? `btn_plain-${this.type}` : '',
                    this.showLoading ? `btn_loading` : ''
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    button {
        background: #ffcb16;
        // box-shadow: 0 2px 6px 0 rgba(0, 32, 99, 0.4);
        color: #000;
        height: 78px;
        width: 590px;
        line-height: 78px;
        letter-spacing: 5px;
        font-size: 31px;
        border-radius: 8px;
        margin-top: 43px;
    }
    button:disabled{
        background: #666;
        color: #000;
        height: 78px;
        width: 590px;
        line-height: 78px;
        letter-spacing: 5px;
        font-size: 31px;
        border-radius: 8px;
        margin-top: 43px;
    }
    button:active {
        background: linear-gradient(90deg, rgb(255, 203, 22), rgb(250, 238, 196));
    }
</style>


