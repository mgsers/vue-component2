<template>
  <div id="app">
       
        <count-down :least="least"></count-down>

        <span class="fontStyle">这是测试</span>

        <textarea :value="input" @input="update"></textarea>
        <div v-html="compiledMarkdown"></div>

    <app-select
    :select-data="source"
    @selectedData='selectedE'>
    </app-select>
    <tag-input
    :ipt-data="source"
    @iptData='iptE'
    >
    </tag-input>
    <select-box v-model="selectData">
    </select-box>
    <div
    class=""
    style="border: 1px solid #ccc"
    @focus="onFocus"
    @blur="onBlur"
    tabindex="-1"
    >
      测试sss
      <input v-focus type="text" ref="input" name="" value="">
    </div>

    {{ messages.split('\n') }}
    <br /><br /><br />

    <br /><br /><br />

    <div v-outSideClose="close">
      <button @click="show = !show">haha</button>
      <div v-show="show">
      hahahah
      </div>
    </div>

    <div id="demo">
      <button v-on:click="show2 = !show2">
        model
      </button>
      <transition name="bounce" mode="out-in">
        <div v-if="show2" style="width:200px;height:100px;background:red;">hello</div>
      </transition>
    </div>
    <div class="model-box">
      <span class="model-span" @click="modelShow = !modelShow">model</span>
    </div>
<!-- 3d banner -->
    <div class="banner">
      <div class="bg">
        <span class="img a"></span>
        <span class="text b">以傲慢与偏执<br/>回敬傲慢与偏见</span>
        <span class="copyright c">code by qingjin.me | picture from t.tt</span>
      </div>
    </div>  


  


  



    <br /><br /><br />
    view: {{ $store.getters.done }}
    {{ $store.state.count }}
      <button @click="increment($event.target)">increment</button>

      <tag-select v-model="tags" :get-item="getItems"></tag-select>

    <model v-if="modelShow" @dialogClose="dialogClose" :normal="true" :model="false">
      <span slot="header">这是slot标题</span>
      <p>这是一个弹窗，很好看的弹窗</p>
      <a href="javascript:;" @click="modelShow2 = !modelShow2">
        this is another model btn
      </a>
      <span slot="footer"><a>提交</a></span>
    </model>

    <model v-if="modelShow2" :large="true" @dialogClose="dialogClose2">
    
    </model>
  </div>
</template>

<script>
import appSelect from './components/select'
import tagInput from './components/tagInput'
import selectBox from './components/selectBox'
import tagSelect from './components/tagSelect'
import model from './components/model'
import range from './utils/range'
// import datePicker from './components/date-picker'
import {sort, randomItem} from './utils/array-random'

import aa from './utils/array-random'

import randomNum from './utils/random-number.js'
// import {getbanner, getRank, fcg} from './apis/url.js'
import {getbanner, getRank, fcg} from 'URLS'
import datePicker from './components/date-picker'
import routerMap from './components/router'

import countDown from './components/countDown'
import $ from 'jquery'

// function MusicJsonCallback (data) {
//   console.log('data is :', data)
// }

// window['MusicJsonCallback'] = function(res){
//         console.log('--------------',res)
//     }


