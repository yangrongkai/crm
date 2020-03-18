'use strict'


import { BaseField } from 'common/api/fields'


export class FieldSet<T extends BaseField<T>>{
    [key: string]: T
}

export class FieldSetHelper{
    fieldSet: FieldSet<any>;

    constructor(){
        this.fieldSet = new FieldSet();
    }

    parse(parms: any){
        let result: any = {};
        for(let attrKey in this.fieldSet){
            let field = this.fieldSet[attrKey];
            if( parms.hasOwnProperty(attrKey) ){
                try{
                    result[attrKey] = field.parse(parms[attrKey])
                } catch (e) {
                    throw new Error("[notes] parse parameter <" + attrKey + "> failure!")
                }
            } else {
                throw new Error("[ notes ] lose parameter <" + attrKey + "> !")
            }
        }
        return result;
    }

    addField(attrKey: string, field: any){
        if(!this.fieldSet.hasOwnProperty(attrKey)){
            this.fieldSet[attrKey] = field;
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
