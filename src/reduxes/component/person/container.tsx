'use strict'


import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { BaseContainer } from 'reduxes/tools/container';
import { PersonState } from './model';
import * as config from  '&/config.js';


export enum PersonTypes {
    ACCOUNT_LOGIN = 'ACCOUNT_LOGIN',
    ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT',
    ACCOUNT_UPDATE = 'ACCOUNT_UPDATE',
    ACCOUNT_RESET_PASSWORD = 'ACCOUNT_RESET_PASSWORD',

    PERSON_UPDATA = 'PERSON_UPDATA',
    PERSON_GET = 'PERSON_GET'
}


export class PersonContainer extends BaseContainer {

    accountLogin: any;
    accountLogout: any;
    accountUpdate: any;
    accountResetPassword: any;

    personGet: any;
    personUpdate: any;

    constructor(initialState: any){
        super(initialState);

        this.accountLogin = this.createAsynchronizationAction(
            "staff.account.login",
            config.defaultFlag,
            PersonTypes.ACCOUNT_LOGIN
        );
        this.accountLogout = this.createAsynchronizationAction(
            "staff.account.logout",
            config.defaultFlag,
            PersonTypes.ACCOUNT_LOGOUT
        );
        this.accountUpdate = this.createAsynchronizationAction(
            "staff.account.update",
            config.defaultFlag,
            PersonTypes.ACCOUNT_UPDATE
        );
        this.accountResetPassword = this.createAsynchronizationAction(
            "staff.account.password.modify",
            config.defaultFlag,
            PersonTypes.ACCOUNT_RESET_PASSWORD
        );
        this.personGet = this.createAsynchronizationAction(
            'staff.myself.get',
            config.defaultFlag,
            PersonTypes.PERSON_GET
        );
        this.personUpdate = this.createAsynchronizationAction(
            'staff.myself.update',
            config.defaultFlag,
            PersonTypes.PERSON_UPDATA
        );
    }

    loadActions(): any{
        return {
            personGet: this.personGet,
            personUpdate: this.personUpdate,
            accountLogin: this.accountLogin,
            accountLogout: this.accountLogout,
            accountUpdate: this.accountUpdate,
            accountResetPassword: this.accountResetPassword,
        }
    }

    loadReducer(): any{
        return {
            [this.accountLogin.fulfilled.toString()]: (state: PersonState, action: any) => {
                let result = action.payload
                TokenConstant.save({
                    [TokenEnum.ACCESS_TOKEN]: result.accessToken,
                    [TokenEnum.RENEW_FLAG]: result.renewFlag,
                    [TokenEnum.EXPIRE_TIME]: result.expireTime,
                });
                return Object.assign({}, state, {
                    token: {
                        accessToken: result.accessToken,
                        renewFlag: result.renewFlag,
                        expireTime: result.expireTime,
                    }
                })
            },
            [this.accountLogout.fulfilled.toString()]: (state: PersonState, action: any) => {
                TokenConstant.remove();
                return Object.assign({}, state, {
                })
            },
            [this.accountUpdate.fulfilled.toString()]: (state: PersonState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.accountResetPassword.fulfilled.toString()]: (state: PersonState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.personUpdate.fulfilled.toString()]: (state: PersonState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.personGet.fulfilled.toString()]: (state: PersonState, action: any) => {
                return Object.assign({}, state, action.payload.staffInfo, {
                })
            },
        }
    }

}
