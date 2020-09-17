'use strict'


import { BaseContainer } from 'reduxes/tools/container';
import { PermissionState } from './model';
import * as config from  '&/config.js';


export enum PermissionTypes {
    RULEGROUP_ADD = "RULEGROUP_ADD",
    RULEGROUP_GET = "RULEGROUP_GET",
    RULEGROUP_SEARCH = "RULEGROUP_SEARCH",
    RULEGROUP_FILTER = "RULEGROUP_FILTER",
    RULEGROUP_UPDATE = "RULEGROUP_UPDATE",
    RULEGROUP_REMOVE = "RULEGROUP_REMOVE",
    RULEGROUP_RULE_ALL = "RULEGROUP_RULE_ALL",

    POSITION_ADD = "POSITION_ADD",
    POSITION_GET = "POSITION_GET",
    POSITION_SEARCH = "POSITION_SEARCH",
    POSITION_ALL = "POSITION_ALL",
    POSITION_UPDATE = "POSITION_UPDATE",
    POSITION_REMOVE = "POSITION_REMOVE",

    ORGANIZATION_ADD = "ORGANIZATION_ADD",
    ORGANIZATION_GET = "ORGANIZATION_GET",
    ORGANIZATION_SEARCH = "ORGANIZATION_SEARCH",
    ORGANIZATION_ALL = "ORGANIZATION_ALL",
    ORGANIZATION_UPDATE = "ORGANIZATION_UPDATE",
    ORGANIZATION_REMOVE = "ORGANIZATION_REMOVE",
}


export class PermissionContainer extends BaseContainer {

    ruleGroupAdd: any;
    ruleGroupGet: any;
    ruleGroupSearch: any;
    ruleGroupFilter: any;
    ruleAll: any;
    ruleGroupUpdate: any;
    ruleGroupRemove: any;

    positionAdd: any;
    positionGet: any;
    positionFilter: any;
    positionSearch: any;
    positionUpdate: any;
    positionRemove: any;
    
    organizationAdd: any;
    organizationGet: any;
    organizationFilter: any;
    organizationSearch: any;
    organizationUpdate: any;
    organizationRemove: any;
    
    constructor(initialState: any){
        super(initialState);

        this.ruleGroupAdd = this.createAsynchronizationAction(
            "staff.permission.rulegroup.add",
            config.defaultFlag,
            PermissionTypes.RULEGROUP_ADD
        );
        this.ruleGroupGet = this.createAsynchronizationAction(
            "staff.permission.rulegroup.get",
            config.defaultFlag,
            PermissionTypes.RULEGROUP_GET
        );
        this.ruleGroupSearch = this.createAsynchronizationAction(
            "staff.permission.rulegroup.search",
            config.defaultFlag,
            PermissionTypes.RULEGROUP_SEARCH
        );
        this.ruleGroupFilter = this.createAsynchronizationAction(
            "staff.permission.rulegroup.all",
            config.defaultFlag,
            PermissionTypes.RULEGROUP_FILTER
        );
        this.ruleGroupUpdate = this.createAsynchronizationAction(
            "staff.permission.rulegroup.update",
            config.defaultFlag,
            PermissionTypes.RULEGROUP_UPDATE
        );
        this.ruleGroupRemove = this.createAsynchronizationAction(
            "staff.permission.rulegroup.remove",
            config.defaultFlag,
            PermissionTypes.RULEGROUP_REMOVE
        );
        this.ruleAll = this.createAsynchronizationAction(
            "staff.permission.rulegroup.rule.all",
            config.defaultFlag,
            PermissionTypes.RULEGROUP_RULE_ALL
        );

        this.positionAdd = this.createAsynchronizationAction(
            "staff.permission.position.add",
            config.defaultFlag,
            PermissionTypes.POSITION_ADD
        );
        this.positionGet = this.createAsynchronizationAction(
            "staff.permission.position.get",
            config.defaultFlag,
            PermissionTypes.POSITION_GET
        );
        this.positionFilter = this.createAsynchronizationAction(
            "staff.permission.position.all",
            config.defaultFlag,
            PermissionTypes.POSITION_SEARCH
        );
        this.positionSearch = this.createAsynchronizationAction(
            "staff.permission.position.tree",
            config.defaultFlag,
            PermissionTypes.POSITION_ALL
        );
        this.positionUpdate = this.createAsynchronizationAction(
            "staff.permission.position.update",
            config.defaultFlag,
            PermissionTypes.POSITION_UPDATE
        );
        this.positionRemove = this.createAsynchronizationAction(
            "staff.permission.position.remove",
            config.defaultFlag,
            PermissionTypes.POSITION_REMOVE
        );

        this.organizationAdd = this.createAsynchronizationAction(
            "staff.permission.organization.add",
            config.defaultFlag,
            PermissionTypes.ORGANIZATION_ADD
        );
        this.organizationGet = this.createAsynchronizationAction(
            "staff.permission.organization.get",
            config.defaultFlag,
            PermissionTypes.ORGANIZATION_GET
        );
        this.organizationFilter = this.createAsynchronizationAction(
            "staff.permission.organization.all",
            config.defaultFlag,
            PermissionTypes.ORGANIZATION_SEARCH
        );
        this.organizationSearch = this.createAsynchronizationAction(
            "staff.permission.organization.tree",
            config.defaultFlag,
            PermissionTypes.ORGANIZATION_ALL
        );
        this.organizationUpdate = this.createAsynchronizationAction(
            "staff.permission.organization.update",
            config.defaultFlag,
            PermissionTypes.ORGANIZATION_UPDATE
        );
        this.organizationRemove = this.createAsynchronizationAction(
            "staff.permission.organization.remove",
            config.defaultFlag,
            PermissionTypes.ORGANIZATION_REMOVE
        );
    }

