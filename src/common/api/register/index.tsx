'use strict'


import { ServerRegister } from './server';
import { BaseApi } from 'common/api/core';
import * as fields from 'common/api/fields';
import * as apiTypes from 'common/api/core';


// const logger = log.Logger.getLogger('serverRegister')
export const apiConfigs = [
    { 
        name: "demo.test", 
        descriptions: "this is a test api",
        servers: ["crm", "test"],
        type: apiTypes.UnAuthorizationApi,
        request: [
            {attr: 'yrk', type: fields.StringField},
        ],
        response:[
            {attr: 'result', type: fields.NumberField},
        ]

    }
]


export class ApiRouter{
    serverRegister: ServerRegister;

    constructor(apiConfigs: any){
        this.serverRegister = new ServerRegister()
        this.loadApi(apiConfigs)
    }

    router(serverFlag: string, apiName: string): BaseApi{
        return this.serverRegister.serverHelper[serverFlag].apiRegister.apiHelper[apiName]
    }

    loadApi(apiConfig: any){
        for(let api of apiConfig){
            for(let serverName of api.servers){
                let serverHelper = this.serverRegister.serverHelper;
                let { server, apiRegister } = serverHelper[serverName];
                let apiObj = new api.type(api.name, server, api.descriptions);
                api.request.map(
                    (item: any) => {
                        let fieldObj = new item.type();
                        apiObj.parmsHelper.addField(item.attr, fieldObj);
                    }
                );
                api.response.map(
                    (item: any) => {
                        let fieldObj = new item.type();
                        apiObj.returnHelper.addField(item.attr, fieldObj);
                    }
                );
                apiRegister.register(apiObj);
            }
        }
    }

    toString(){
        for(let serverFlag in this.serverRegister.serverHelper){
            let { apiRegister } = this.serverRegister.serverHelper[serverFlag];
            for(let apiName in apiRegister){
                console.info('----->>>>>   ', serverFlag, apiName)
            }
        }
    }

}


export const apiRouter = new ApiRouter(apiConfigs);
