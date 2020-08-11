'use strict'


import { handleActions } from 'redux-actions';


import { ApiFieldSet } from 'common/api/fieldSet';
import { hex_md5 } from 'common/utils/security/CryptoMd5.js';
import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { AccountState } from './model';
import { BaseContainer } from 'reduxes/tools/container';
import * as config from  '&/config.js';

export enum AccountType {
    LOGIN_ACCOUNT = 'LOGIN_ACCOUNT',
    LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT',
    UPDATE_INFORMATION = 'UPDATE_INFORMATION'
}

export class AccountContainer extends BaseContainer {
    initialState: any;
    loginAccount: any;
    logoutAccount: any;
    updateModel: any;

    constructor(initialState: any){
        super(initialState);

        this.initialState = initialState;
        this.loginAccount = this.createAsynchronizationAction(
            "staff.account.login",
            config.defaultFlag,
            AccountType.LOGIN_ACCOUNT
        );
        this.logoutAccount = this.createAsynchronizationAction(
            "staff.account.logout",
            config.defaultFlag,
            AccountType.LOGOUT_ACCOUNT
        );
        this.updateModel = this.createAction(
            AccountType.UPDATE_INFORMATION,
            (infos: any): any => infos
        );
    }

    actions(): any{
        return {
            loginAccount: this.loginAccount,
            logoutAccount: this.logoutAccount,
            updateModel: this.updateModel,
        }
    }

    reducer(): any{
        return handleActions<AccountState, ApiFieldSet>(
            {
                [this.loginAccount.pending.toString()]: (state, action) => {
                    return Object.assign({}, state, {
                        isLoading: true
                    });
                },
                [this.loginAccount.fulfilled.toString()]: (state, action) => {
                    let result = action.payload
                    TokenConstant.save({
                        [TokenEnum.ACCESS_TOKEN]: result.accessToken,
                        [TokenEnum.RENEW_FLAG]: result.renewFlag,
                        [TokenEnum.EXPIRE_TIME]: result.expireTime,
                    });
                    return Object.assign({}, state, result, {
                        isLoading: false,
                    })
                },
                [this.loginAccount.rejected.toString()]: (state, action) => {
                    return Object.assign({}, state, {
                        isLoading: false
                    })
                },
                [this.logoutAccount.fulfilled.toString()]: (state, action) => {
                    TokenConstant.remove();
                    return Object.assign({}, state, {
                        accessToken: "",
                        renewFlag: "",
                        expireTime: "",
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
