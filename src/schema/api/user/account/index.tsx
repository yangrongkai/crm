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
        request: [
            {attr: 'username', type: fields.StringField},
            {attr: 'password', type: fields.StringField},
        ],
        response:[
            {attr: 'access_token', alias: "accessToken", type: fields.StringField},
            {attr: 'renew_flag', alias: "renewFlag", type: fields.StringField},
            {attr: 'expire_time', alias: "expireTime", type: fields.StringField},
        ],
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
        request: [
        ],
        response:[
        ],
        mock: {
            success:{
            },
            failure:{
                code: '9999',
                msg: '注销失败',
            }
        }
    }
]
