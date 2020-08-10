'use strict'


// import { BaseField } from 'common/api/fields'


export interface ApiField{
    transfer: string;
    attr?: string;
    type?: any
    list?: ApiFieldSet;
    dict?: ApiFieldSet;
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

            if( apiField.hasOwnProperty('dict') ){
                result[apiField.transfer] = this.parse(response, apiField.dict) 
            } else if( apiField.hasOwnProperty('list') ){
                result[apiField.transfer] = []
                for(let index in response){
                    let item  = response[index]
                    result[apiField.transfer][index] = this.parse(item, apiField.list)
                }
            } else {
                let value = (new apiField.type()).parse(response)
                result[apiField.transfer] = value 
            }
        }
        return result;
    }

}
