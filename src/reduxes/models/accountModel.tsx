'use strict'


/** Login model definitions **/
export interface AccountModel {
    username: string;
    password: string;
    token: string;
    isLoading: boolean;
}

export enum AccountFilter {
}

