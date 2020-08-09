import http from '@/utils/axios-http-util'

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 News
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
/**
 * 分页查询新闻
 * @param num{Number} 起始页
 * @param size{Number} 条数
 */
export function getSomeNews(num, size) {
  return http.get('/news', {num, size})
}

export function getOneNews(id) {
  return http.get('/news/' + id)
}

export function postOneNews(data) {
  return http.postJson('/news', data)
}

export function putOneNews(id, data) {
  return http.putJson('/news/' + id, data)
}

export function deleteOneNews(id) {
  return http.delete('/news/' + id)
}

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 Tags
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
export function getAllTags() {
  return http.get('/news/tag')
}

/**
 * @param value {String} Tag的值
 */
export function postOneTag(value) {
  return http.post('/news/tag', {value})
}

/**
 * @param id {Number} Tag的id
 */
export function deleteOneTag(id) {
  return http.delete('/news/tag/' + id)
}
