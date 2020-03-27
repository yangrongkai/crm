'use stict'


import { combineReducers } from 'redux';

import * as RootState from './state';
import { LoginReducer } from './loginReducer';
import { AppReducer } from './appReducer';


export { RootState };


export const rootReducer = combineReducers<RootState.RootState>({
    login: LoginReducer as any,
    app: AppReducer as any,
});
