'use strict'


export interface CompanyModel {
    // 公司信息
    id: number;
    name: string;
    licenseNumber: string;
    createTime: string;
}

export interface TokenModel {
    // token信息
    accessToken: string;
    renewFlag: string;
    expireTime: string;
}

export interface AccountModel {
    // 账号信息
    username: string;
    nick: string;
    headUrl: string;
    state: string;
    lastLoginTime: string;
    lastLoginIp: string;
    registerIp: string;
    updateTime: string;
    createTime: string;
}

export interface PersonModel {
    id: number;
    name: string;
    birthday: string;
    phone: string;
    email: string;
    workNumber: string;
    isAdmin: string;
    token: TokenModel;
    account: AccountModel;
    company: CompanyModel;
}

export enum PersonFilter {
}


export type PersonState = Partial<PersonModel>;
