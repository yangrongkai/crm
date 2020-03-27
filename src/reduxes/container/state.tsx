'use strict'


import * as models from 'reduxes/models';


export type AppState = Partial<models.AppModel>;
export type LoginState = Partial<models.AccountModel>;


export interface RootState {
    login: LoginState;
    app: AppState;
    router?: any;
}
