'use strict'


import { ServerInterface } from 'common/interface';
import { serverConfig } from 'schema/server';


export class Server implements ServerInterface{
    flag: string;
    description: string;
    url: string;
    
    constructor(server: ServerInterface){
        this.flag = server.flag;
        this.description = server.description;
        this.url = server.url;
    }

    getDescription(): string{
        return this.description;
    }
}

export class ServerHelper {

    serverMap: Map<string, Server>;

    constructor(serverConfig: ServerInterface[]){
        this.serverMap = this.initializeServerMap(serverConfig)
    }

    initializeServerMap(serverConfig: ServerInterface[]){
        let serverMap = new Map();
        for(let server of serverConfig){
            serverMap.set(server.flag, new Server(server));
        }
        return serverMap; 
    }

    getServerMap(): Map<string, Server>{
        return this.serverMap;
    }

}



export const servers = (new ServerHelper(serverConfig)).getServerMap().values();
