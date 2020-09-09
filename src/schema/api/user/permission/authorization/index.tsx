'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const authorizationApi: ApiInterface[] = [
    { 
        name: "staff.permission.authorization.authorize", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            platformId: {
                transfer: "platform_id",
                type: fields.IntField,
            },
            authorizationInfo: {
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
            appkey:{
                transfer: 'appkey',
                type: fields.StringField,
            },
        },
        mock: {
            success:{
                appkey: "aaaa-bbbb-cccc-ddd1",
            },
            failure:{
                code: '9999',
                msg: '授权失败',
            }
        }
    },
    { 
        name: "staff.permission.authorization.get", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            authorizationId: {
                transfer: "authorization_id",
                type: fields.IntField
            },
        },
        response:{
            authorization_info: {
                transfer: "authorizationInfo",
                dict:{
                    id: {
                        transfer: "id",
                        type: fields.IntField
                    },
                    use_status: {
                        transfer: "useStatus",
                        type: fields.StringField
                    },
                    appkey: {
                        transfer: "appkey",
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
                authorization_info: {
                    id: 1,
                    appkey: "aaaa-bbbb-dddd-cccc",
                    use_status: "enable",
                    company_id: 1,
                    company_name: "天道酬勤湖北有限公司",
                    remark: "",
                    create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    update_time: moment('1970-01-01', "YYYY-MM_DD"),
                },
            },
            failure:{
                code: '9999',
                msg: '获取数据失败',
            }
        }
    },
    { 
        name: "staff.permission.authorization.search", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            currentPage: {
                transfer: "current_page",
                type: fields.IntField
            },
            platformId: {
                transfer: "platform_id",
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
                    use_status: {
                        transfer: "useStatus",
                        type: fields.StringField
                    },
                    appkey: {
                        transfer: "appkey",
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
                        appkey: "aaaa-bbbb-cccc-ddd2",
                        use_status: "enable",
                        company_id: 1,
                        company_name: "天道酬勤股份有限公司",
                        remark: "",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                    {
                        id: 2,
                        appkey: "aaaa-bbbb-cccc-ddd3",
                        use_status: "forbidden",
                        company_id: 1,
                        company_name: "武陵瓦斯责任有限公司",
                        remark: "",
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
        name: "staff.permission.authorization.update", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            authorizationId:{
                transfer: 'authorization_id',
                type: fields.StringField
            },
            updateInfo:{
                transfer: 'update_info',
                json: true,
                dict:{
                    remark: {
                        transfer: "remark",
                        required: false,
                        type: fields.StringField
                    },
                    useStatus: {
                        transfer: "use_status",
                        required: false,
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
        name: "staff.permission.authorization.remove", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            authorizationId:{
                transfer: 'authorization_id',
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
    { 
        name: "staff.permission.authorization.apply", 
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
        name: "staff.permission.authorization.forbidden", 
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
        name: "staff.permission.authorization.refresh", 
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
