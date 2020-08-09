
/**
 * 校验外部链接
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验用户名
 * 1. 长度要大于1个
 * 2. 不包含特殊字符
 */
export function validUsername(str) {
  const special = [':', '@', '!', '#']
  if (str.trim().length <= 0) {
    return false
  }
  special.forEach(item => {
    if (str.indexOf(item) >= 0) {
      return false
    }
  })
  return true
}
