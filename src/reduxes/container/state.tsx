'use strict'


import * as models from 'reduxes/models';


export type AppState = Partial<models.AppModel>;
export type LoginState = Partial<models.AccountModel>;
export type PersonState = Partial<models.PersonModel>;


export interface RootState {
    login: LoginState;
    app: AppState;
    person: PersonState;
    router?: any;
}
