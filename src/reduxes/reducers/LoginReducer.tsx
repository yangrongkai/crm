'use strict'


import { handleActions } from 'redux-actions';

import { LoginActions } from 'reduxes/actions';
import { AccountModel } from 'reduxes/models';
import * as RootState from './state';


const initialState: RootState.LoginState = {
    username: "",
    password: "",
    isLoading: false
}

export const LoginReducer = handleActions<RootState.LoginState, AccountModel>(
    {
        [LoginActions.loginAccount.pending.toString()]: (state, action) => {
            console.log('action进行中')
            return Object.assign({}, state, {
                isLoading: true
            });
        },
        [LoginActions.loginAccount.fulfilled.toString()]: (state, action) => {
            console.log('action成功了')
            return Object.assign({}, state, {
                isLoading: false
            })
        },
        [LoginActions.loginAccount.rejected.toString()]: (state, action) => {
            console.log('action失败了')
            return Object.assign({}, state, {
                isLoading: false
            })
        },
    },
    initialState
);
