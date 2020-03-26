## 客户关系系统（ Customer Relationship System ）


---

#### 前言

> 基于多年的开发经验，为了提高自身开发效率，且方便刚打开源爱好者解决问题，故此编写了改前端框架，目的是为了保证后台的快速迭代开发，希望对广大开源爱好者有所帮助。


#### 框架特点

    * API使用
        - 支持多服务端访问，可以动态配置访问域名
        - 支持配置管理，通过API配置，动态生成后端访问
        - 支持Mock数据模拟，可以遵循软件开发规范，先定义接口，通过Mock返回服务端数据，从而不影响前端开发.


#### 代码结构
```
.
├── build                                             // webpack 构建目录
├── doc                                               // 框架文档目录
├── src                                               // 系统源码
│   ├── assets                                        // 系统静态资源库
│   │   └── style
│   ├── common
│   │   ├── api                                       // api 核心代码包
│   │   │   ├── core
│   │   │   ├── fieldSet
│   │   │   ├── fields
│   │   │   ├── register
│   │   │   ├── server
│   │   │   └── tools
│   │   ├── constants                                 // 系统常用的常量
│   │   ├── interface                                 // 系统共用的结构
│   │   └── utils
│   │       ├── channel
│   │       │   ├── http                              // http 网络传输工具
│   │       │   └── websocket                         // websocket 长连接工具
│   │       ├── log                                   // 系统日志
│   │       ├── persistence                           // 系统持久化工具
│   │       ├── security                              // 加密解密工具
│   │       └── tools
│   ├── containers                                    // react 展示容器
│   │   ├── app
│   │   │   └── layout                                // 系统布局组件
│   │   │       ├── content
│   │   │       ├── footer
│   │   │       ├── header
│   │   │       └── sidebar
│   │   ├── components                                // react 全局组件，如：拦截器
│   │   │   └── base
│   │   └── pages                                     // react 展示页面
│   │       ├── login
│   │       ├── one
│   │       ├── two
│   │       └── welcome
│   ├── reduxes
│   │   ├── actions                                   // redux actions
│   │   ├── middleware
│   │   ├── models
│   │   ├── reducers                                  // redux reducers 合集
│   │   ├── store                                     // redux 全局state结构
│   │   └── tools
│   ├── routes                                        // 系统路由配置路径
│   └── schema                                        // 系统中可配置参数
│       ├── api                                       // api 配置
│       ├── server                                    // server 配置
│       └── menu                                      // 系统菜单配置，左侧 及 顶部 的菜单栏
└── types                                             // typescript声明的全局变量
```


