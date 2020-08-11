'use strict'


import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { AccountState } from './model';
import { BaseContainer } from 'reduxes/tools/container';
import * as config from  '&/config.js';


export enum AccountType {
    LOGIN_ACCOUNT = 'LOGIN_ACCOUNT',
    LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT',
}

export class AccountContainer extends BaseContainer {
    loginAccount: any;
    logoutAccount: any;

    constructor(initialState: any){
        super(initialState);

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
    }

    loadActions(): any{
        return {
            loginAccount: this.loginAccount,
            logoutAccount: this.logoutAccount,
        }
    }

    loadReducer(): any{
        return {
                [this.loginAccount.fulfilled.toString()]: (state: AccountState, action: any) => {
                    let result = action.payload
                    TokenConstant.save({
                        [TokenEnum.ACCESS_TOKEN]: result.accessToken,
                        [TokenEnum.RENEW_FLAG]: result.renewFlag,
                        [TokenEnum.EXPIRE_TIME]: result.expireTime,
                    });
                },
                [this.logoutAccount.fulfilled.toString()]: (state: AccountState, action: any) => {
                    TokenConstant.remove();
                    return Object.assign({}, state, {
                        accessToken: "",
                        renewFlag: "",
                        expireTime: "",
                    })
                },
        }
    }
}
