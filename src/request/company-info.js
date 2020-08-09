import http from '@/utils/axios-http-util'
/**
 * RESTFUL
 */

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 公司简介
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
export function getTheCompanyIntroduction() {
  return http.get('/info/introduction')
}

export function putTheCompanyIntroduction(html) {
  return http.put('/info/introduction', {id: 1, html: html})
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                             公司历史
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
export function getAllCompanyHistory() {
  return http.get('/info/company_history')
}

export function postOneCompanyHistory(data) {
  return http.post('/info/company_history', data)
}

export function putOneCompanyHistory(id, data) {
  return http.put('/info/company_history/' + id, data)
}

export function deleteOneCompanyHistory(id) {
  return http.delete('/info/company_history/' + id)
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                           联系方式
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
export function getOneCompanyContact() { // 本质是取得最新的联系方式
  return http.get('/info/contact')
}

export function postOneCompanyContact(data) { // 本质是增加联系方式而不是修改
  return http.post('/info/contact', data)
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 企业优势
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
export function getAllAdvantages() {
  return http.get('/info/advantage')
}

/**
 *
 * @param data {array}
 */
export function putAllAdvantages(data) {
  return http.putJson('/info/advantage', data)
}

/**
 *
 * @param id {Number}
 * @param data {Object}
 */
export function putOneAdvantages(id, data) {
  return http.put('/info/advantage/' + id, data)
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 轮播图相关
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
/**
 * 获取轮播图列表
 */
export function getAllCarousel() {
  return http.get('/info/carousel')
}

/**
 * 删除文件
 */
export function deleteOneByName(name) {
  return http.delete('/info/carousel/' + name)
}

/**
 * 上传图片地址到数据库
 * @param name
 * @param url
 */
export function postOneCarousel(name, url) {
  return http.post('/info/carousel', {id: null, url, name})
}
