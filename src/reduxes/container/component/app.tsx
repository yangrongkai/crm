'use strict'


import { handleActions } from 'redux-actions';


import { BaseContainer } from '../base';
import { RootState } from '../state';
import * as models from 'reduxes/models';
import * as config from  '&/config.js';

export enum AppType {
    COLLAPSED = 'changed',
    LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT',
}

export class AppContainer extends BaseContainer {
    initialState: any;
    changeCollapse: any;

    constructor(initialState: any){
        super(initialState);

        this.initialState = initialState;
        this.changeCollapse = this.createAction(AppType.COLLAPSED);
        this.logoutAccount = this.createAsynchronizationAction(config.defaultFlag, AppType.LOGOUT_ACCOUNT);
    }

    actions(): any{
        return {
            changeCollapse: this.changeCollapse,
            logoutAccount: this.logoutAccount,
        }
    }

    reducer(): any{
        return handleActions<RootState.LoginState, models.AccountModel>(
            {
                [AppType.COLLAPSED]: (state, action) => {
                    return Object.assign({}, state ,{
                        isCollapsed: !state.isCollapsed
                    });
                },
                [AppType.LOGOUT_ACCOUNT]: (state, action) => {
                    console.log("注销完成。。。。。。")
                    return state
                }
            },
            this.initialState
        );
    }

}

export const appRedux = new AppContainer({});
