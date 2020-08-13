'use strict'


import { combineReducers } from 'redux';
import * as components from './component'; 


export interface RootState {
    app: components.AppState;
    person: components.PersonState;
    router?: any;
}


export const rootReducer = combineReducers<RootState>({
    app: components.appRedux.reducer(),
    person: components.personRedux.reducer(),
});

