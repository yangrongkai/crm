'use strict'


/** account model definitions **/
export interface AccountModel {

    username: string;
    password: string;
    accessToken: string;
    renewFlag: string;
    expireTime: string;

}

export enum AccountFilter {
}

export type AccountState = Partial<AccountModel>;
