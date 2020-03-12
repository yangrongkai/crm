'use strict'


import { servers, IServer } from 'common/api/server';
import { ApiRegister } from './api';


// Server register
export interface ServerContainer{
    server: IServer,
    apiRegister: ApiRegister,
}

export class ServerHelper{
    [name: string]: ServerContainer;
}

export class ServerRegister{
    serverHelper: ServerHelper;

    constructor(){
        this.serverHelper = new ServerHelper();
        this.loadServers();
    }

    private loadServers(){
        for( let obj of servers ){
            this.serverHelper[obj.flag] = {
                server: obj,
                apiRegister: new ApiRegister()
            };
        }
    }

}
