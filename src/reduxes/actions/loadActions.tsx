'use strict';


import { createAction } from 'redux-actions';


export namespace LoadActions {
    export enum Type {
        LOADING = 'LOADING',
        LOADED = 'LOADED'
    }
    export const loading = createAction(Type.LOADING);
    export const loaded = createAction(Type.LOADED);
}

export type LoadActions = Omit<typeof LoadActions, 'Type'>;
