'use strict'


import { handleActions } from 'redux-actions';

import { apiRouter } from 'common/api'
import { LoginActions } from 'reduxes/actions';
import { AccountModel } from 'reduxes/models';
import { RootState } from './state';


const initialState: RootState.LoginState = {
    username: "",
    password: "",
}

export const LoginReducer = handleActions<RootState.LoginState, AccountModel>(
    {
        [LoginActions.Type.LOGIN_ACCOUNT]: (state, action) => {
            let params = {'yrk':'a'};
            let api = "demo.test";
            apiRouter.router('crm', api).request(params)
                .then( (result: any) => {
                    console.log(' result =======>>>>>>>>>   ', result)
                } );
            return state;
        }
    },
    initialState
);
