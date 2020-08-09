import http from '@/utils/axios-http-util'
import * as qiniu from 'qiniu-js'

/**
 * 从服务器获取token
 * @param bucket
 */
export function getUploadToken(bucket) {
  return http.get('/token/upload/' + bucket)
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 公共函数
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
/**
 * 上传文件
 * @param file 文件对象，或者是字符串
 * @param name 文件的名字
 * @param token 包含要把file传到哪里、用户名密码是多少的信息的token
 */
export function uploadFile(file, name, token) {
  return new Promise((resolve, reject) => {
    const observable = qiniu.upload(file, name, token, putExtra, config)
    const observer = { // 相当于回调函数的结合体
      next(res) {
        // console.log(res.total.percent) // 进度条功能先不用...
      },
      error(err) {
        reject(err)
      },
      complete(res) {
        resolve(res)
      },
    }
    observable.subscribe(observer)
  })
}

// -- 配置
const putExtra = {}
const config = {
  useCdnDomain: true,
}
