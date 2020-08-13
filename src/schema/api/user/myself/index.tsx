'use strict'


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
                        type: fields.DatetimeField
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
                        type: fields.StringField
                    },
                    account_info:{
                        transfer: "account",
                        dict:{
                            nick: {
                                transfer: 'nick',
                                type: fields.StringField
                            },
                            head_url: {
                                transfer: "headUrl",
                                type: fields.StringField
                            },
                            last_login_time: {
                                transfer: "lastLoginTime",
                                type: fields.StringField
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
                                type: fields.StringField
                            },
                            create_time: {
                                transfer: "createTime",
                                type: fields.StringField
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
                                type: fields.StringField
                            },
                        }
                    }
                }
            }
        },
        mock: {
            success:{
                staff_info:{
                    nick: 'Roy',
                    head_url: '',
                    name: 'Yang',
                    birthday: '2019-01-02',
                    phone: '15527703112',
                    email: '237818280@qq.com',
                    work_number: 'BQ0001',
                    is_admin: true,
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
                        type: fields.DatetimeField
                    },
                    phone: {
                        transfer: "phone",
                        type: fields.StringField
                    },
                    email: {
                        transfer: "email",
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
