'use strict'


// import { BaseField } from 'common/api/fields'


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
    format: ApiFieldSet;

    constructor(fieldFormat: ApiFieldSet){
        this.format = fieldFormat;
    }

    parse(parms: any, format: ApiFieldSet){
        let result: any = {};
        for(let attrKey in format){
            let apiField = format[attrKey];
            apiField.attr = attrKey 
            let response= parms[apiField.attr] 

            let isJSON = false;
            if( apiField.hasOwnProperty('json') ){
                isJSON = apiField.json;
            }

            if( apiField.hasOwnProperty('dict') ){
                let value = this.parse(response, apiField.dict) 
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            } else if( apiField.hasOwnProperty('list') ){
                result[apiField.transfer] = []
                for(let index in response){
                    let item  = response[index]
                    let value = this.parse(item, apiField.list)
                    value = isJSON ? JSON.stringify(value) : value 
                    result[apiField.transfer][index] = value
                }
            } else {
                let value = (new apiField.type()).parse(response)
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            }
        }
        return result;
    }

}
