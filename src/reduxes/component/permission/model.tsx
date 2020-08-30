'use strict'


import { SearchModel, AllModel } from 'reduxes/tools/model';

export interface RuleGroupModel {
    id: number;
    name: string;
    content: string;
    description: string;
    remark: string;
    createTime: any;
    updateTime: any;
}

export interface PositionModel {
    id: number;
    parentId: number;
    name: string;
    description: string;
    remark: string;
    ruleGroupId: number;
    ruleGroupName: string;
    createTime: any;
    updateTime: any;
}

export interface OrganizationPositionModel {
    id: number;
    name: string;
}

export interface OrganizationModel {
    id: number;
    parentId: number;
    name: string;
    description: string;
    positionList: OrganizationPositionModel[];
    remark: string;
    createTime: any;
    updateTime: any;

}

export type PermissionState = {
    ruleGroupSearch: SearchModel<Partial<RuleGroupModel>>;
    ruleGroupCurrent: Partial<RuleGroupModel>;
    ruleGroupFilter: SearchModel<Partial<RuleGroupModel>>;

    positionSearch: AllModel<Partial<PositionModel>>;
    positionCurrent: Partial<PositionModel>;
    positionFilter: SearchModel<Partial<PositionModel>>;

    organizationSearch: AllModel<Partial<OrganizationModel>>;
    organizationCurrent: Partial<OrganizationModel>;
    organizationFilter: SearchModel<Partial<OrganizationModel>>;
}
