'use strict'


import { BaseField } from './baseField';


export class KeyValueField extends BaseField{

    format(value: any): string{
        return value;
    }

    parse(value: any): string{
        return value;
    }

    getDiscription(){
        return "Key Value field"
    }

}
