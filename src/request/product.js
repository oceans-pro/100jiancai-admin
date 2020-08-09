import http from '@/utils/axios-http-util'

export function getAllProducts() {
  return http.get('/product')
}

export function postOneProduct(params) {
  return http.post('/product', params)
}

export function putOneProduct(params) {
  return http.put('/product', params)
}

export function deleteOneProduct(id) {
  return http.delete('/product/' + id)
}
