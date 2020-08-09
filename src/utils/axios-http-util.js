import axios from 'axios'
import qs from 'qs'

const http = {}
/**
 *
 * @param url {String} request url
 * @param method {String}
 * @param params {Object}
 * @param data {Object}
 */
const __http = function(url, method, params, data) {
  return axios({
    url: process.env.VUE_APP_BASE_API + url, // url = base url + request url
    method,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    params,
    data: qs.stringify(data),
  })
}
const http__ = function(url, method, params, data) {
  return axios({
    url: process.env.VUE_APP_BASE_API + url,
    method,
    withCredentials: true,
    timeout: 5000,
    params,
    data,
  })
}

http.get = function(url, params) {
  return __http(url, 'get', params, {})
}
http.post = function(url, data) {
  return __http(url, 'post', {}, data)
}
http.put = function(url, data) {
  return __http(url, 'put', {}, data)
}
http.delete = function(url) {
  return __http(url, 'delete', {}, {})
}
http.putJson = function(url, data) {
  return http__(url, 'put', {}, data)
}
http.postJson = function(url, data) {
  return http__(url, 'post', {}, data)
}
export default http
