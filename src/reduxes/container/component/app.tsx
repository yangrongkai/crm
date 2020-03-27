'use strict'


import { handleActions } from 'redux-actions';


import { BaseContainer } from '../base';
import { RootState } from '../state';
import * as models from 'reduxes/models';

export enum AppType {
    COLLAPSED = 'changed',
}

export class AppContainer extends BaseContainer {
    initialState: any;
    changeCollapse: any;

    constructor(initialState: any){
        super(initialState);

        this.initialState = initialState;
        this.changeCollapse = this.createAction(AppType.COLLAPSED);
    }

    actions(): any{
        return {
            changeCollapse: this.changeCollapse,
        }
    }

    reducer(): any{
        return handleActions<RootState.LoginState, models.AccountModel>(
            {
                [AppType.COLLAPSED]: (state, action) => {
                    return Object.assign({}, state ,{
                        isCollapsed: !state.isCollapsed
                    });
                }
            },
            this.initialState
        );
    }

}

export const appRedux = new AppContainer({});
