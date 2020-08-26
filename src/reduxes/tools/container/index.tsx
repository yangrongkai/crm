'use strict'


import { message } from 'antd';
import { createAction } from 'redux-promise-middleware-actions';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import { handleActions } from 'redux-actions';
import { ApiFieldSet } from 'common/api/fieldSet';
import { apiRouter } from 'common/api';


export interface BaseContainerInterface {
    initialState: any;
    actions(): any;
    reducer(): any;
}

export enum BaseType {
    UPDATE = 'UPDATE'
}


export abstract class BaseContainer implements BaseContainerInterface {
    initialState: any;
    update: any;

    constructor(initialState: any){
        this.initialState = initialState;
        this.update = this.createAction(
            this.constructor.name + BaseType.UPDATE,
            (infos: any): any => infos
        )
    }

    createAsynchronizationAction(api: string, serverFlag: string, actionType: string){
        return createAsyncAction(actionType, (params: any):any => {
            try {
                console.info(
                    "[request] api is requesting...... serverFlag="
                    + serverFlag
                    + " api="+api
                )
                return apiRouter.router(serverFlag, api).request(params).catch(
                    (result: any)=>{
                        message.warn(result.msg);
                    }
                );
            } catch (e) {
                console.error("[error] api is not to registed!", serverFlag, api, e)
                throw Error("[error] api is not to registed!")
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

    actions(): any{
        const baseActions = {
            update: this.update,
        }
        return Object.assign({}, this.loadActions(), baseActions)
    }

    baseReducer(): any{
        return {
            [this.constructor.name + BaseType.UPDATE]: (state: any, action: any) => {
                return Object.assign({}, state, action.payload, {
                })
            }
        }
    }

    reducer(): any{
        return handleActions<any, ApiFieldSet>(
            Object.assign({}, this.baseReducer(), this.loadReducer()),
            this.initialState
        );
    }

    abstract loadActions(): any;
    abstract loadReducer(): any;
}
