import jsonp from 'jsonp'

/**
 * 用户登录
 * @param {string} ip
 * @param {string} token
 */
export function getCityInfoByIp(ip, token) {
  return new Promise((resolve, reject) => {
    jsonp(`https://api.map.baidu.com/location/ip?ak=${token}&ip=${ip}&coor=bd09ll`, {}, (err, data) => {
      resolve(data)
      reject(err)
    })
  })
}
