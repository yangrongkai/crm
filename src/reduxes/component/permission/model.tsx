'use strict'


export interface CompanyModel {
    // 公司信息
    id: number;
    name: string;
    licenseNumber: string;
    createTime: string;
}

export interface AccountModel {
    // 账号信息
    nick: string;
    headUrl: string;
    username: string;
    status: string;
    lastLoginTime: string;
    lastLoginIp: string;
    registerIp: string;
    updateTime: string;
    createTime: string;
}

export interface PermissionModel {
    id: number;
    name: string;
    birthday: string;
    phone: string;
    email: string;
    qq: string;
    wechat: string;
    workNumber: string;
    isAdmin: string;
    account: AccountModel;
    company: CompanyModel;
}

export enum PermissionFilter {
}


export type PermissionState = Partial<PermissionModel>;
