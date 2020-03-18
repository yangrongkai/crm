'use strict';


// import { Dispatch } from 'redux';
import { apiRouter } from 'common/api';
import { createAsyncAction } from 'redux-promise-middleware-actions';

export enum LoginType {
    LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'
}

const loginAccount = createAsyncAction(LoginType.LOGIN_ACCOUNT, (api: string, params: any) => {
    return apiRouter.router('crm', api).request(params);
});

export const LoginActions = {
    loginAccount 
};
