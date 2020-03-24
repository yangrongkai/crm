'use strict'


import * as models from 'reduxes/models';

export type AppState = Partial<models.AppModel>;
export type LoginState = Partial<models.AccountModel>;

export interface RootState {
    app: AppState;
    login: LoginState;
    router?: any;
}

