<template lang="html">
  <select :value="value" @input="rr($event.target.value)">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
</template>

<script>
export default {
  props: ['value'],
  watch: {
      // value(v) {
      //   console.log('----',v)
      // }
  },
  methods: {
    up(v){
      this.$emit('input',v)
    },
    rr(v){
      // console.log(v)
    }
  }
}
</script>

<style lang="css">
</style>
