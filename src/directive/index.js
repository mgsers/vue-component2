import Vue from 'vue'

Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
    }
})

Vue.directive('demo', {
    bind : function(el, binding) {
        console.log(binding.value)
        el.innerHTML =
        'name: '       + binding.name + '<br>' +
        'value: '      + binding.value + '<br>' +
        'expression: ' + binding.expression + '<br>' +
        'argument: '   + binding.arg + '<br>' 


    }
})

Vue.directive('outSideClose', {
    bind : function(el, binding) {
        function handle(e) {
            if(el.contains(e.target)){
                return false
            }
            if(binding.expression){
                binding.value()
            }
        }
        document.addEventListener('click',handle)
    }
})
