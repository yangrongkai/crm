'use strict'


import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const platformApi: ApiInterface[] = [
    { 
        name: "staff.permission.platform.add", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            authorizeInfo: {
                transfer: "authorize_info",
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    companyId: {
                        transfer: "company_id",
                        type: fields.IntField
                    },
                    appType: {
                        transfer: "app_type",
                        type: fields.StringField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                }
            },
        },
        response:{
            platform_id:{
                transfer: 'platformId',
                type: fields.IntField,
            },
        },
        mock: {
            success:{
                platform_id: "1",
            },
            failure:{
                code: '9999',
                msg: '创建平台失败',
            }
        }
    },
    { 
        name: "staff.permission.platform.all", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
        },
        response:{
            data_list: {
                transfer: "dataList",
                json: true,
                list:{
                    id: {
                        transfer: "id",
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    company_id: {
                        transfer: "companyId",
                        type: fields.IntField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                }
            },
        },
        mock: {
            success:{
                data_list:[
                    {
                        id: 1,
                        name: "必圈crm平台",
                        company_id: 1,
                        remark: "必圈crm权限管理",
                    },
                    {
                        id: 2,
                        name: "必圈客户管理平台",
                        company_id: 1,
                        remark: "必圈客户管理权限管理",
                    },
                ]
            },
            failure:{
                code: '9999',
                msg: '获取数据失败',
            }
        }
    },
    { 
        name: "staff.permission.platform.update", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            platformId:{
                transfer: 'platform_id',
                type: fields.StringField
            },
            updateInfo:{
                transfer: 'update_info',
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                }
            }
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '更新失败',
            }
        }
    },
    { 
        name: "staff.permission.platform.authorize", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            authorizeInfo: {
                transfer: "authorize_info",
                json: true,
                dict:{
                    companyId: {
                        transfer: "company_id",
                        type: fields.IntField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                }
            },
        },
        response:{
            appKey: {
                transfer: "appKey",
                type: fields.StringField
            }
        },
        mock: {
            success:{
                appKey: "sads-sdfb-wceh-exdd"
            },
            failure:{
                code: '9999',
                msg: '授权失败',
            }
        }
    },
    { 
        name: "staff.permission.platform.apply", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appKey",
                type: fields.StringField
            },
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '启动应用失败',
            }
        }
    },
    { 
        name: "staff.permission.platform.forbidden", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appKey",
                type: fields.StringField
            },
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '启动应用失败',
            }
        }
    },
    { 
        name: "staff.permission.platform.refresh", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appKey",
                type: fields.StringField
            },
        },
        response:{
            appkey: {
                transfer: "appKey",
                type: fields.StringField
            },
        },
        mock: {
            success:{
                appKey: "sads-sdfb-wceh-1100"
            },
            failure:{
                code: '9999',
                msg: '启动应用失败',
            }
        }
    },
]
