/**
 * 适当缩小图片，并且瘦身
 */
export function narrowAndSlim(url) {
  return url + '?imageView2/0/w/1000|imageslim'
}

/**
 * 使用缩略图，并且瘦身
 */
export function thumbAndSlim(url) {
  return url + '?imageView2/1/w/200/h/200|imageslim'
}

/**
 * 使用缩略图，并且瘦身（逆向操作）
 */
export function thumbAndSlimReverse(url) {
  return url.slice(0, url.length - '?imageView2/1/w/200/h/200|imageslim'.length)
}


/**
 * 仅瘦身
 */
export function slim(url) {
  return url + '?imageslim'
}
