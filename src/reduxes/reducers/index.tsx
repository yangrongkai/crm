'use stict'


import { combineReducers } from 'redux';

import * as RootState from './state';
import { LoginReducer } from './loginReducer';
import { AppReducer } from './appReducer';


export { RootState };


// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState.RootState>({
    login: LoginReducer as any,
    app: AppReducer as any,
});
