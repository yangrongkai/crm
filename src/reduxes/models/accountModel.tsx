'use strict'


/** Login model definitions **/
export interface AccountModel {
    username: string;
    password: string;
    token: string;
}

export namespace AccountModel {
    export enum Filter {
    }
}

