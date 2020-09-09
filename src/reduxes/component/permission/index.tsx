'use strict'


import { PermissionContainer } from './container';
export { PermissionState } from './model';

export const permissionRedux = new PermissionContainer({
    ruleGroupSearch: {
        dataList: [],
        total: 0,
        totalPage: 0,
    },
    ruleGroupCurrent:{
    },
    ruleGroupFilter: {
        dataList: [],
        total: 0,
    },

    positionSearch: {
        dataList: [],
        total: 0,
    },
    positionCurrent:{
    },
    positionFilter: {
        dataList: [],
        total: 0,
    },

    organizationSearch: {
        dataList: [],
        total: 0,
    },
    organizationCurrent:{
        positionList: [],
    },
    organizationFilter: {
        dataList: [],
        total: 0,
    },
});
