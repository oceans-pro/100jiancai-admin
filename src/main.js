import Vue from 'vue' // vue
import ElementUI from 'element-ui' // element ui
import Vue2Editor from 'vue2-editor' // 富文本编辑器
import 'element-ui/lib/theme-chalk/index.css' // element ui
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/icons' // global icon
import App from './App'
import store from './store'
import router from './router'
import '@/router/router-control' // 必须在Vue的created之前进行控制
import '@/utils/axios-interceptor-util' // 必须在Vue的created之前进行控制
import permission from '@/directive/permission' // 权限控制

Vue.use(ElementUI)
Vue.use(Vue2Editor)
permission.install(Vue)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
