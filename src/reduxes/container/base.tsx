'use strict'


import { createAction } from 'redux-promise-middleware-actions';
import { createAsyncAction } from 'redux-promise-middleware-actions';


import { apiRouter } from 'common/api';


export interface BaseContainerInterface {
    initialState: any;
    actions(): any;
    reducer(): any;
}


export abstract class BaseContainer implements BaseContainerInterface {
    initialState: any;

    constructor(initialState: any){
        this.initialState = initialState;
    }

    createAsynchronizationAction(serverFlag: string, actionType: string){
        return createAsyncAction(actionType, (api: string, params: any) => {
            return apiRouter.router(serverFlag, api).request(params);
        });
    }

    createAction(actionType: string){
        return createAction(actionType);
    }

    abstract actions(): any;
    abstract reducer(): any;
}
