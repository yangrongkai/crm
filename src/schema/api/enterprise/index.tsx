'use strict'


import moment from 'moment';
import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const enterpriseApi: ApiInterface[] = [
    { 
        name: "enterprise.search", 
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
                dict: {
                    name: {
                        transfer: "name",
                        type: fields.StringField,
                        required: false,
                    },
                }
            }
        },
        response: {
            data_list:{
                transfer: 'dataList',
                list:{
                    id: {
                        transfer: 'id',
                        type: fields.IntField
                    },
                    name: {
                        transfer: "name",
                        type: fields.StringField
                    },
                }
            },
            total:{
                transfer: 'total',
                type: fields.IntField,
            },
            total_page:{
                transfer: 'totalPage',
                type: fields.IntField,
            },
        },
        mock: {
            success:{
                data_list: [
                    {
                        id: 1,
                        name: "必圈信息技术湖北有限公司",
                    },
                    {
                        id: 2,
                        name: "橙鹿科技湖北有限公司",
                    },
                    {
                        id: 3,
                        name: "橙鹿教育湖北有限公司",
                    },
                ],
                total: 3,
                total_page: 1,
            },
            failure:{
                code: '9999',
                msg: '获取公司信息失败',
            }
        }
    },
]
