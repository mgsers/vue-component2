import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 10
    },
    getters: {
        done(state){
            return state.count + 5
        }
    },
    mutations: {
        increment (state , val){
            state.count ++
            console.log(val)
        }
    },
    actions: {
        increment (context,e){
            context.commit('increment',e)
        },
        incrementAsync (context,e) {
            setTimeout(() => {
            context.commit('increment',e)
            }, 1000)
        }
    }
})