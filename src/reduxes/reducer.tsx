'use strict'


import { combineReducers } from 'redux';
import * as components from './component'; 


export interface RootState {
    app: components.AppState;
    account: components.AccountState,
    person: components.PersonState;
    router?: any;
}


export const rootReducer = combineReducers<RootState>({
    account: components.accountRedux.reducer(),
    app: components.appRedux.reducer(),
    person: components.personRedux.reducer(),
});

