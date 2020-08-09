import http from '@/utils/axios-http-util'

export function getOnline() {
  return http.get('/online/chat')
}
