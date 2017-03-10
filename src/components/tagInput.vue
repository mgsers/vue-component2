<template>


  <div class="">
    <div
    class="tag-box clearfix"
    :class="{active:isShow}"
    @click="selectOn()"
    >
      <ul>
        <li
        class="tag-item"
        v-for="item in selectName"
        >
        {{ item }}
        <span
        class="close"
        @click.preventDefault.stop="remove(item)">
        x
        </span>
        </li>
        <li class="tag-ipt">
          <div class="tag-ipt-box">
            <input
            type="text"
            class="tag-input"
            ref="ipt"
            @blur="selectOff()"
            v-model="iptKey"
            >
          </div>
        </li>
      </ul>
    </div>
    <ul class="select-ul" v-if="isShow">
      <li
      v-if="filterUser.length"
      v-for="user in filterUser"
      @click="choose(user)">
      {{ user.name }}
      </li>
      <li v-if="!filterUser.length">找不到</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tagInput',
  props: {
    iptData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShow: false,
      selectName: [],
      iptKey: '',
      onBlur: false,
      key: 0,
      item: [1,2,3,4,5]
    }
  },
  computed: {
    filterUser () {
      var self = this
      return self.iptData.filter((user) => {
        return user.name.indexOf(self.iptKey) !== -1
      })
    }
  },
  mounted () {
    if(!localStorage.aa){
      localStorage.aa = 1
    }
    this.iptData.forEach((i,idx) => {
      if(i.checked == true){
        this.selectName.push(i.name)
      }
    })
  },
  methods: {
    remove (item) {
      this.selectName.pop()
    },
    selectOn () {
      this.isShow = true
      this.$refs.ipt.focus()
    },
    selectOff () {
      if(this.onBlur){
        this.isShow = false
      }
    },
    choose (val) {
      this.selectName.push(val.name)
      this.filterUser.forEach((v,i)=>{
        if(v.name == val.name){
          this.filterUser.splice(i,1)
        }
      })
      this.isShow = false
    }
  }
}
</script>

<style scoped>
  .tag-input {
    width: 0.75em;
    border: 0;
    outline: 0;
    background: transparent;
    height: 100%;
    font-size: inherit;
  }
  .tag-ipt-box {
    width: 100%;
    height: 100%;
    display: inline-block;
    position: relative;
  }
  .tag-ipt {
    float: left;
  }
  .tag-box {
    margin: 30px auto 0 auto;
    box-sizing: border-box;
    min-height: 28px;
    width: 400px;
    padding-bottom: 2px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .tag-box.active {
    border-color: #49a9ee;
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
  }
  .tag-box ul,
  .select-ul {
    padding: 0 5px 0 5px;
    margin: 0;
    list-style-type: none;
  }
  .select-ul {
    width: 400px;
    margin: 0 auto;
    max-height: 200px;
    box-shadow: 0 5px 30px #e4ebf1;
    overflow-y: auto;
  }
  .select-ul li {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  .select-ul li:hover {
    background-color: #f7f7f7;
  }
  .tag-box ul li {
    margin-top: 2px;
  }
  .tag-box ul li.tag-item {
    float: left;
    position: relative;
    padding: 2px 10px 2px 5px;
    margin-right: 4px;
    background-color: #f3f3f3;
    color: #999;
    border-radius: 3px;
    cursor: pointer;
    overflow: hidden;
  }
  .close {
    margin-left: 5px;
  }
  .close:hover {
    opacity: .6;
  }
  .clearfix {
    *zoom : 1;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
</style>
