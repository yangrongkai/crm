'use strict'


export abstract class BaseField<T>{

    format(value: T): T{
        return value;
    }

    parse(value: T): T{
        return value;
    }

    abstract getDiscription(): string;
}
