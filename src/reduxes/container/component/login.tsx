'use strict'


import { handleActions } from 'redux-actions';


import { BaseContainer } from '../base';
import { RootState } from '../state';
import * as models from 'reduxes/models';

export enum LoginType {
    LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'
}

export class LoginContainer extends BaseContainer {
    initialState: any;
    loginAccount: any;

    constructor(initialState: any){
        super(initialState);

        this.initialState = initialState;
        this.loginAccount = this.createAsynchronizationAction('crm', LoginType.LOGIN_ACCOUNT);
    }

    actions(): any{
        return {
            loginAccount: this.loginAccount,
        }
    }

    reducer(): any{
        return handleActions<RootState.LoginState, models.AccountModel>(
            {
                [this.loginAccount.pending.toString()]: (state, action) => {
                    console.log('action进行中')
                    return Object.assign({}, state, {
                        isLoading: true
                    });
                },
                [this.loginAccount.fulfilled.toString()]: (state, action) => {
                    console.log('action成功了')
                    return Object.assign({}, state, {
                        isLoading: false
                    })
                },
                [this.loginAccount.rejected.toString()]: (state, action) => {
                    console.log('action失败了')
                    return Object.assign({}, state, {
                        isLoading: false
                    })
                },
            },
            this.initialState
        );
    }

}

export const loginRedux = new LoginContainer({});
