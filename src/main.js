import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import Element from 'element-ui'
Vue.use(Element, { size: 'small', zIndex: 3000 })
import 'element-ui/lib/theme-chalk/index.css'

import SvgIcon from '@/icons'
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false

// import SvgIcon from '@/components/SvgIcon.vue'
// Vue.component('svg-icon', SvgIcon)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
