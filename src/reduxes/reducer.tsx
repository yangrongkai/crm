'use strict'


import { combineReducers } from 'redux';
import * as components from './component'; 


export interface RootState {
    app: components.AppState;
    person: components.PersonState;
    enterprise: components.EnterpriseState;
    authorizationPermission: components.AuthorizationPermissionState;
    router?: any;
}


export const rootReducer = combineReducers<RootState>({
    app: components.appRedux.reducer(),
    person: components.personRedux.reducer(),
    authorizationPermission: components.authorizationPermissionRedux.reducer(),
    enterprise: components.enterpriseRedux.reducer(),
});

