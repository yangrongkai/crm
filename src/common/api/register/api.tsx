'use strict'


import { BaseApi } from 'common/api/core';


// Api register
export class ApiHelper{
    [name: string]: BaseApi;
}

export class ApiRegister{
    apiHelper: ApiHelper;

    constructor(){
        this.apiHelper = new ApiHelper();
    }

    register(api: BaseApi, ...apis: BaseApi[]){
        this.apiHelper[api.name] = api;
        for(let oApi of apis){
            if( !this.apiHelper.hasOwnProperty(oApi.name) ){
                this.apiHelper[oApi.name] = oApi;
            } else {
                throw new Error("[notes] api name already was used! api name is ${oApi.name}.")
            }
        }
    }

}
