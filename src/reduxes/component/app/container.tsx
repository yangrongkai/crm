'use strict'


import { BaseContainer } from 'reduxes/tools/container';
import { AppState } from './model';


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

    loadActions(): any{
        return {
            changeCollapse: this.changeCollapse,
        }
    }

    loadReducer(): any{
        return {
            [AppType.COLLAPSED]: (state: AppState, action: any) => {
                return Object.assign({}, state ,{
                    isCollapsed: !state.isCollapsed
                });
            },
        }
    }
}
