import Vue from 'vue'
import App from './App.vue'
import YinUI from './yin-ui/index'
import './style/index.less'
Vue.config.productionTip = false
Vue.use(YinUI)
new Vue({
  render: (h) => h(App),
}).$mount('#app')