export default {
  name: 'app',
  components: {
    appSelect,
    tagInput,
    selectBox,
    model,
    tagSelect,
    routerMap,
    countDown
    // datePicker
  },
  data () {
    return {
      source: [{name: 'aa',checked: false,allow: true},
               {name: 'bb',checked: true,allow: true},
               {name: 'cc',checked: false,allow: false},
               {name: 'dd',checked: false,allow: true}],
      selectData: 2,
      messages: "回答会i哎'\n'andnsafahfhi",
      eee: 'ggg',
      show: false,
      show2: true,
      modelShow: false,
      modelShow2: false,
      // tag
      tags: [{name:'hehe'}],
      arrayS: [1,2,3,4,5,6],
      input: 'ssss'
    }
  },
  computed: {
          compiledMarkdown: function () {
            return marked(this.input, { sanitize: true })
          },
          least() {
            return new Date('Mar 25 2017') - new Date()
            // return new Date('Mar 25 2017')
          }
        },
  watch: {
    selectData(v){
      // console.log('22222')
      // console.log(v)
      // console.log(window.location)
      // window.location.href = 'www.baidu.com'
    }
  },
  mounted() {
// mock数据获取
      $.ajax({
        url: 'DataServer/article/getArticle/0/2',
        type: 'get',
        data: {reqParam:1},
        success: function (data) {
          // console.log(data)
        }
      })


      // console.log(this.least)
      fcg([],{
        callback:'MusicJsonCallback'
      })
      .then((res)=>{
        // eval(res)
       console.log(res)
      })
      .catch(error => console.log(error))

      // getbanner()
      // .then((res)=>{
      //   console.log(res)
      // })
      // .catch(error => console.log(error)) 

      // getRank()
      // .then((res)=>{
      //   console.log(res)
      // })
      // .catch(error => console.log(error))
      // console.log(this._data)

  },
  methods: {
    update: _.debounce(function (e) {
            this.input = e.target.value
          }, 300),
    aa,
    sort,
    randomItem,
    randomNum,
    getItems() {
      return new Promise((resolve,reject)=>{
        resolve([{name: 'haha'},{name:'hehe'},{name:'dddd'},{name:'cccc'}])
      })
    },
    increment(e) {
      this.$store.dispatch('incrementAsync',e)
      // this.$store.commit('increment',e)
    },
    range,
    dialogClose() {
      this.modelShow = false;
    },
    dialogClose2() {
      this.modelShow2 = false;
    },
    close() {
      this.show = false
      this.onBlur()
    },
    onBlur() {
      // console.log('blur')
    },
    selectedE (v) {
      // console.log(v);
    },
    iptE (v) {
      // console.log(v);
    },
    onFocus (){
      // this.$refs.input.focus()
      // console.log('success');
    }
  }
}
</script>

<style scoped>
.fontStyle {
    font-family: myStyle;
}

@font-face {
    font-family: 'myStyle';
    src: local("微软雅黑"), local("Helvetica Neue Light"),  local("PingFang SC"), local("Microsoft YaHei"), local(sans-serif);
    font-weight: 800;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.god-enter-active, .god-leave-active {
  transition: all .5s ease-in;
}
.god-enter, .god-leave-active {
  opacity: 0;
  transform: translateX(100px);
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
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

.model-box {
  width: 800px;
  height: 300px;
  background-color: #f1f1f1;
  border: 1px solid #eee;
}

.model-span {
  display: inline-block;
  width: 100px;
  height: 30px;
  background-color: #ccc;
  line-height: 30px;
  color: #fff;
  cursor: pointer;
}
html, body, #editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}

* {
  font-family: "Microsoft YaHei";
  transition: all .3s;
  -webkit-transition: all .3s;
  transition-timing-function: linear;
  -webkit-transition-timing-function: linear;
}

.banner {
  perspective: 800px;
}

.bg {
  position: relative;
  width: 600px;
  height: 300px;
  margin: 100px auto;
  background: url("http://static.smartisanos.cn/index/img/store/home/banner-3d-item-1-box-1_61bdc2f4f9.png") center no-repeat;
  background-size:100% 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  -webkit-transform-origin: 50% 50%;
  -webkit-transform: rotateY(0deg) rotateX(0deg);
}
.img{
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 8px;
  left: 0;
  background: url("http://static.smartisanos.cn/index/img/store/home/banner-3d-item-1-box-3_8fa7866d59.png") center no-repeat;
  background-size:95% 100%;
}
.text{
  position: absolute;
  top:20%;
  right:10%;
  font-size:30px;
  color:#fff;
  text-align:right;
  font-weight:lighter;
}
.copyright{
  position: absolute;
  bottom:10%;
  right:10%;
  font-size:10px;
  color:#fff;
  text-align:right;
  font-weight:lighter;
}
.a {
  -webkit-transform: translateZ(40px);
}
.b {
  -webkit-transform: translateZ(20px);
}
.c {
  -webkit-transform: translateZ(0px);
}
</style>
