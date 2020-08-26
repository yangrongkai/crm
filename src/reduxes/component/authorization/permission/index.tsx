'use strict'


import { AuthorizationPermissionContainer } from './container';
export { AuthorizationPermissionState } from './model';

export const authorizationPermissionRedux = new AuthorizationPermissionContainer({
    platformList: {
        dataList: [],
        total: 0,
        totalPage: 0,
    },
    platformCurrent:{
    },
    ruleList: {
        dataList: [],
        total: 0,
    },
    ruleCurrent: {
    },
    authorizationList: {
        dataList: [],
        total: 0,
        totalPage: 0,
    },
    authorizationCurrent: {
    },
});
