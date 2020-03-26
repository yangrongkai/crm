'use strict'

import { ServerInterface } from 'common/interface';


export const serverConfig: ServerInterface[] = [
    {
        flag: 'crm',
        url: "http://localhost:8011/interface/",
        description: "crm系统服务"
    },
    {
        flag: 'test',
        url: "http://localhost:8012/interface/",
        description: "test系统服务"
    },
]
