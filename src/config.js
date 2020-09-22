'use strict';


const config = {
    // 项目的名字
    name: 'CRM管理后台',
    // 设置网页的favicon, 可以是外链, 也可以是本地
    favicon: '',
    // footer中显示的字, 可以嵌入html标签
    footer: '<a target="_blank" href="http://www.baidu.com">foolbear</a>版权所有 © 2015-2099',

    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    debug: false,
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    allowPermission: true,
    // 是否开启debug模式, 不会请求后端接口, 使用mock的数据
    allowAccess: true,
    // api默认服务
    defaultHeadPortrait: "assets/image/head_portrait.jpeg",
    // api默认服务
    defaultFlag: "controller-pc",

    globalStyle: {
        componentSize: "small"
    },
  
    // tab模式相关配置
    tabMode: {
        // 是否开启tab模式
        enable: true,
        // 同一个菜单项只允许一个tab，因为react机制，很少会使用true
        allowDuplicate: false,
    },
  
    log: {
        // 日志级别, 类似slf4j中的root logger, 目前支持debug/info/warn/error 4种级别
        level: 'debug',
        // 除了root logger以外, 也可以为每个logger单独设置级别
        debug: [],
        info: [],
        warn: [],
        // 示例, 对于loggerA和loggerB使用error级别, 其他logger使用默认的info级别
        error: ['loggerA', 'loggerB'],
    },

    // 侧边栏相关配置
    sidebar: {
        // 是否显示折叠侧边栏的按钮
        collapsible: false,
        // 只展开一个顶级菜单, 其他顶级菜单自动折叠
        autoMenuSwitch: true,
    },
  
};

module.exports = config;
