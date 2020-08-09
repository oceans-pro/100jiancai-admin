import http from '@/utils/axios-http-util'

export function getChat(datetime) {
  return http.get('/chat/' + datetime)
}

export function postChat(word) {
  return http.post('/chat', {word})
}
