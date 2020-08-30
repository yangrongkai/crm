'use strict'


import { AuthorizationContainer } from './container';
export { AuthorizationState } from './model';

export const authorizationRedux = new AuthorizationContainer({
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
