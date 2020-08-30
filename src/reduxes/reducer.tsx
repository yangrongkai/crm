'use strict'


import { combineReducers } from 'redux';
import * as components from './component'; 


export interface RootState {
    app: components.AppState;
    person: components.PersonState;
    staff: components.StaffState;
    enterprise: components.EnterpriseState;
    permission: components.PermissionState,
    authorization: components.AuthorizationState;
    router?: any;
}


export const rootReducer = combineReducers<RootState>({
    app: components.appRedux.reducer(),
    person: components.personRedux.reducer(),
    staff: components.staffRedux.reducer(),
    authorization: components.authorizationRedux.reducer(),
    permission: components.permissionRedux.reducer(),
    enterprise: components.enterpriseRedux.reducer(),
});

