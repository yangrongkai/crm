'use stict'


import { combineReducers } from 'redux';

import * as RootState from './state';
import { LoginReducer } from './loginReducer';
import { LoadReducer } from './loadReducer';


export { RootState };
// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState.RootState>({
    load: LoadReducer as any,
    login: LoginReducer as any,
});
