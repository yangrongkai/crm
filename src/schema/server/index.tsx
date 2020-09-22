'use strict'

import { ServerInterface } from 'common/interface';


export const serverConfig: ServerInterface[] = [
    {
        flag: 'controller-pc',
        url: "http://localhost:8011/interface/",
        description: "中台系统服务"
    },
    {
        flag: 'file',
        url: "http://localhost:8011/interface/",
        description: "文件系统服务"
    },
]
