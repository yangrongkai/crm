'use stict'


/** load model definitions **/
import { handleActions } from 'redux-actions';

import { LoadType } from 'reduxes/actions';
import { LoadModel } from 'reduxes/models';
import * as RootState from './state';


const initialState: RootState.LoadState = {
    isLoading: false
}

export const LoadReducer = handleActions<RootState.LoadState, LoadModel>(
    {
        [LoadType.LOADING]: (state, action) => {
            return Object.assign({}, state, {
                isLoading: true
            });
        },
        [LoadType.LOADED]: (state, action) => {
            return Object.assign({}, state, {
                isLoading: false
            });
        }
    },
    initialState
);
