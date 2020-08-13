'use strict'


export interface ApiField{
    transfer: string;
    attr?: string;
    type?: any
    list?: ApiFieldSet;
    dict?: ApiFieldSet;
    json?: boolean;
}

export interface ApiFieldSet{
    [key: string]: ApiField
}

export class ApiFieldHelper{
    fmt: ApiFieldSet;

    constructor(fieldFormat: ApiFieldSet){
        this.fmt = fieldFormat;
    }

    transfer(parms: any, fmt: ApiFieldSet, isTransfer: boolean){
        let result: any = {};
        for(let attrKey in fmt){
            let apiField = fmt[attrKey];
            apiField.attr = attrKey 
            let response= parms[apiField.attr] 

            let isJSON = false;
            if( apiField.hasOwnProperty('json') ){
                isJSON = apiField.json;
            }

            if( apiField.hasOwnProperty('dict') ){
                let value = this.transfer(response, apiField.dict, isTransfer) 
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            } else if( apiField.hasOwnProperty('list') ){
                result[apiField.transfer] = []
                for(let index in response){
                    let item  = response[index]
                    let value = this.transfer(item, apiField.dict, isTransfer) 
                    value = isJSON ? JSON.stringify(value) : value 
                    result[apiField.transfer][index] = value
                }
            } else {
                let field = new apiField.type()
                let transfer = isTransfer? field.parse : field.format
                let value =transfer(response)
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            }
        }
        return result;
    }
}
