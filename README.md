# vue2-start

此项目是 vue + element-ui 构建的后台管理系统


## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + less + element-ui


## 项目运行


```
1. git clone https://github.com/yangwch/vue2-start.git

2.cd vue2-start  

3.npm install

4.npm run dev

访问: http://localhost:8090

```

## 项目目录

```
--vue2-start
 --src      源码目前
   --api    webapi请求
   --apps   页面
   --config 配置及通用脚本
   --router 路由配置
   --store  store
   --style  样式文件
   
 --static   静态资源
    --data  json文件
 --manage   编译目录，可直接部署在iis/nginx
 --build    运行环境脚本及编译脚本
 --config   运行配置
 --test     单元测试
 ```
 
 ## webapi格式
 接口返回json格式
 ```
   {
    "result": {
        "total": 10,
        "rows": [{id: 11,name: 'aa'}]
    },
    "success":true,
    "error":null
   }
 ```
 
