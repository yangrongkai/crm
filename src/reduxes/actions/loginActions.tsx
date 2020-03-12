'use strict';


import { createAction } from 'redux-actions';


export namespace LoginActions {
    export enum Type {
        LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'
    }
    // export const loginAccount= (dispath: any) => createAction(Type.LOGIN_ACCOUNT);
    export const loginAccount= createAction(Type.LOGIN_ACCOUNT);
}

export type LoginActions = Omit<typeof LoginActions, 'Type'>;
