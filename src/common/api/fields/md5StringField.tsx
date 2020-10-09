'use strict'


import { BaseField } from './baseField';
import { hex_md5 } from 'common/utils/security/CryptoMd5.js';


export class Md5StringField extends BaseField{

    format(value: any): string{
        return hex_md5(value + "")
    }

    parse(value: string): string{
        return value;
    }

    getDiscription(){
        return "Md5 String field"
    }

}
