'use strict'


import { SearchModel, AllModel } from 'reduxes/tools/model';


export interface AuthorizationModel {
    // 授权信息
    appkey: string;
    companyId: string;
    companyName: string;
    useStatus: string;
    remark: string;
    createTime: any;
    updateTime: any;
}

export interface RuleModel {
    // 权限规则信息
    id: number;
    name: string;
    code: string;
    perentId: number;
    description: string;
    remark: string;
    createTime: any;
    updateTime: any;
}

export interface PlatformModel{
    // 平台信息
    id: number;
    name: string;
    appType: string;
    companyId: number;
    companyName: string;
    remark: string;
    createTime: any;
    updateTime: any;
}

export type AuthorizationState = {
    platformList: SearchModel<Partial<PlatformModel>>;
    platformCurrent: Partial<PlatformModel>;

    authorizationList: SearchModel<Partial<AuthorizationModel>>;
    authorizationCurrent: Partial<AuthorizationModel>;

    ruleList: AllModel<Partial<RuleModel>>;
    ruleCurrent: Partial<RuleModel>;
}
