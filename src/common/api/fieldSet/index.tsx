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

    _iterField(data: any, apiField: ApiField, isTransfer: boolean){
        let children = [];

        if( data.hasOwnProperty(apiField.iterFlag) ){
            children = data[apiField.iterFlag]
            delete data[apiField.iterFlag]
        }

        let value = this.transfer(data, apiField.iter, isTransfer)
        let subValue = []
        for(let index in children){
            let result = this._iterField(children[index], apiField, isTransfer)
            subValue.push(result)
        }

        value[apiField.iterFlag] = subValue
        return value
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

            let response = parms[apiField.attr] 
            if( isRequired == true){
                if(!parms.hasOwnProperty(attrKey)){
                    console.error("api parms losted.... filed = " + apiField.attr)
                    throw Error("api parms losted.... filed" + apiField.attr)
                }
            } else {
                if(response == undefined){
                    continue
                }
            }

            if( apiField.hasOwnProperty('iter') ){
                let value: any = []
                for(let index in response){
                    let current = response[index]
                    let result = this._iterField(current, apiField, isTransfer)
                    value.push(result)
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
