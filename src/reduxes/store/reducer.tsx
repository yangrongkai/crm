'use strict'


import { combineReducers } from 'redux';


import { RootState, loginRedux, appRedux } from 'reduxes/container';


export { RootState };
export const rootReducer = combineReducers<RootState>({
    login: loginRedux.reducer(),
    app: appRedux.reducer(),
});

