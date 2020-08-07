'use strict'


import { handleActions } from 'redux-actions';


import { ApiFieldSet } from 'common/api/fieldSet';
import { BaseContainer } from 'reduxes/tools/container';
import { AppState } from './model';
import * as config from  '&/config.js';

export enum AppType {
    COLLAPSED = 'changed',
    LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT',
}

export class AppContainer extends BaseContainer {
    initialState: any;
    changeCollapse: any;
    logoutAccount: any;

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
        return handleActions<AppState, ApiFieldSet>(
            {
                [AppType.COLLAPSED]: (state, action) => {
                    return Object.assign({}, state ,{
                        isCollapsed: !state.isCollapsed
                    });
                },
                [this.logoutAccount.fulfilled.toString()]: (state, action) => {
                    console.log("注销完成。。。。。。")
                    return state
                }
            },
            this.initialState
        );
    }

}
