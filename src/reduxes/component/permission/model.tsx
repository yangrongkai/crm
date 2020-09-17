'use strict'


import { SearchModel, AllModel } from 'reduxes/tools/model';
import { RuleModel } from 'reduxes/component/authorization/model';

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
    ruleFilter: AllModel<Partial<RuleModel>>;

    positionSearch: AllModel<Partial<PositionModel>>;
    positionCurrent: Partial<PositionModel>;
    positionFilter: AllModel<Partial<PositionModel>>;

    organizationSearch: AllModel<Partial<OrganizationModel>>;
    organizationCurrent: Partial<OrganizationModel>;
    organizationFilter: AllModel<Partial<OrganizationModel>>;
}
