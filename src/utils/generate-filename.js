/**
 * 生成一个不重复的文件名
 * @param {File}file 文件对象
 * @return {string}文件名
 */
export function generateName(file) {
  const rawFilename = file.name
  const rawName = rawFilename.split('.')[0]
  const suffix = rawFilename.split('.')[1]
  return `${rawName}-${new Date().getTime()}.${suffix}`
}
