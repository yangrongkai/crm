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

export interface OrganizationModel {
    // 部门信息
    id: number;
    name: string;
}

export interface PositionModel {
    // 职位信息
    id: number;
    name: string;
}

export interface PersonModel {
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
    organization: OrganizationModel,
    position: PositionModel,
}


export type PersonState = Partial<PersonModel>;
