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
                    content: JSON.stringify({}),
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
                        content: JSON.stringify({}),
                        description: "",
                        remark: "所有权限",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                    {
                        id: 2,
                        name: "总经理权限",
                        content: JSON.stringify({}),
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
                        content: JSON.stringify({}),
                        description: "",
                        remark: "所有权限",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                    },
                    {
                        id: 2,
                        name: "总经理权限",
                        content: JSON.stringify({}),
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
        name: "staff.permission.rulegroup.rule.all", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
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
                        transfer: "title",
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
                    paths: {
                        transfer: "key",
                        type: fields.StringField
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
                        paths: "XAXG",
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
                                paths: "lAXG-XAXG",
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
                                        paths: "lAXG-XAXG-lAXG",
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
                                        paths: "lAXG-XAXG-ADSC",
                                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                    },
                                    {
                                        id: 5,
                                        name: "删除",
                                        parent_id: 2,
                                        description: "",
                                        remark: "",
                                        code: "lAXX",
                                        paths: "lAXG-XAXG-lAXG",
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
                                paths: "lAXG-ADSC",
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
                        code: "XAXI",
                        paths: "XAXI",
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
                                paths: "XAXI-lAXG",
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
                                paths: "XAXI-ADSC",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                            },
                            {
                                id: 10,
                                name: "员工列表",
                                parent_id: 7,
                                description: "",
                                remark: "",
                                code: "lAXK",
                                paths: "XAXI-lAXK",
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
