<template>
            <transition name="dialog">
        <div class="model-container"
            @click="containerClose"
            :style="{
                'z-index': zIndex
            }">
                <div class="dialog-box"
                @click.stop
                :class="{large: large, normal: normal}"
                >
                    <div class="dialog-header">
                        <slot name="header">{{header}}</slot>
                        <span class="dialog-setwin">
                            <a href="javascript:;" class="dialog-icon" @click="close">&times;</a>
                        </span>
                    </div>

                    <div class="dialog-main">
                        <slot>暂时没有什么东西</slot>
                    </div>

                    <div class="dialog-footer">
                        <slot name="footer">
                            <a href="javascript:;" class="dialog-submit">
                                提交
                            </a>
                        </slot>
                    </div>
                </div>
        </div>
                    </transition>
</template>
<script>
let count = 0;
    export default {
        data() {
            return {
                count,
                zIndex: count + 1000
            }
        },
        props: {
            header: {
                type: String
            },
            large: {
                type: Boolean
            },
            normal: {
                type: Boolean
            },
            model: {
                type: Boolean
            }
        },
        methods: {
            close() {
                this.$emit('dialogClose')
            },
            containerClose() {
                if(!this.model){
                    this.close();
                }
            }
        },
        mounted() {
            count ++
        },
        destroyed() {
            count --
        }
    }
</script>
<style lang="" scoped>
    a, a:visited {
        color: #333;
        text-decoration: none;
    }
    .model-container {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .3);
    }



    .dialog-enter-active, .dialog-leave-active {
        transition: opacity .2s;
    }
    .dialog-enter, .dialog-leave-active {
        opactiy: 0;
    }

    .dialog-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
    }

    .dialog-box.large {
        width: 800px;
    }

    .dialog-box.normal {
        width: 400px;
    }

    .dialog-header {
        position: relative;
        padding: 0 80px 0 20px;
        height: 42px;
        border: 1px solid #ccc;
        font-size: 14px;
        line-height: 42px;
        color: #333;
        overflow: hidden;
        background-color: #f8f8f8;
        border-radius: 2px 2px 0 0;
        text-align: left;
    }

    .dialog-setwin {
        position: absolute;
        right: 15px;
        top: 15px;
        width: 20px;
        height: 20px;
        font-size: 0;
        line-height: initial;
    }

    .dialog-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        margin-left: 10px;
        font-size: 20px;
        cursor: pointer;
    }

    .dialog-icon:hover {
        opacity: .8;
    }

    .dialog-main {
        width: 100%;
        min-height: 150px;
        background-color: #fff;
    }

    .dialog-footer {
        padding: 10px 10px 12px;
        text-align: right;
        background-color: #f8f8f8;
    }

    .dialog-submit {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        padding: 0 15px;
        border: 1px solid #dedede;
        border-radius: 2px;
        cursor: pointer;
        text-decoration: none;
        background-color: silver;
        color: #333;
        font-size: 14px;
    }

    .dialog-submit:hover {
        opacity: .8;
    }

    @keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
    }
    @keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(0);
    }
    }

</style>