'use strict'


import { BaseField } from './baseField';


export class IntField extends BaseField{

    format(value: any): number{
        return parseInt(value);
    }

    parse(value: any): number{
        return parseInt(value);
    }
    getDiscription(){
        return "int field"
    }

}


export class FloatField extends BaseField{

    format(value: any): number{
        return parseFloat(value);
    }

    parse(value: any): number{
        return parseFloat(value);
    }
    getDiscription(){
        return "float field"
    }

}
