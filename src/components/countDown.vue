<template>
    <div>{{day}}-{{padding(hour)}}-{{padding(min)}}-{{padding(sec)}}</div>
</template>
<script>
    var sInOneDay = 60*60*24;
    var sInOneHour = 60*60;
    var sInOneMin = 60;
    const padding = (str, length =2, char = '0') => `${new Array(length).join(char)}${str}`.slice(-length)
    export default {
        props: {
            least: {
                require: true
            }
        },
        data() {
            return {
                leasted: '',
                leastMock: ''
            }
        },
        computed: {
            day() {
                if(this.least<=0){
                    return 0
                }
                return Math.floor(this.leasted/sInOneDay)
            },
            hour() {
                if(this.least<=0){
                    return 0
                }
                return Math.floor((this.leasted%sInOneDay)/sInOneHour)
            },
            min() {
                if(this.least<=0){
                    return 0
                }
                return Math.floor((this.leasted%sInOneHour)/sInOneMin)
            },
            sec() {
                if(this.least<=0){
                    return 0
                }
                return Math.floor(this.leasted%sInOneMin)
            }
        },
        mounted() {
        },
        created() {
            let least = this.least;
            window.setInterval(() => {
                // var now = new Date().getTime()
                
                this.leasted = Math.floor((least - 1000)/1000)
                least -= 1000
            },1000)
        },
        methods: {
            padding
        }
    }
</script>