    loadActions(): any{
        return {
            ruleGroupAdd: this.ruleGroupAdd,
            ruleGroupGet: this.ruleGroupGet,
            ruleGroupSearch: this.ruleGroupSearch,
            ruleGroupFilter: this.ruleGroupFilter,
            ruleGroupUpdate: this.ruleGroupUpdate,
            ruleGroupRemove: this.ruleGroupRemove,
            ruleAll: this.ruleAll,
            positionAdd: this.positionAdd,
            positionGet: this.positionGet,
            positionFilter: this.positionFilter,
            positionUpdate: this.positionUpdate,
            positionSearch: this.positionSearch,
            positionRemove: this.positionRemove,
            organizationAdd: this.organizationAdd,
            organizationGet: this.organizationGet,
            organizationFilter: this.organizationFilter,
            organizationUpdate: this.organizationUpdate,
            organizationSearch: this.organizationSearch,
            organizationRemove: this.organizationRemove,
        }
    }

    loadReducer(): any{
        return {
            [this.ruleGroupAdd.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.ruleGroupGet.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    ruleGroupCurrent: action.payload.ruleGroupInfo
                })
            },
            [this.ruleGroupSearch.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    ruleGroupSearch: {
                        dataList: action.payload.dataList,
                        total: action.payload.total,
                        totalPage: action.payload.totalPage,
                    }
                })
            },
            [this.ruleGroupFilter.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    ruleGroupFilter: {
                        dataList: action.payload.dataList,
                        total: action.payload.dataList.total,
                    }
                })
            },
            [this.ruleGroupUpdate.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.ruleGroupRemove.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.ruleAll.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    ruleFilter: {
                        dataList: action.payload.dataList,
                        total: action.payload.dataList.length,
                    }
                })
            },

            [this.positionAdd.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.positionGet.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    positionCurrent: action.payload.positionInfo
                })
            },
            [this.positionFilter.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    positionFilter: {
                        dataList: action.payload.dataList,
                        total: action.payload.dataList.length,
                    }
                })
            },
            [this.positionSearch.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    positionSearch: {
                        dataList: action.payload.dataList,
                        total: action.payload.total,
                    }
                })
            },
            [this.positionUpdate.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.positionRemove.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },

            [this.organizationAdd.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.organizationGet.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    organizationCurrent: action.payload.organizationInfo
                })
            },
            [this.organizationFilter.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    organizationFilter: {
                        dataList: action.payload.dataList,
                        total: action.payload.dataList.length,
                    }
                })
            },
            [this.organizationSearch.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                    organizationSearch: {
                        dataList: action.payload.dataList,
                        total: action.payload.total,
                    }
                })
            },
            [this.organizationUpdate.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.organizationRemove.fulfilled.toString()]: (state: PermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
        }
    }
}
