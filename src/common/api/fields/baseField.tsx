'use strict'


export abstract class BaseField{

    format(value: any): any{
        return value;
    }

    parse(value: any): any{
        return value;
    }

    abstract getDiscription(): string;
}
