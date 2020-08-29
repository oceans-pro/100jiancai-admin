# 建材门户网站后台管理系统

## 效果预览

展示部分页面效果
![首页面板](images/96c49495472e04e655c42647c9a1d9706bf0fd88859935accf0163581505e0b6.png)  
![在线聊天](images/790d5f2b4cd64e584cbaf4eac3a5dc73b89b438ba11e0830b6ccd7ddd305b871.png)  
![轮播设置](images/558894fb314046545bfec45062e12b71312c99f139e1ab8b3475164574b0b449.png)  
![公司简介](images/be5b40fede517060526072ff2629c547e4b9a616843f3357d996c5340ad99b7d.png)  
![发展历程](images/52f453c55fa8325977081ad753b3e93fe6cbc04098a9ac1017b8dc10a2752680.png)
![产品展示](images/4fd6843754754d4513c35528ff762faaa96e088e9bdb3e142048ff336db145c2.png)  
![招聘管理](images/e3607e60846ffd4f4446da5465590f330b33eba4abe543c5ec429600ab7d8b95.png)  
![新闻编辑](images/0b5285d1c59ce2dd9891d44667437b0d9087fe7dda294f7ebe8656f4814fa6a2.png)  
![发布新闻](images/51e4ec8efe622d2cc8dd1101ca6da5ea6ca50d497ec9ac2c0a2ba769d2149898.png)  
![标签管理](images/71f4ae343a8e40e7c7ef1cd1a5e32ef1077afc71a471bae10c667f2c819aa328.png)  
![通知策略](images/1c1dbcf370e1969e19cb7bc75b3ae0979c6064337c4d62667ee1ad6cd673cbac.png)  
![角色管理](images/971d7924ec1b81b811cde3fa86046fa666f57616856f890f276f02633fd118be.png)  
![操作日志](images/55a0ea98a49b76e79bb0a36de471518e93c10829cb988a77e7f2c800e0e9cfd5.png)  
![聊天记录](images/43f9aceb808949e19fba6db782a54913b32c6363ea349b3d3b7b2ffdd06616b7.png)  
![今日访客](images/e243fd753bc5a358ed9482e13ffa8cac27d47eb3c54152735a76b927e949e21b.png)  


## 项目地址

https://admin.100jiancai.cn

## nginx配置
请参考另100jiancai-front项目

## 未上传的密钥文件

- .env.development
- .env.production
- src/const/secret.js
  这三个文件的内容分别如下：

```properties
ENV = 'development'
# base api
VUE_APP_BASE_API = 'http://localhost:9999'
VUE_CLI_BABEL_TRANSPILE_MODULES = true
```

```properties
ENV = 'production'
# base api
VUE_APP_BASE_API  = 'https://admin.100jiancai.cn/api'
```

```js
module.exports = {
  // 存放本项目图片文件的配置，本项目用到了七牛云的三个Bucket
  // 其中cdn用于存放JS和CSS等项目内的静态文件
  // imageCdnConfig用于存放图片 分为官网图片和管理后台图片
  cdn: {
    bucket: "",
    accessKey: "",
    secretKey: "",
    cdnHost: ""
  },
  imageCdnConfig: {
    imageHostPublic: "",
    imageHostAdmin: "",
    bucketPublic: "",
    bucketAdmin: "",
    accessKey: "",
    secretKey: ""
  },
  // 存放本项目index.html的配置（需要搭建FTP服务器）
  ftpConfig: {
    host: "<主机IP>",
    user: "",
    password: "",
    port: 21
  }
};
```
