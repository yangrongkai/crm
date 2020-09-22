'use strict'


import { BaseField } from './baseField';


export class FileField extends BaseField{

    format(value: any): string{
        return value;
    }

    parse(value: any): string{
        return value;
    }

    getDiscription(){
        return "file field"
    }

}
