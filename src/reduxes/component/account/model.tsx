'use strict'


/** account model definitions **/
export interface AccountModel {

    // 状态
    isLoading: boolean;

    // 数据
    username: string;
    password: string;
    accessToken: string;
    renewFlag: string;
    expirteTime: string;

}

export enum AccountFilter {
}

export type AccountState = Partial<AccountModel>;
