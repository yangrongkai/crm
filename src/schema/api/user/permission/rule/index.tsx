'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const ruleApi: ApiInterface[] = [
    { 
        name: "staff.permission.rule.add", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            platformId: {
                transfer: "platform_id",
                type: fields.IntField,
            },
            ruleInfo: {
                transfer: "rule_info",
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    parentId: {
                        transfer: "parent_id",
                        type: fields.IntField
                    },
                    description: {
                        transfer: "description",
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
            rule_id:{
                transfer: 'ruleId',
                type: fields.IntField,
            },
        },
        mock: {
            success:{
                rule_id: 1,
            },
            failure:{
                code: '9999',
                msg: '创建平台失败',
            }
        }
    },
    { 
        name: "staff.permission.rule.get", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            ruleId: {
                transfer: "rule_id",
                type: fields.IntField
            },
        },
        response:{
            rule_info: {
                transfer: "ruleInfo",
                dict:{
                    id: {
                        transfer: "id",
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    code: {
                        transfer: "code",
                        type: fields.StringField
                    },
                    parent_id: {
                        transfer: "parentId",
                        type: fields.IntField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                    description: {
                        transfer: "description",
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
                rule_info: {
                    id: 1,
                    name: "权限列表",
                    parent_id: 0,
                    description: "",
                    remark: "",
                    code: "XBBG",
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
        name: "staff.permission.rule.all", 
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
            rule_list: {
                transfer: "dataList",
                iterFlag: "children",
                iter:{
                    id: {
                        transfer: "id",
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    code: {
                        transfer: "code",
                        type: fields.StringField
                    },
                    parent_id: {
                        transfer: "parentId",
                        type: fields.IntField
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField
                    },
                    description: {
                        transfer: "description",
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
                rule_list: [
                    {
                        id: 1,
                        name: "权限管理",
                        parent_id: 0,
                        description: "仅仅管理权限:以功能权限为主",
                        remark: "权限列表-授权列表-规则挂你",
                        code: "XAXG",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                        children:[
                            {
                                id: 2,
                                name: "权限列表",
                                parent_id: 0,
                                description: "",
                                remark: "",
                                code: "lAXG",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                children:[
                                    {
                                        id: 3,
                                        name: "查询",
                                        parent_id: 2,
                                        description: "",
                                        remark: "",
                                        code: "lAXG",
                                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                    },
                                    {
                                        id: 4,
                                        name: "修改",
                                        parent_id: 2,
                                        description: "",
                                        remark: "",
                                        code: "ADSC",
                                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                    },
                                    {
                                        id: 5,
                                        name: "删除",
                                        parent_id: 2,
                                        description: "",
                                        remark: "",
                                        code: "lAXG",
                                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                    },
                                ]
                            },
                            {
                                id: 6,
                                name: "授权列表",
                                parent_id: 1,
                                description: "",
                                remark: "",
                                code: "ADSC",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                            },
                        ]
                    },
                    {
                        id: 7,
                        name: "组织管理",
                        parent_id: 0,
                        description: "管理数据权限",
                        remark: "组织挂你-身份管理-员工管理",
                        code: "XAXG",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                        children:[
                            {
                                id: 8,
                                name: "组织列表",
                                parent_id: 7,
                                description: "",
                                remark: "",
                                code: "lAXG",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                            },
                            {
                                id: 9,
                                name: "身份列表",
                                parent_id: 7,
                                description: "",
                                remark: "",
                                code: "ADSC",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                            },
                            {
                                id: 10,
                                name: "员工列表",
                                parent_id: 7,
                                description: "",
                                remark: "",
                                code: "lAXG",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                            },
                        ]
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
        name: "staff.permission.rule.update", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            ruleId: {
                transfer: "rule_id",
                type: fields.IntField
            },
            updateInfo: {
                transfer: "update_info",
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField,
                        required: false,
                    },
                    parent_id: {
                        transfer: "parentId",
                        type: fields.IntField,
                        required: false,
                    },
                    description: {
                        transfer: "description",
                        type: fields.StringField,
                        required: false,
                    },
                    remark: {
                        transfer: "remark",
                        type: fields.StringField,
                        required: false,
                    },
                }
            },
        },
        response:{
        },
        mock: {
            success:{
                platform_info: {
                    id: 1,
                    name: "必圈crm平台",
                    parent_id: 0,
                    description: "必圈信息技术湖北有限公司",
                    remark: "必圈crm权限管理",
                    code: "XAXG",
                    updateTime: moment('1970-01-01', "YYYY-MM_DD"),
                    createTime: moment('1970-01-01', "YYYY-MM_DD"),
                },
            },
            failure:{
                code: '9999',
                msg: '获取数据失败',
            }
        }
    },
    { 
        name: "staff.permission.rule.remove", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            ruleId: {
                transfer: "rule_id",
                type: fields.IntField
            },
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '获取数据失败',
            }
        }
    },
]
