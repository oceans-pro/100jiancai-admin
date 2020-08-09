/**
 * 将日期对象转化为 字符串
 * @param {string} pattern yyyy-MM-dd HH:mm:ss
 * @param {Date} date
 * @return {string}
 */
export function datetimeFormatter(pattern, date) {
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  let ret
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(pattern)
    if (ret) {
      pattern = pattern.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return pattern
}
/**
 *
 * @param {Date} date
 * @return {string}
 */
export function getDatetimeString(date) {
  return datetimeFormatter('yyyy-MM-dd HH:mm:ss', date)
}

/**
 *
 * @param {Date} date
 * @return {string}
 */
export function getDateString(date) {
  return datetimeFormatter('yyyy-MM-dd', date)
}
/**
 *
 * @param {Date} date
 * @return {string}
 */
export function getTimeString(date) {
  return datetimeFormatter('HH:mm:ss', date)
}
