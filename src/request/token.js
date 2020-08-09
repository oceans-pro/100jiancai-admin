import http from '@/utils/axios-http-util'

/**
 * 从服务器获取七牛的token
 * @param bucket
 */
export function getUploadToken(bucket) {
  return http.get('/token/upload/' + bucket)
}

/**
 * 从服务器获取百度的token
 */
export function getBaiduMapToken(bucket) {
  return http.get('/token/baidu_map')
}
