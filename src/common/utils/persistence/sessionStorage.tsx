'use strict'

import { BaseStorage } from './base'


export class LocalStorage extends BaseStorage {
    storage: any;

    constructor(){
        super();
        this.storage = sessionStorage;
    }

    sync(key: any, value: any){
        this.storage.setItem(key, JSON.stringify(value));
    }

    load(key: any): any{
        return JSON.parse(this.storage.getItem(key));
    }

    remove(key: any): boolean {
        this.storage.removeItem(key);
        return true;
    }

}

export const localStorage = new LocalStorage();
