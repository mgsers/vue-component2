<template>
  <div id="app">
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
      测试box
      <input v-focus type="text" ref="input" name="" value="">
    </div>
    {{ messages.split('\n') }}
    <br /><br /><br />
    {{ range(10,1) }}
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

    <date-picker></date-picker>


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
import datePicker from './components/date-picker'


export default {
  name: 'app',
  components: {
    appSelect,
    tagInput,
    selectBox,
    model,
    tagSelect,
    datePicker
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
      tags: [{name:'hehe'}]
    }
  },
  watch: {
    selectData(v){
      console.log(v)
    }
  },
  methods: {
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
      console.log('blur')
    },
    selectedE (v) {
      console.log(v);
    },
    iptE (v) {
      console.log(v);
    },
    onFocus (){
      // this.$refs.input.focus()
      console.log('success');
    }
  }
}
</script>

<style scoped>
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
</style>
