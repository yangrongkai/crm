'use strict'


import { BaseField } from './baseField';


export class BooleanField extends BaseField{

    format(value: any): number{
        return value ? 1 : 0;
    }

    parse(value: any): boolean{
        return value == 0 ? false : true;
    }

    getDiscription(){
        return "Boolean field"
    }

}
