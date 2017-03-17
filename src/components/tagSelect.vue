<template>
    <div 
        class="tag-input-container"
        tabindex="-1"
        @keyup.up="up"
        @keyup.down="down"
        @keyup.enter.prevent="select"
        @focus="onFocus">
        <div
            class="tag-input-tag"
            v-for="(item, index) in tagList"
            >
            {{ item }}
        </div>
        <input 
            type="text"
            @input="input"
            v-model="keyword"
            ref="input"
            :style="'width:' + (inputVal.length+1) + 'em'">
        <ul class="tag-ul">
            <li 
                v-for="(item, index) in items"
                @click="selectItem(index)"
                :class="{active: current === index}">{{item[tagkey]}}</li>
        </ul>
    </div>
</template>
<script>

    var inArray = (item, arr) =>{return arr.indexOf(item) !== -1}
    export default {
        name: 'tagSelect',
        props: {
            value: {
                type: Array,
                require: true
            },
            getItem: {
                type: Function,
                require: true
            },
            tagkey: {
                type: String,
                default: 'name'
            }
        },
        data() {
            return {
                keyword: '',
                items: [],
                inputVal: '',
                current: 0,
                preVal: '',
                prevInputVal: '',
                timers: [],
                lastRequestTime: new Date().getTime()
            }
        },
        watch: {
            keyword(v,oldv) {
                this.preVal = oldv

                if(!this.searching){
                    this.preVal = ''
                }
                if(!v) {
                    this.items = [];
                    return;
                }
                var now = new Date().getTime()
                var delay = 300
                var vm = this
                var timer = setTimeout(function(){
                    vm.search()
                },delay+10)
                this.timers.push(timer)

                if(now - this.lastRequestTime > delay){
                    this.lastRequestTime = now
                    this.search()
                    this.timers.forEach(function(timer){
                        clearTimeout(timer)
                    })
                    this.timers = []
                }else {
                    this.timers.slice(0,-1).forEach(function(timer){
                        clearTimeout(timer)
                    })
                    this.timers = this.timers.slice(-1)
                }
            }
        },
        computed: {
            tagList() {
                var tagkey = this.tagkey;
                return this.value.map((item)=>item[tagkey])
            },
            inputVal(v,oldv) {
                this.prevInputVal = oldv;
            }
        },
        methods: {
            up() {
                this.current = (this.current - 1 + this.items.length) % this.items.length
            },
            down() {
                this.current = (this.current + 1)% this.items.length
            },
            inArray,
            select() {
                var item = this.items[this.current];
                
                if(item && !this.inArray(item, this.value)){
                    this.value.push(item)
                    
                }

                this.keyword = ''
                this.current = 0
                this.items = []
            },
            selectItem(index) {
                this.current = index;
                this.select()
                
            },
            onFocus() {
                this.$refs.input.focus()   
            },
            input(e) {
                this.inputVal = e.target.value
            },
            search() {
                var vm = this;
                this.getItem()
                .then(function(item){
                    vm.items = item
                })
                .catch(function(err){
                    console.log(err)
                })

                // this.$nextTick(()=>console.log(this.items))
            }
        }
    }
</script>
<style>
    .tag-input-container {
        position: relative;
        padding: 0 5px 3px 5px;
        width: 200px;
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
    }
    .tag-input-container:after {
        content: '';
        display: block;
        clear: both;
    }
    .tag-input-container:focus {
        outline: none;
    }
    .tag-input-tag {
        float: left;
        position: relative;
        box-sizing: border-box;
        border-radius: 4px;
        line-height: 20px;
        padding: 0 20px 0 10px;
        margin-bottom: 5px;
        margin-right: 4px;
        font-size: 14px;
        background-color: #f3f3f3;
        overflow: hidden;
    }
    .tag-input-container input {
        float: left;
        border: none;
        outline: none;
        line-height: 20px;
        height: 20px;
        padding: 0;
        min-width: 1em;
        font-size: 14px;
    }
    .tag-ul {
        margin: 2px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        max-height: 300px;
    }
    .tag-ul li {
        padding: 5px 10px;
    }
    .tag-ul li:hover {
        background-color: #eee;
    }
    .tag-ul li.active {
        background-color: #eee;
    }
</style>