import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'

/**
 * response interceptor
 * 考虑到每次response携带data和code等信息
 * 如果是正常，获取数据，每次都要 response.data
 * 如果是异常，进行错误提示，每次都要 response.errMsg
 */
axios.interceptors.response.use(
  // statusMsgData can reach
  axiosResponse => {
    const response = axiosResponse.data // 这里的response就是我们自己封装的StatusData了
    const status = parseInt(response.status)
    // 成功查询到数据/成功完成增删改且不需要提示
    if (status === 20000 || status === 20001) {
      return response.data
    }
    // 成功完成增删改且需要提示
    if (status === 20002) {
      Message({
        message: response.msg || '成功',
        type: 'success',
        duration: 1500,
      })
      return response.data
    }
    if (status === 40003) {
      Message({
        message: '用户名或密码错误',
        type: 'error',
        duration: 5 * 1000,
      })
    }
    // if (status === 40002) {
    //   //  Illegal token; Other clients logged in; Token expired;
    //   MessageBox.confirm( // to re-login
    //     '您的登录信息已经过期, 你可以选择继续留在本页, 或者重新登录',
    //     '确认注销',
    //     {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //     },
    //   )
    //     .then(() => {
    //       store.dispatch('user/RESET_COOKIES').then(() => { // 清除本地无效的有关登录相关的COOKIE
    //         location.reload() // 刷新浏览器
    //       })
    //     })
    //     .catch(_ => {
    //
    //     })
    // }
    if (status === 40001) {
      Message({
        message: response.msg,
        type: 'error',
        duration: 5 * 1000,
      })
    }
    // 将我们后端发送的自定义错误信息封装为 new Error
    return Promise.reject(new Error(response.msg || 'Error'))
  },
  // statusMsgData can not reach
  (error) => {
    console.log('错误提示：' + error) // for debug
    if (error.message.indexOf('401') > 0) { // session timeout
      MessageBox.confirm(
        '您的登录信息已经过期, 你可以选择继续留在本页, 或者重新登录',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          store.dispatch('user/RESET_COOKIES').then(() => {
            location.reload()
            return Promise.reject(error)
          })
        })
        .catch(_ => {

        })
    } else if (error.message === 'Request failed with status code 403') { // permission deny
      Message({
        message: '没有权限',
        type: 'error',
        duration: 1.5 * 1000,
        offset: 50,
      })
      return Promise.reject(error)
    } else { // other condition
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(error)
    }
  },
)
