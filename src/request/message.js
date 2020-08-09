import http from '@/utils/axios-http-util'

/**
 * 获取留言（分页）
 * @param params
 */
export function getSomeMessages(params) {
  return http.get('/message', params)
}

/**
 * 删除一封留言
 * @param id {number}
 */
export function deleteOneMessage(id) {
  return http.delete('/message/' + id)
}

/**
 * 获取邮件的通知策略
 */
export function getMessageConfig() {
  return http.get('/message/config')
}


/**
 * 修改邮件的通知策略
 * @param {Object} data
 * @param {number} data.noticeType
 * @param {number} data.roleId
 */
export function putMessageConfig(data) {
  return http.putJson('/message/config', data)
}

/**
 * 根据角色ID获取邮件列表
 * @param id 角色ID
 */
export function getMailsByRoleId(id) {
  return http.get('/role/mail/' + id)
}


