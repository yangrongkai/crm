'use strict'

export abstract class BaseStorage{
    storage: any;

    abstract sync(key: any, value: any): void;
    abstract load(key: any): any;
    abstract remove(key: any): boolean;

}
