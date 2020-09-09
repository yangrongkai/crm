'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const ruleGroupApi: ApiInterface[] = [
    { 
        name: "staff.permission.rulegroup.add", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey:{
                transfer: "appkey",
                type: fields.StringField
            },
            ruleGroupInfo: {
                transfer: "rule_group_info",
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    description: {
                        transfer: "description",
                        type: fields.StringField
                    },
                    content: {
                        transfer: "content",
                        type: fields.JsonField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                }
            },
        },
        response:{
            rule_group_id:{
                transfer: 'ruleGroupId',
                type: fields.IntField,
            },
        },
        mock: {
            success:{
                rule_group_id: "1",
            },
            failure:{
                code: '9999',
                msg: '创建平台失败',
            }
        }
    },
    { 
        name: "staff.permission.rulegroup.get", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            ruleGroupId: {
                transfer: "rule_group_id",
                type: fields.IntField
            },
        },
        response:{
            rule_group_info: {
                transfer: "ruleGroupInfo",
                dict:{
                    id: {
                        transfer: "id",
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    content: {
                        transfer: "content",
                        type: fields.JsonField
                    },
                    description: {
                        transfer: "description",
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
                rule_group_info: {
                    id: 1,
                    name: "所有权限",
                    conent: JSON.stringify({}),
                    description: "",
                    remark: "所有权限",
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
        name: "staff.permission.rulegroup.all", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appkey",
                type: fields.StringField
            },
        },
        response:{
            rule_group_list: {
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
                    content: {
                        transfer: "content",
                        type: fields.JsonField
                    },
                    description: {
                        transfer: "description",
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
                rule_group_list:[
                    {
                        id: 1,
                        name: "所有权限",
                        conent: JSON.stringify({}),
                        description: "",
                        remark: "所有权限",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                    {
                        id: 1,
                        name: "总经理权限",
                        conent: JSON.stringify({}),
                        description: "",
                        remark: "总经理权限",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                ],
            },
            failure:{
                code: '9999',
                msg: '获取数据失败',
            }
        }
    },
    { 
        name: "staff.permission.rulegroup.search", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appkey",
                type: fields.StringField
            },
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
                    content: {
                        transfer: "content",
                        type: fields.JsonField
                    },
                    description: {
                        transfer: "description",
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
                        name: "所有权限",
                        conent: JSON.stringify({}),
                        description: "",
                        remark: "所有权限",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                    {
                        id: 1,
                        name: "总经理权限",
                        conent: JSON.stringify({}),
                        description: "",
                        remark: "总经理权限",
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
        name: "staff.permission.rulegroup.update", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            ruleGroupId:{
                transfer: 'rule_group_id',
                type: fields.IntField
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
                    content: {
                        transfer: "content",
                        required: false,
                        type: fields.JsonField
                    },
                    description: {
                        transfer: "description",
                        required: false,
                        type: fields.StringField
                    },
                    remark: {
                        transfer: "remark",
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
        name: "staff.permission.rulegroup.remove", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            ruleGroupId:{
                transfer: 'rule_group_id',
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
