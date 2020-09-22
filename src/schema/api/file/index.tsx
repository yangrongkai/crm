'use strict'


import { ApiInterface } from 'common/interface';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';


export const fileUploadApi: ApiInterface[] = [
    { 
        name: "file.upload", 
        descriptions: "",
        servers: ["file"],
        type: api.FileUploadApi,
        request: {
            role: {
                transfer: "role",
                type: fields.StringField
            },
            storeType: {
                transfer: "store_type",
                type: fields.StringField
            },
        },
        response: {
            file_paths:{
                transfer: 'filePaths',
                listIter: fields.StringField,
            },
        },
        mock: {
            success:{
                file_paths: [
                    {
                        id: 1,
                        name: "必圈信息技术湖北有限公司",
                    },
                ],
            },
            failure:{
                code: '9999',
                msg: '上传文件失败',
            }
        }
    },
]
