'use strict'


import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { BaseContainer } from 'reduxes/tools/container';
import { PersonState } from './model';
import * as config from  '&/config.js';


export enum PersonTypes {
    ACCOUNT_LOGIN = 'ACCOUNT_LOGIN',
    ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT',
    PERSON_UPDATA = 'PERSON_UPDATA',
    PERSON_GET = 'PERSON_GET'
}


export class PersonContainer extends BaseContainer {

    personGet: any;
    personUpdate: any;
    accountLogin: any;
    accountLogout: any;

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
                    token: {
                        accessToken: "",
                        renewFlag: "",
                        expireTime: "",
                    }
                })
            },
            [this.personUpdate.fulfilled.toString()]: (state: PersonState, action: any) => {
                console.log('update person action成功了', state, action)
                return Object.assign({}, state, {
                    isLoading: false
                })
            },
            [this.personGet.fulfilled.toString()]: (state: PersonState, action: any) => {
                console.log("-------get -------->>>>>>>>  ", state, action)
                return Object.assign({}, state, action.payload.staffInfo, {
                    headUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597053984761&di=f534be49bc87dabdddabc4b0d743129c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F20%2F20170320112905_5zhQ3.jpeg"
                })
            },
        }
    }

}
