'use strict'


import moment from 'moment';
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
        name: "staff.permission.platform.get", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            platformId: {
                transfer: "platform_id",
                type: fields.IntField
            },
        },
        response:{
            platform_info: {
                transfer: "platformInfo",
                dict:{
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
                    company_name: {
                        transfer: "companyName",
                        type: fields.StringField
                    },
                    app_type: {
                        transfer: "appType",
                        type: fields.StringField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                    create_time: {
                        transfer: "createTime",
                        type: fields.DatetimeField
                    },
                    update_time: {
                        transfer: "updateTime",
                        type: fields.DatetimeField
                    },
                }
            },
        },
        mock: {
            success:{
                platform_info: {
                    id: 1,
                    name: "必圈crm平台",
                    company_id: 1,
                    company_name: "必圈信息技术湖北有限公司",
                    app_type: "person",
                    remark: "必圈crm权限管理",
                    update_time: moment('1970-01-01', "YYYY-MM_DD"),
                    create_time: moment('1970-01-01', "YYYY-MM_DD"),
                },
            },
            failure:{
                code: '9999',
                msg: '获取数据失败',
            }
        }
    },
    { 
        name: "staff.permission.platform.search", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            currentPage: {
                transfer: "current_page",
                type: fields.IntField
            },
            searchInfo: {
                transfer: "search_info",
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        required: false,
                        type: fields.StringField
                    }
                }
            },
        },
        response:{
            data_list: {
                transfer: "dataList",
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
                    company_name: {
                        transfer: "companyName",
                        type: fields.StringField
                    },
                    app_type: {
                        transfer: "appType",
                        type: fields.StringField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                    create_time: {
                        transfer: "createTime",
                        type: fields.DatetimeField
                    },
                    update_time: {
                        transfer: "updateTime",
                        type: fields.DatetimeField
                    },
                }
            },
            total: {
                transfer: "total",
                type: fields.IntField
            },
            total_page: {
                transfer: "totalPage",
                type: fields.IntField
            },
        },
        mock: {
            success:{
                data_list:[
                    {
                        id: 1,
                        name: "鹿据crm平台",
                        company_id: 1,
                        company_name: "鹿数据教育科技湖北有限公司",
                        app_type: "person",
                        remark: "鹿据crm权限管理",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                    {
                        id: 2,
                        name: "荣立客户管理平台",
                        company_id: 1,
                        company_name: "荣立信息技术湖北邮箱公司",
                        app_type: "position",
                        remark: "必圈客户管理权限管理",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                ],
                total: 2,
                total_page: 1
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
                        required: false,
                        type: fields.StringField
                    },
                    appType: {
                        transfer: "app_type",
                        required: false,
                        type: fields.StringField
                    },
                    remark: {
                        transfer: "remark",
                        required: false,
                        type: fields.StringField
                    },
                    companyId: {
                        transfer: "company_id",
                        required: false,
                        type: fields.IntField
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
        name: "staff.permission.platform.remove", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            platformId:{
                transfer: 'platform_id',
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
                msg: '删除失败',
            }
        }
    },
]
