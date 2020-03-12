'use strict'


import * as models from 'reduxes/models';


export interface RootState {
    load: RootState.LoadState
    login: RootState.LoginState;
    router?: any;
}

export namespace RootState {
    // export type TodoState = models.TodoModel[];
    export type LoadState = Partial<models.LoadModel>;
    export type LoginState = Partial<models.AccountModel>;
}
