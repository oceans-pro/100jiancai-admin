const fs = require('fs')
const qiniu = require('qiniu')
const path = require('path')
// only for package.json
const {accessKey, secretKey, bucket} = require('../src/const/secret').cdn
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const qiniuConfig = new qiniu.conf.Config()
qiniuConfig.zone = qiniu.zone.Zone_z1

const uploadPath = path.join(__dirname, '../dist')
uploadDirectory(uploadPath)

/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                 封装好的函数
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
function uploadFile(key, file) {
  const options = {
    scope: bucket + ':' + key,
  }
  const formUploader = new qiniu.form_up.FormUploader(qiniuConfig)
  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

// 绝对路径 = dir + prefix + file
function uploadDirectory(directoryPath, prefix) {
  console.log('directoryPath:' + directoryPath)
  const items = fs.readdirSync(directoryPath)
  items.forEach(file => {
    const filePath = path.join(directoryPath, file)
    const key = prefix ? `${prefix}/${file}` : file
    if (fs.lstatSync(filePath).isDirectory()) { // 如果是文件夹
      uploadDirectory(filePath, key)
    } else { // 如果是文件
      console.log('==> key:' + key)
      console.log('==> filePath:' + filePath)
      if (key === 'index.html') return // index.html保存在nginx的html文件夹下
      uploadFile(key, filePath)
        .then(response => {
          // console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  })
}


