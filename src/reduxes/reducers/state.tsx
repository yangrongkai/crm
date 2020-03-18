'use strict'


import * as models from 'reduxes/models';

export type LoadState = Partial<models.LoadModel>;
export type LoginState = Partial<models.AccountModel> & LoadState;

export interface RootState {
    load: LoadState;
    login: LoginState;
    router?: any;
}

