'use strict'


export interface ApiField{
    transfer: string;
    attr?: string;
    type?: any
    list?: ApiFieldSet;
    dict?: ApiFieldSet;
    iter?: ApiFieldSet;
    iterFlag?: string;
    json?: boolean;
    required?: boolean;
}

export interface ApiFieldSet{
    [key: string]: ApiField
}

export class ApiFieldHelper{
    fmt: ApiFieldSet;

    constructor(fieldFormat: ApiFieldSet){
        this.fmt = fieldFormat;
    }

    _iterField(flag: string, item: any, fmt: ApiFieldSet, isTransfer: boolean){
        let result: any = {};
        for(let attrKey in fmt){
            let apiField = fmt[attrKey];
            apiField.attr = attrKey 
            let response= item[apiField.attr] 
            if( attrKey == flag ){
                result[apiField.transfer] = []
                for(let index in response){
                    let newItem = response[index]
                    result[apiField.transfer].push(this._iterField(
                        flag,
                        newItem,
                        fmt,
                        isTransfer
                    ))
                }
            } else {
                let isJSON = false;
                if( apiField.hasOwnProperty('json') ){
                    isJSON = apiField.json;
                }
                
                let isRequired = true;
                if( apiField.hasOwnProperty('required') ){
                    isRequired = apiField.required;
                    if( isRequired == false){
                        if (response == undefined || response == ""){
                            continue
                        }
                    }
                }
                let field = new apiField.type()
                let transfer = isTransfer? field.parse : field.format
                let value = transfer(response)
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            }
        }
        return result;
    }

    transfer(parms: any, fmt: ApiFieldSet, isTransfer: boolean){
        let result: any = {}
        for(let attrKey in fmt){
            let apiField = fmt[attrKey];
            apiField.attr = attrKey 

            let isJSON = false;
            if( apiField.hasOwnProperty('json') ){
                isJSON = apiField.json;
            }
            
            let isRequired = true;
            if( apiField.hasOwnProperty('required') ){
                isRequired = apiField.required;
            }

            if(!parms.hasOwnProperty(attrKey)){
                if( isRequired == true){
                    console.error("api parms losted.... filed = " + apiField.attr)
                    throw Error("api parms losted.... filed" + apiField.attr)
                }
            }

            let response = parms[apiField.attr] 
            if(response == "" || response == undefined){
                continue
            }

            if( apiField.hasOwnProperty('iter') ){
                let value: any[] = []
                for(let index in response){
                    value.push(this._iterField(
                        apiField.iterFlag,
                        response[index],
                        apiField.iter,
                        isTransfer
                    ))
                }
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            } else if( apiField.hasOwnProperty('dict') ){
                let value = this.transfer(response, apiField.dict, isTransfer) 
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            } else if( apiField.hasOwnProperty('list') ){
                result[apiField.transfer] = []
                for(let index in response){
                    let item  = response[index]
                    let value = this.transfer(item, apiField.list, isTransfer) 
                    value = isJSON ? JSON.stringify(value) : value 
                    result[apiField.transfer][index] = value
                }
            } else {
                let field = new apiField.type()
                let transfer = isTransfer? field.parse : field.format
                let value = transfer(response)
                value = isJSON ? JSON.stringify(value) : value 
                result[apiField.transfer] = value
            }
        }
        return result;
    }
}
