import http from '@/utils/axios-http-util'


export function postOneHireCondition(params) {
  return http.post('/hire', params)
}

export function deleteOneHireCondition(id) {
  return http.delete('/hire/' + id)
}

export function putOneHireCondition(params) {
  return http.put('/hire', params)
}

export function getAllHireCondition() {
  return http.get('/hire')
}

export function switchHire() {
  return http.put('/hire/switch')
}

export function getConfig() {
  return http.get('/hire/config')
}
