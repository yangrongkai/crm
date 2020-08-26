'use strict'


import { BaseContainer } from 'reduxes/tools/container';
import { AuthorizationPermissionState } from './model';
import * as config from  '&/config.js';


export enum AuthorizationPermissionTypes {
    PLATFORM_ADD = "PLATFORM_ADD",
    PLATFORM_GET = "PLATFORM_GET",
    PLATFORM_SEARCH = "PLATFORM_SEARCH",
    PLATFORM_UPDATE = "PLATFORM_UPDATE",
    PLATFORM_REMOVE = "PLATFORM_REMOVE",
    AUTHORIZATION_ADD = "AUTHORIZATION_ADD",
    AUTHORIZATION_GET = "AUTHORIZATION_GET",
    AUTHORIZATION_SEARCH = "AUTHORIZATION_SEARCH",
    AUTHORIZATION_UPDATE = "AUTHORIZATION_UPDATE",
    AUTHORIZATION_REMOVE = "AUTHORIZATION_REMOVE",
    AUTHORIZATION_APPLY = "AUTHORIZATION_APPLY",
    AUTHORIZATION_FORBIDDEN = "AUTHORIZATION_FORBIDDEN",
    AUTHORIZATION_REFRESH = "AUTHORIZATION_REFRESH",
    RULE_ADD = "RULE_ADD",
    RULE_ALL = "RULE_ALL",
    RULE_GET = "RULE_GET",
    RULE_UPDATE = "RULE_UPDATE",
    RULE_REMOVE = "RULE_REMOVE",
}


export class AuthorizationPermissionContainer extends BaseContainer {

    platformAdd: any;
    platformGet: any;
    platformSearch: any;
    platformUpdate: any;
    platformRemove: any;
    authorizationAdd: any;
    authorizationGet: any;
    authorizationSearch: any;
    authorizationUpdate: any;
    authorizationRemove: any;
    authorizationApply: any;
    authorizationForbidden: any;
    authorizationRefresh: any;
    ruleAdd: any;
    ruleAll: any;
    ruleGet: any;
    ruleUpdate: any;
    ruleRemove: any;

    constructor(initialState: any){
        super(initialState);

        this.platformAdd = this.createAsynchronizationAction(
            "staff.permission.platform.add",
            config.defaultFlag,
            AuthorizationPermissionTypes.PLATFORM_ADD
        );
        this.platformGet = this.createAsynchronizationAction(
            "staff.permission.platform.get",
            config.defaultFlag,
            AuthorizationPermissionTypes.PLATFORM_GET
        );
        this.platformSearch = this.createAsynchronizationAction(
            "staff.permission.platform.search",
            config.defaultFlag,
            AuthorizationPermissionTypes.PLATFORM_SEARCH
        );
        this.platformUpdate = this.createAsynchronizationAction(
            "staff.permission.platform.update",
            config.defaultFlag,
            AuthorizationPermissionTypes.PLATFORM_UPDATE
        );
        this.platformRemove = this.createAsynchronizationAction(
            "staff.permission.platform.remove",
            config.defaultFlag,
            AuthorizationPermissionTypes.PLATFORM_REMOVE
        );
        this.authorizationGet = this.createAsynchronizationAction(
            "staff.permission.authorization.get",
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_GET
        );
        this.authorizationSearch = this.createAsynchronizationAction(
            "staff.permission.authorization.search",
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_SEARCH
        );
        this.authorizationUpdate = this.createAsynchronizationAction(
            "staff.permission.authorization.update",
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_UPDATE
        );
        this.authorizationRemove = this.createAsynchronizationAction(
            "staff.permission.authorization.remove",
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_REMOVE
        );
        this.authorizationAdd = this.createAsynchronizationAction(
            "staff.permission.authorization.authorize",
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_ADD
        );
        this.authorizationApply = this.createAsynchronizationAction(
            'staff.permission.authorization.apply',
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_APPLY
        );
        this.authorizationForbidden = this.createAsynchronizationAction(
            'staff.permission.authorization.forbidden',
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_FORBIDDEN
        );
        this.authorizationRefresh = this.createAsynchronizationAction(
            'staff.permission.authorization.refresh',
            config.defaultFlag,
            AuthorizationPermissionTypes.AUTHORIZATION_REFRESH
        );
        this.ruleAdd = this.createAsynchronizationAction(
            'staff.permission.rule.add',
            config.defaultFlag,
            AuthorizationPermissionTypes.RULE_ADD
        );
        this.ruleAll = this.createAsynchronizationAction(
            'staff.permission.rule.all',
            config.defaultFlag,
            AuthorizationPermissionTypes.RULE_ALL
        );
        this.ruleGet = this.createAsynchronizationAction(
            'staff.permission.rule.get',
            config.defaultFlag,
            AuthorizationPermissionTypes.RULE_GET
        );
        this.ruleUpdate = this.createAsynchronizationAction(
            'staff.permission.rule.update',
            config.defaultFlag,
            AuthorizationPermissionTypes.RULE_UPDATE
        );
        this.ruleRemove = this.createAsynchronizationAction(
            'staff.permission.rule.remove',
            config.defaultFlag,
            AuthorizationPermissionTypes.RULE_REMOVE
        );
    }

    loadActions(): any{
        return {
            platformAdd: this.platformAdd,
            platformGet: this.platformGet,
            platformSearch: this.platformSearch,
            platformUpdate: this.platformUpdate,
            platformRemove: this.platformRemove,
            authorizationAdd: this.authorizationAdd,
            authorizationGet: this.authorizationGet,
            authorizationSearch: this.authorizationSearch,
            authorizationUpdate: this.authorizationUpdate,
            authorizationRemove: this.authorizationRemove,
            authorizationApply: this.authorizationApply,
            authorizationForbidden: this.authorizationForbidden,
            authorizationRefresh: this.authorizationRefresh,
            ruleAdd: this.ruleAdd,
            ruleAll: this.ruleAll,
            ruleGet: this.ruleGet,
            ruleUpdate: this.ruleUpdate,
            ruleRemove: this.ruleRemove,
        }
    }

    loadReducer(): any{
        return {
            [this.platformAdd.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.platformGet.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                let newPlatform = action.payload.platformInfo;
                return Object.assign({}, state, {
                    platformCurrent: newPlatform
                })
            },
            [this.platformSearch.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                let newPlatformList = {
                    dataList: action.payload.dataList,
                    total: action.payload.total,
                    totalPage: action.payload.totalPage
                }
                return Object.assign({}, state, {
                    platformList: newPlatformList
                })
            },
            [this.platformUpdate.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.platformRemove.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.authorizationGet.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                let authorization = action.payload.authorizationInfo;
                return Object.assign({}, state, {
                    authorizationCurrent: authorization
                })
            },
            [this.authorizationSearch.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                let newPlatformList = {
                    dataList: action.payload.dataList,
                    total: action.payload.total,
                    totalPage: action.payload.totalPage
                }
                return Object.assign({}, state, {
                    authorizationList: newPlatformList
                })
            },
            [this.authorizationUpdate.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.authorizationRemove.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.authorizationAdd.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.authorizationApply.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.authorizationForbidden.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.authorizationRefresh.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.ruleAdd.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.ruleAll.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                    ruleList:{
                        dataList: action.payload.dataList,
                        total: action.payload.dataList.length,
                    }
                })
            },
            [this.ruleGet.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                    ruleCurrent: action.payload.ruleInfo
                })
            },
            [this.ruleUpdate.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.ruleRemove.fulfilled.toString()]: (state: AuthorizationPermissionState, action: any) => {
                return Object.assign({}, state, {
                })
            },
        }
    }

}
