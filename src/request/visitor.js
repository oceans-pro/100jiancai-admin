import http from '@/utils/axios-http-util'

/**
 * 获取历史总访问人数/数据
 */
export function getVisitorToday(type, date, num, size) {
  return http.get('/visitor/today/' + date, {type, num, size})
}

/**
 * 获取历史IP
 */
export function getVisitorIpList(type, num, size) {
  return http.get('/visitor/ip', {type, num, size})
}


/**
 * @param {number} type 来源 0代表后台，1代表前台
 * @param {number} device 设备是手机还是电脑 0代表电脑，1代表手机
 * @param {string} refer 来路，记录是从百度还是搜狗还是直接打地址
 */
export function logVisitor(type, device, refer) {
  return http.get('/visitor', {type, device, refer})
}

/**
 * 获取最近访客趋势
 * @param {number} size
 */
export function getLatestVisitorCount(size) {
  return http.get('/visitor/latest/' + size)
}

/**
 * 获取历史总访问人数/数据
 */
export function getVisitorHistory() {
  return http.get('/visitor/history')
}
