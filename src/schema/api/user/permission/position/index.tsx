'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const positionApi: ApiInterface[] = [
    { 
        name: "staff.permission.position.add", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appkey",
                type: fields.StringField
            },
            positionInfo: {
                transfer: "position_info",
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    ruleGroupId: {
                        transfer: "rule_group_id",
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
            position_id:{
                transfer: 'positionId',
                type: fields.IntField,
            },
        },
        mock: {
            success:{
                position_id: "1",
            },
            failure:{
                code: '9999',
                msg: '创建身份失败',
            }
        }
    },
    { 
        name: "staff.permission.position.get", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            positionId: {
                transfer: "position_id",
                type: fields.IntField
            },
        },
        response:{
            position_info: {
                transfer: "positionInfo",
                dict:{
                    id: {
                        transfer: "id",
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    rule_group_id: {
                        transfer: "ruleGroupId",
                        type: fields.IntField
                    },
                    rule_group_name: {
                        transfer: "ruleGroupName",
                        type: fields.StringField
                    },
                    parent_id: {
                        transfer: "parentId",
                        type: fields.IntField,
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
                position_info: {
                    id: 1,
                    name: "总经理",
                    parent_id: 1,
                    rule_group_id: 1,
                    rule_group_name: "全部权限",
                    description: "公司",
                    remark: "公司最高职位",
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
        name: "staff.permission.position.all", 
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
            position_list: {
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
        mock: {
            success:{
                position_list: [
                    {
                        id: 1,
                        name: "总经理",
                        description: "公司",
                        remark: "公司最高职位",
                    },
                    {
                        id: 2,
                        name: "销售总监",
                        description: "销售总监",
                        remark: "最高职位",
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
        name: "staff.permission.position.search", 
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
                data_list: [
                    {
                        id: 1,
                        name: "总经理",
                        description: "公司",
                        remark: "公司最高职位",
                    },
                    {
                        id: 2,
                        name: "销售总监",
                        description: "销售总监",
                        remark: "最高职位",
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
        name: "staff.permission.position.tree", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appkey",
                type: fields.BaseField
            }
        },
        response:{
            position_list: {
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
                    rule_group_id: {
                        transfer: "ruleGroupId",
                        type: fields.IntField
                    },
                    rule_group_name: {
                        transfer: "ruleGroupName",
                        type: fields.StringField
                    },
                    parent_id: {
                        transfer: "parentId",
                        type: fields.IntField,
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
                position_list:[
                    {
                        id: 1,
                        name: "总经理",
                        parent_id: 0,
                        description: "",
                        rule_group_id: 0,
                        rule_group_name: "最高权限",
                        remark: "",
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                        children:[
                            {
                                id: 2,
                                name: "销售主管",
                                parent_id: 1,
                                description: "",
                                rule_group_id: 1,
                                rule_group_name: "销售权限",
                                remark: "",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                children:[
                                    {
                                        id: 3,
                                        name: "销售专员",
                                        parent_id: 0,
                                        description: "",
                                        remark: "",
                                        rule_group_id: 2,
                                        rule_group_name: "主管权限",
                                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                    },
                                ]
                            },
                            {
                                id: 4,
                                name: "运营主管",
                                parent_id: 1,
                                description: "",
                                rule_group_id: 3,
                                rule_group_name: "运营权限",
                                remark: "",
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                            },
                            {
                                id: 5,
                                name: "财务主管",
                                parent_id: 1,
                                description: "",
                                rule_group_id: 5,
                                rule_group_name: "财务权限",
                                remark: "",
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
        name: "staff.permission.position.update", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            positionId:{
                transfer: 'position_id',
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
                    parentId: {
                        transfer: "parent_id",
                        required: false,
                        type: fields.IntField
                    },
                    ruleGroupId: {
                        transfer: "rule_group_id",
                        required: false,
                        type: fields.IntField
                    },
                    remark: {
                        transfer: "remark",
                        required: false,
                        type: fields.StringField
                    },
                    description: {
                        transfer: "description",
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
        name: "staff.permission.position.remove", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            positionId:{
                transfer: 'position_id',
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
