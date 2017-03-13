import banner from './banner.vue'
import hello from './Hello.vue'

// export default {
//     install : Vue => Vue.component('banner',banner)
// }

const components = {
    banner,
    hello
}

Object.keys(components).forEach((key)=>{
    if(!components[key].install && components[key].name){
        components[key].install = (Vue) => {
            Vue.component(components[key].name, components[key])
        }
    }
})


const install = (Vue) => {
    if(install.installed) return;

    Object.keys(components).forEach((key)=>{
        if(components[key].install) {
            Vue.use(components[key])
        }
    })
}

export default {
    install
}