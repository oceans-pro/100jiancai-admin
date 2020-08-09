Property “type” must be accessed with "$data.type" 我碰到类似问题是因为权限管理 info获取信息时候后端返回的roles为字符串导致的,返回的权限列表不是数组然后登陆时候要验证就报错了!


currentPageDataList: [{
          id: '',
          title: '',
          flagExternal: '',
          img: '', // 不可置为null 否则第一个图片会不刷新
          tags: '',
          date: '',
          summary: '',
        }],
        
# base api
# VUE_APP_BASE_API = 'http://192.168.0.106:9999' # 本电脑
# VUE_APP_BASE_API = 'http://localhost:9999'
# VUE_APP_BASE_API  = 'http://47.92.24.191:9999'
# 需要配置ngix转发到9999端口 注释不可写在配置那一行，否则请求路径会拼接错误  http:localhost'http://api.100jiancai.cn'
VUE_APP_BASE_API  = 'https://api.100jiancai.cn'


开发模式：npm run dev是前端自己开发用的
生产模式：npm run build 打包之后给后端放在服务端上用的
Vue.config.productionTip = false
1
上面这行代码的意思 是阻止显示生产模式的消息。
如果没有这行代码，或者设置为true，控制台就会多出这么一段代码。

You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.
1
2
大概意思就是：
你运行的Vu是开发模式。为生产部署时，请确保启用生产模式。
————————————————
版权声明：本文为CSDN博主「天下1281」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/boysky0015/java/article/details/102534229

