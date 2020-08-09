import router from './index'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Cookies from 'js-cookie'
import {FLAG_LOGIN} from '@/const'

NProgress.configure({showSpinner: false}) // NProgress Configuration
const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (Cookies.get(FLAG_LOGIN)) { // 判断用户是否有登录意愿（页面刷新后，store回到初始状态了。故这里应该判断 cookie 而不是 store）
    if (to.path === '/login') {
      next({path: '/'}) // 如果有请求意愿 重定向到 /
      NProgress.done()
    } else {
      if (store.getters.username) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo') // get user info
          next()
        } catch (error) {
          await store.dispatch('user/RESET_COOKIES') // remove token and go to login page to re-login
          // 下面这行代码用于在控制台输出错误
          // import {Message} from 'element-ui'
          // Message.error(error || 'Has Error')
          // 当Jsession失效时，会输出一片红诸如
          /*
            vue.runtime.esm.js:619 [Vue warn]: Property "message" must be accessed with "$data.message"
            because properties starting with "$" or "_" are not proxied in the Vue instance...
           */
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 没有直接登录意愿
    if (whiteList.indexOf(to.path) !== -1) { // in the free login whitelist, go directly
      next()
    } else { // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
