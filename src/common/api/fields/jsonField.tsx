'use strict'


import { BaseField } from './baseField';


export class JsonField extends BaseField{

    format(value: any): string{
        return JSON.stringify(value)
    }

    parse(value: any): any{
        return JSON.parse(value)
    }

    getDiscription(){
        return "json field"
    }

}
