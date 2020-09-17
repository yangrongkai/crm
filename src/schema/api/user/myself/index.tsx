'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const myselfApi: ApiInterface[] = [
    { 
        name: "staff.myself.get", 
        descriptions: "get myself information",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
        },
        response: {
            staff_info:{
                transfer: 'staffInfo',
                dict:{
                    id: {
                        transfer: 'id',
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    gender: {
                        transfer: "gender",
                        type: fields.StringField
                    },
                    birthday: {
                        transfer: "birthday",
                        type: fields.DateField
                    },
                    qq: {
                        transfer: "qq",
                        type: fields.StringField
                    },
                    wechat: {
                        transfer: "wechat",
                        type: fields.StringField
                    },
                    phone: {
                        transfer: "phone",
                        type: fields.StringField
                    },
                    email: {
                        transfer: "email",
                        type: fields.StringField
                    },
                    work_number: {
                        transfer: "workNumber",
                        type: fields.StringField
                    },
                    is_admin: {
                        transfer: "isAdmin",
                        type: fields.BooleanField
                    },
                    permission: {
                        transfer: "permission",
                        type: fields.JsonField
                    },
                    organization: {
                        transfer: "organization",
                        dict: {
                            id: {
                                transfer: "id",
                                type: fields.IntField
                            },
                            name: {
                                transfer: "name",
                                type: fields.StringField
                            },
                        },
                    },
                    position: {
                        transfer: "position",
                        dict: {
                            id: {
                                transfer: "id",
                                type: fields.IntField
                            },
                            name: {
                                transfer: "name",
                                type: fields.StringField
                            },
                        },
                    },
                    account_info:{
                        transfer: "account",
                        dict:{
                            nick: {
                                transfer: 'nick',
                                type: fields.StringField
                            },
                            username: {
                                transfer: 'username',
                                type: fields.StringField
                            },
                            head_url: {
                                transfer: "headUrl",
                                type: fields.StringField
                            },
                            last_login_time: {
                                transfer: "lastLoginTime",
                                type: fields.DatetimeField
                            },
                            last_login_ip: {
                                transfer: "lastLoginIp",
                                type: fields.StringField
                            },
                            register_ip: {
                                transfer: "registerIp",
                                type: fields.StringField
                            },
                            status: {
                                transfer: "status",
                                type: fields.StringField
                            },
                            update_time: {
                                transfer: "updateTIme",
                                type: fields.DatetimeField
                            },
                            create_time: {
                                transfer: "createTime",
                                type: fields.DatetimeField
                            },
                        }
                    },
                    company_info:{
                        transfer: "company",
                        dict:{
                            id: {
                                transfer: 'id',
                                type: fields.IntField
                            },
                            name: {
                                transfer: "name",
                                type: fields.StringField
                            },
                            license_number: {
                                transfer: "licenseNumber",
                                type: fields.StringField
                            },
                            create_time: {
                                transfer: "creaetTime",
                                type: fields.DatetimeField
                            },
                        }
                    }
                }
            }
        },
        mock: {
            success:{
                staff_info:{
                    id: 0,
                    name: 'Yang',
                    birthday: moment('1991-01-02', "YYYY-MM-DD"),
                    gender: 'man',
                    wechat: '15527703115',
                    phone: '15527703115',
                    qq: '237818280',
                    email: '237818280@qq.com',
                    work_number: 'BQ0001',
                    is_admin: true,
                    organization: {
                        id: 1,
                        name: "公司",
                    },
                    position: {
                        id: 1,
                        name: "总经理",
                    },
                    permission: [
                    ],
                    account_info: {
                        nick: 'Roy',
                        head_url: '',
                        username: '15527703115',
                        status: "enable",
                        last_login_time: moment('2020-01-02 11:20', "YYYY-MM-DD hh:mm"), 
                        last_login_ip: "192.168.3.245",
                        register_ip: "192.168.3.243",
                        update_time: moment('2020-01-02 11:22', "YYYY-MM-DD hh:mm"),
                        create_time: moment('2020-01-02 3:21', "YYYY-MM-DD hh:mm"),
                    },
                    company_info: {
                        id: 1,
                        name: 'XXXXXXXXXXXXXXX有限公司',
                        license_number: '038absihndsihkwh9382',
                        create_time: moment('2020-01-01 3:21', "YYYY-MM-DD hh:mm"),
                    }
                }
            },
            failure:{
                code: '9999',
                msg: '获取客户信息失败',
            }
        }
    },
    { 
        name: "staff.myself.update", 
        descriptions: "get myself information",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            myselfInfo:{
                transfer: 'myself_info',
                json: true,
                dict:{
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                    birthday: {
                        transfer: "birthday",
                        type: fields.DateField
                    },
                    gender: {
                        transfer: "gender",
                        type: fields.StringField
                    },
                    phone: {
                        transfer: "phone",
                        type: fields.StringField
                    },
                    email: {
                        transfer: "email",
                        type: fields.StringField
                    },
                    qq: {
                        transfer: "qq",
                        type: fields.StringField
                    },
                    wechat: {
                        transfer: "wechat",
                        type: fields.StringField
                    },
                }
            }
        },
        response: {
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '更新客户信息失败',
            }
        }
    },
]
