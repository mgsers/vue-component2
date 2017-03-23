import vue from 'vue'
import VueRouter from 'vue-router'
import a from './views/a'
import b from './views/b'

vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/a',name: 'a', component: a, meta: { requireAuto: true } },
        { path: '/b',name: 'b', component: b },
        { path: '/', component: a }
    ],
    scrollBehavior (to, from, savedPosition) {

            return { x: 0, y: 0 }
  }
})