'use strict'


import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const accountApi: ApiInterface[] = [
    { 
        name: "staff.account.login", 
        descriptions: "it will login by username and password",
        servers: ["controller-pc"],
        type: api.UnAuthorizationApi,
        request: {
            username: {
                transfer: "username",
                type: fields.StringField,
            },
            password: {
                transfer: 'password',
                type: fields.StringField,
            },
        },
        response:{
            access_token:{
                transfer: 'accessToken',
                type: fields.StringField,
            },
            renew_flag:{
                transfer: 'renewFlag',
                type: fields.StringField,
            },
            expire_time:{
                transfer: 'expireTime',
                type: fields.StringField,
            },
        },
        mock: {
            success:{
                access_token: "a5ffc062fee0634f",
                renew_flag: "d6a22c4fd8262b04",
                expire_time: '1596783223',
            },
            failure:{
                code: '9999',
                msg: '账号密码错误',
            }
        }
    },
    { 
        name: "staff.account.logout", 
        descriptions: "go to logout account",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
        },
        response:{
        },
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '注销失败',
            }
        }
    },
    { 
        name: "staff.account.update", 
        descriptions: "go to update account information",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            updateInfo:{
                transfer: 'update_info',
                json: true,
                dict:{
                    nick: {
                        transfer: "nick",
                        type: fields.StringField
                    },
                    headUrl: {
                        transfer: "head_url",
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
        name: "staff.account.password.modify", 
        descriptions: "go to update account password",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            newPassword: {
                transfer: "new_password",
                type: fields.StringField
            },
            oldPassword: {
                transfer: "old_password",
                type: fields.StringField
            },
            repeatPassword: {
                transfer: "repeat_password",
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
                msg: '修改密码失败',
            }
        }
    },
    { 
        name: "staff.account.password.reset", 
        descriptions: "go to reset account password",
        servers: ["controller-pc"],
        type: api.ControllerApi,
        request: {
            staffId: {
                transfer: "staff_id",
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
                msg: '重置密码失败',
            }
        }
    },
]
