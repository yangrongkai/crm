'use strict'


import { localStorage } from './sessionStorage';


export class StorageConstant {

    name: string;
    fields: string[];

    constructor(name: string, fields: string[]){
        this.name = name;
        this.fields = fields;
    }

    save(data: any){
        let result: any = {};
        for( let index in this.fields ){
            let realKey: string = this.fields[index];
            if(data.hasOwnProperty(realKey)){
                result[realKey] = data[realKey];
            } else {
                throw new Error("lost constant field!");
            }
        }
        localStorage.sync(this.name, result);
    }

    get(): any{
        return localStorage.load(this.name);
    }

    remove(){
        localStorage.remove(this.name);
    }

}

export enum TokenEnum { 
    ACCESS_TOKEN = "accessToken", 
    RENEW_FLAG = "renewFlag",
    EXPIRE_TIME = "expireTime" 
}
export const TokenConstant: StorageConstant = new StorageConstant("token", [TokenEnum.ACCESS_TOKEN, TokenEnum.RENEW_FLAG, TokenEnum.EXPIRE_TIME]);
