'use strict'


import { BaseField } from 'common/api/fields'


export class FieldSet<T extends BaseField<T>>{
    [key: string]: T
}

export class ApiFieldSet extends FieldSet<any>{
    [key: string]: any
}

export class FieldSetHelper{
    fieldSet: FieldSet<any>;

    constructor(){
        this.fieldSet = new FieldSet();
    }

    parse(parms: any){
        let result: any = {};
        for(let attrKey in this.fieldSet){
            let apiField = this.fieldSet[attrKey];
            if( parms.hasOwnProperty(attrKey) ){
                try{
                    let value = (new apiField.type()).parse(parms[attrKey])
                    if( apiField.hasOwnProperty('alias') ){
                        result[apiField.alias] = value 
                    } else {
                        result[attrKey] = value
                    }
                } catch (e) {
                    throw new Error("[notes] parse parameter <" + attrKey + "> failure!")
                }
            } else {
                throw new Error("[ notes ] lose parameter <" + attrKey + "> !")
            }
        }
        return result;
    }

    addField(attrKey: string, apiField: any){
        if(!this.fieldSet.hasOwnProperty(attrKey)){
            this.fieldSet[attrKey] = apiField;
        } else {
            // todo: it need to logger.
        }
    }

    getFieldSet(): FieldSet<any>{
        return this.fieldSet;
    }

    getFields(){
        let fields: any = []
        for(let attrKey in this.fieldSet){
            fields.push(this.fieldSet[attrKey])
        }
        return fields;
    }

}
