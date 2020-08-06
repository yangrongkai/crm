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
        request: [
        ],
        response:[
            {attr: 'nick', type: fields.StringField},
            {attr: 'head_url', type: fields.StringField},
            {attr: 'name', type: fields.StringField},
            {attr: 'gender', type: fields.StringField},
            {attr: 'birthday', type: fields.StringField},
            {attr: 'phone', type: fields.StringField},
            {attr: 'email', type: fields.StringField},
            {attr: 'work_number', type: fields.StringField},
            {attr: 'is_admin', type: fields.StringField},
        ],
        mock: {
            success:{
                nick: 'Roy',
                head_url: '',
                name: 'Yang',
                birthday: '2019-01-02',
                phone: '15527703112',
                email: '237818280@qq.com',
                work_number: 'BQ0001',
                is_admin: true,
            },
            failure:{
                code: '9999',
                msg: '获取客户信息失败',
            }
        }
    },
]
