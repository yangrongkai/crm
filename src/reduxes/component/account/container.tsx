'use strict'


import { handleActions } from 'redux-actions';


import { hex_md5 } from 'common/utils/security/CryptoMd5.js';
import { AccountState } from './model';
import { BaseContainer } from 'reduxes/tools/container';
import * as config from  '&/config.js';

export enum AccountType {
    LOGIN_ACCOUNT = 'LOGIN_ACCOUNT',
    UPDATE_INFORMATION = 'UPDATE_INFORMATION'
}

export class AccountContainer extends BaseContainer {
    initialState: any;
    loginAccount: any;
    updateModel: any;

    constructor(initialState: any){
        super(initialState);

        this.initialState = initialState;
        this.loginAccount = this.createAsynchronizationAction(config.defaultFlag, AccountType.LOGIN_ACCOUNT);
        this.updateModel = this.createAction(
            AccountType.UPDATE_INFORMATION,
            (infos: any): any => infos
        );
    }

    actions(): any{
        return {
            loginAccount: this.loginAccount,
            updateModel: this.updateModel,
        }
    }

    reducer(): any{
        return handleActions<AccountState, any>(
            {
                [this.loginAccount.pending.toString()]: (state, action) => {
                    console.log('action进行中', state, action)
                    return Object.assign({}, state, {
                        isLoading: true
                    });
                },
                [this.loginAccount.fulfilled.toString()]: (state, action) => {
                    console.log('action成功了', state, action)
                    let result = action.payload
                    return Object.assign({}, state, result, {
                        isLoading: false,
                        test : result.accessToken,
                        /*
                        accessToken: result['access_token'],
                        renewFlag: result['renew_flag'],
                        expirteTime: result['expire_time'],
                        */
                    })
                },
                [this.loginAccount.rejected.toString()]: (state, action) => {
                    console.log('action失败了')
                    return Object.assign({}, state, {
                        isLoading: false
                    })
                },
                [AccountType.UPDATE_INFORMATION]: (state, action) => {
                    if(action.payload.password != null){
                        action.payload.password = hex_md5(action.payload.password)
                    }
                    return Object.assign({}, state, action.payload, {
                    })
                }
            },
            this.initialState
        );
    }
}
