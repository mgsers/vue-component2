<template>
    <div class="banner">
        <div class="slider-wrap">
            <ul
                class="slider-items"
                :style="[sliderActive,{'width':sliderImg.length*400+'px'}]" >
                <li
                    class="slider-item"
                    v-for="(item, index) in sliderImg"
                    :style="{'background-color': item.color}">
                </li>
            </ul>
        </div>
         <ul class="banner-page">
            <li class="slider-btn"
                v-for="(item, index) in list.msg"
                :class="{'active':index == now}"></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'banner',
        data() {
            return {
                list: {
                    code: 0,
                    msg: [{
                        name: 'one',
                        color: 'red'
                    },{
                        name: 'two',
                        color: 'silver'
                    },{
                        name: 'three',
                        color: 'blue'
                    },{
                        name: 'four',
                        color: '#000'
                    },{
                        name: 'five',
                        color: 'green'
                    }]
                },
                sliderActive : {
                    transform: 'translate3d(-400px,0,0)',
                    transition:'transform 2s'
                },
                interTimer: '',
                now: 0
            }
        },
        computed: {
            sliderImg() {
                const [...saveImg] = this.list.msg,
                [imgFirst,...other] = this.list.msg;
                saveImg.unshift(other[other.length-1])
                saveImg.push(imgFirst)

                return saveImg
            },
            color() {

            }
        },
        mounted() {
            console.log(this.color);
            this.interTimer = setInterval(()=>{
                this.start()
            },3000)
        },
        methods: {
            start() {
                this.now ++
                this.now %= this.sliderImg.length
                if(this.now == this.list.msg.length){
                    setTimeout(()=>{
                        this.sliderActive = {
                        transform: `translate3d(-400px,0,0)`
                        }
                        this.now = 0
                    },500)
                }

                if (this.nowSlider === -1) {  //向右滑动到最小值时，将位置置为最大值
                    setTimeout(() => {
                            this.now = this.bannerlist.length-1
                            this.sliderActive = {
                                transform: `translate3d(${-400*(this.now+1)}px,0,0)`
                            }
                    }, 500)       
                    }
                    this.sliderActive = Object.assign({},{
                        transition: 'transform 0.5s',
                        transform: `translate3d(${-400*(this.now+1)}px,0,0)`
                    })
            }
        }
    }
</script>
<style>
    ul {
        padding: 0;
        margin: 0;
    }
    li{
        list-style: none;
    }
    .banner {
        position: relative;
        width: 400px;
        height: 200px;
    }
    .banner-page{
   position:absolute;
   bottom:1rem;
   justify-content:center;
   display: flex;
   align-items:center;
   width:100%;
}
.slider-btn{
    width:0.8rem;
    height:0.8rem;
    background-color:#aaa;
    border-radius: 50%;
    margin-right:0.5rem;
}
.slider-btn.active{
    background:red;
}
    .slider-wrap {
        overflow: hidden;
    }
    .slider-items{
        font-size:0;
        overflow: hidden;
    }
    .slider-item {
        width: 400px;
        float: left;
        height: 200px;
    }
    .slider-btn{
    width:0.8rem;
    height:0.8rem;
    background-color:#aaa;
    border-radius: 50%;
    margin-right:0.5rem;
}
</style>