import Vue from 'vue'
import App from './App.vue'
import layer from '../index.js'
Vue.use(layer)

new Vue({
  el: '#app',
  render: h => h(App)
})
