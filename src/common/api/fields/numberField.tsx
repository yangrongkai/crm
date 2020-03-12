'use strict'


import { BaseField } from './baseField';


export class NumberField extends BaseField<number>{
    getDiscription(){
        return "number field"
    }
}
