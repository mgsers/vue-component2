// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import directive from './directive'
import banner from './components/banner.js'
import store from './store'

Vue.use(banner)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  directive,
  components: { App },
  store
})
