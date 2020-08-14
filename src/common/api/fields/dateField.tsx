'use strict'

import moment from 'moment';
import { BaseField } from './baseField';


export class DateField extends BaseField{

    format(value: any): string{
        return value.format("YYYY-MM-DD")
    }

    parse(value: any): any{
        return moment(value, 'YYYY-MM-DD')
    }

    getDiscription(){
        return "datefield"
    }

}
