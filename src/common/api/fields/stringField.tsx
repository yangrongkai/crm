'use strict'


import { BaseField } from './baseField';


export class StringField extends BaseField{

    format(value: any): string{
        return value + "";
    }

    parse(value: any): string{
        return value + "";
    }

    getDiscription(){
        return "String field"
    }

}
