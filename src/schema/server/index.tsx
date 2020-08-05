'use strict'

import { ServerInterface } from 'common/interface';


export const serverConfig: ServerInterface[] = [
    {
        flag: 'crm',
        url: "http://localhost:8012/interface/",
        description: "crm系统服务"
    },
    {
        flag: 'controller-pc',
        url: "http://localhost:8011/interface/",
        description: "中台系统服务"
    },
]
