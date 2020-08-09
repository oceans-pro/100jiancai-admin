import http from '@/utils/axios-http-util'

/**
 * 获取聊天记录
 * @param {int} num 第几页
 * @param {int} pageSize 页的大小
 */
export function getPageChatMsgLog(num, pageSize) {
  return http.get('/log/chat', {num, pageSize})
}

/**
 * 获取操作记录
 * @param {int} num 第几页
 * @param {int} pageSize 页的大小
 */
export function getPageOperationLog(num, pageSize) {
  return http.get('/log/operation', {num, pageSize})
}

export function deleteAllChatMsgLog(n) {
  return http.delete('/log/chat')
}

export function deleteAllOperationLog() {
  return http.delete('/log/operation')
}
