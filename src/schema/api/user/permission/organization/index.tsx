'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const organizationApi: ApiInterface[] = [
    { 
        name: "staff.permission.organization.add", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            appkey: {
                transfer: "appkey",
                type: fields.StringField
            },
            organizationInfo: {
                transfer: "organization_info",
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    positionIdList: {
                        transfer: "position_id_list",
                        type: fields.JsonField
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
            organization_id:{
                transfer: 'organizationId',
                type: fields.IntField,
            },
        },
        mock: {
            success:{
                organization_id: "1",
            },
            failure:{
                code: '9999',
                msg: '创建组织失败',
            }
        }
    },
    { 
        name: "staff.permission.organization.get", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            organizationId: {
                transfer: "organization_id",
                type: fields.IntField
            },
        },
        response:{
            organization_info: {
                transfer: "organizationInfo",
                dict:{
                    id: {
                        transfer: "id",
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    position_list: {
                        transfer: "positionList",
                        list: {
                            id: {
                                transfer: "id",
                                type: fields.IntField
                            },
                            name: {
                                transfer: "name",
                                type: fields.StringField
                            },
                        }
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
                organization_info: {
                    id: 1,
                    name: "总经办",
                    parent_id: 1,
                    position_list: [
                        {
                            id: 1,
                            name: "总经理"
                        }
                    ],
                    position_name_list: "['总经理', '总经理助理']",
                    description: "公司",
                    remark: "",
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
        name: "staff.permission.organization.search", 
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
                    position_list: {
                        transfer: "positionList",
                        list: {
                            id: {
                                transfer: "id",
                                type: fields.IntField
                            },
                            name: {
                                transfer: "name",
                                type: fields.StringField
                            },
                        }
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
                        position_list: [
                            {
                                id: 1,
                                name: "总经理"
                            }
                        ],
                    },
                    {
                        id: 2,
                        name: "销售总监",
                        description: "销售总监",
                        remark: "最高职位",
                        position_list: [
                            {
                                id: 2,
                                name: "销售总监"
                            }
                        ],
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
        name: "staff.permission.organization.all", 
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
            organization_list: {
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
                    position_list: {
                        transfer: "positionList",
                        list: {
                            id: {
                                transfer: "id",
                                type: fields.IntField
                            },
                            name: {
                                transfer: "name",
                                type: fields.StringField
                            },
                        }
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
                organization_list: [
                    {
                        id: 1,
                        name: "总经办",
                        description: "公司",
                        remark: "公司最高职位",
                        position_list: [
                            {
                                id: 1,
                                name: "总经理"
                            }
                        ],
                    },
                    {
                        id: 2,
                        name: "销售部",
                        description: "销售总监",
                        remark: "最高职位",
                        position_list: [
                            {
                                id: 2,
                                name: "销售总监"
                            }
                        ],
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
        name: "staff.permission.organization.tree", 
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
            organization_list: {
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
                    position_list: {
                        transfer: "positionList",
                        list: {
                            id: {
                                transfer: "id",
                                type: fields.IntField
                            },
                            name: {
                                transfer: "name",
                                type: fields.StringField
                            },
                        }
                    },
                }
            },
        },
        mock: {
            success:{
                organization_list:[
                    {
                        id: 1,
                        name: "总经办",
                        parent_id: 0,
                        description: "",
                        remark: "",
                        position_list: [
                            {
                                id: 1,
                                name: "总经理"
                            }
                        ],
                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                        children:[
                            {
                                id: 2,
                                name: "销售部",
                                parent_id: 1,
                                description: "",
                                remark: "",
                                position_list: [
                                    {
                                        id: 2,
                                        name: "销售主管"
                                    }
                                ],
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                children:[
                                    {
                                        id: 3,
                                        name: "销售一组",
                                        parent_id: 2,
                                        description: "",
                                        remark: "",
                                        position_list: [
                                            {
                                                id: 2,
                                                name: "销售主管"
                                            }
                                        ],
                                        update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                        create_time: moment('1970-01-01', "YYYY-MM_DD"),
                                    },
                                ]
                            },
                            {
                                id: 4,
                                name: "运营部",
                                parent_id: 1,
                                description: "",
                                remark: "",
                                position_list: [
                                    {
                                        id: 3,
                                        name: "运营主管"
                                    }
                                ],
                                update_time: moment('1970-01-01', "YYYY-MM_DD"),
                                create_time: moment('1970-01-01', "YYYY-MM_DD"),
                            },
                            {
                                id: 5,
                                name: "财务部",
                                parent_id: 1,
                                description: "",
                                remark: "",
                                position_list: [
                                    {
                                        id: 4,
                                        name: "财务主管"
                                    }
                                ],
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
        name: "staff.permission.organization.update", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            organizationId:{
                transfer: 'organization_id',
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
                    positionIdList: {
                        transfer: "position_id_list",
                        required: false,
                        type: fields.JsonField
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
        name: "staff.permission.organization.remove", 
        descriptions: "",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            organizationId:{
                transfer: 'organization_id',
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
