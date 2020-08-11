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

    createAsynchronizationAction(api: string, serverFlag: string, actionType: string){
        return createAsyncAction(actionType, (params: any):any => {
            try {
                return apiRouter.router(serverFlag, api).request(params);
            } catch (e) {
                console.error("[error] api is not to registed!", serverFlag, api)
            }
        });
    }

    createAction(actionType: string, payloadCreator?: any, metaCreator?: any){
        if (payloadCreator == null && metaCreator == null){
            return createAction(actionType);
        } else if (metaCreator == null){
            return createAction(actionType, payloadCreator);
        } else{
            return createAction(actionType, payloadCreator, metaCreator);
        }
    }

    abstract actions(): any;
    abstract reducer(): any;
}
