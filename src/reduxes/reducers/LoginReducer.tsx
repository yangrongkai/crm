'use strict'


import { handleActions } from 'redux-actions';

import { LoginActions } from 'reduxes/actions';
import { AccountModel } from 'reduxes/models';
import * as RootState from './state';


const initialState: RootState.LoginState = {
    username: "",
    password: "",
    isLoading: false
}

export const LoginReducer = handleActions<RootState.LoginState, AccountModel>(
    {
        [LoginActions.loginAccount.pending.toString()]: (state, action) => {
            console.log('action进行中')
            state = Object.assign({}, state, {
                isLoading: true
            })
            console.log("============>>>>>>>  ", state)
            console.log("============>>>>>>>  ", action)
            console.log("============>>>>>>>  ", action.payload)
            console.log(' &&&&&========>>>>> login account pending end <<<<<=============&&&&')
            return state;
        },
        [LoginActions.loginAccount.fulfilled.toString()]: (state, action) => {
            console.log('action成功了')
            console.log("============>>>>>>>  ", state)
            console.log("============>>>>>>>  ", action)
            console.log("============>>>>>>>  ", action.payload)
            state = Object.assign({}, state, {
                isLoading: false
            })
            return state;
        },
        [LoginActions.loginAccount.rejected.toString()]: (state, action) => {
            console.log('action失败了')
            console.log("============>>>>>>>  ", state)
            console.log("============>>>>>>>  ", action)
            console.log("============>>>>>>>  ", action.payload)
            console.log(' &&&&&========>>>>> login account pending end <<<<<=============&&&&')
            state = Object.assign({}, state, {
                isLoading: false
            })
            return state;
        },
    },
    initialState
);
