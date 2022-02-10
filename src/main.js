import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import Element from 'element-ui'
Vue.use(Element, { size: 'small', zIndex: 3000 })
import 'element-ui/lib/theme-chalk/index.css'

// 全局组件
import SvgIcon from '@/icons'
Vue.component('svg-icon', SvgIcon)


// 国际化
import i18n from '@/i18n'

// 导入页面鉴权
import '@/permission.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
