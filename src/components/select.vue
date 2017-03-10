<template>
  <div>
    <div class="select-box"
      :class="{active: isShow}"
      @click="selectShow()">
      <span>
        {{ selectDataName }}
      </span>
    </div>
    <transition name="fade">
      <ul class="select-ul" v-if="isShow">
        <li v-for="item in selectData" @click="liSelect(item)" :class="{checked: item.checked,noallow: !item.allow}">{{ item.name }}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'select',
  props: {
    selectData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShow: false,
      selectDataName: '请选择'
    }
  },
  mounted () {
    this.selectData.forEach((i,idx) => {
      if(i.checked == true){
        this.selectDataName = i.name
      }
    })
  },
  methods: {
    selectShow (){
      if (this.isShow == false) {
        this.isShow = true
      }else {
        this.isShow = false
      }
    },
    liSelect (i) {
      if(i.allow == true && i.checked == false){
        this.selectDataName = i.name
        this.isShow = false;
        this.$emit('selectedData',i.name)
      }
    }
  },
  filters : {

  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  height: 0;
}
.select-box {
  height: 30px;
  margin: 0 auto;
  width: 150px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
  line-height: 30px;
}
.select-ul {
  margin: 0;
  max-height: 200px;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  width: 150px;
  box-shadow: 0 5px 30px #e4ebf1;
  overflow-y: auto;
}
.select-ul li {
  line-height: 30px;
  height: 30px;
  cursor: pointer;
}
.select-ul li:hover {
  background-color: #f7f7f7;
}

.select-ul li.checked {
  background-color: #f7f7f7;
  cursor: default;
  font-weight: 600;
}

.select-ul li.noallow {
  cursor: not-allowed;
  color: rgba(0, 0, 0, .25);
}

.aa {
  color: red;
}
.select-box.active {
  border: 1px solid #108ee9;
}
.select-box:hover {
  border: 1px solid #108ee9;
}
</style>
