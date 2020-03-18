'use strict';


import { createAction } from 'redux-promise-middleware-actions';


export enum LoadType {
    LOADING = 'LOADING',
    LOADED = 'LOADED'
}

export const LoadActions = {
    loading: createAction(LoadType.LOADING),
    loaded: createAction(LoadType.LOADED)
};
