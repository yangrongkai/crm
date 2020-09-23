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
                    "http://a0.att.hudong.com/70/91/01300000261284122542917592865.jpg"
                ],
            },
            failure:{
                code: '9999',
                msg: '上传文件失败',
            }
        }
    },
]
