'use stict'


/** load model definitions **/
import { handleActions } from 'redux-actions';

import { LoadActions } from 'reduxes/actions';
import { LoadModel } from 'reduxes/models';
import { RootState } from './state';


const initialState: RootState.LoadState = {
    isLoading: false
}

export const LoadReducer = handleActions<RootState.LoadState, LoadModel>(
    {
        [LoadActions.Type.LOADING]: (state, action) => {
            console.info('loading --------- ', state, action, '----------')
            state.isLoading = true;
            return state;
        },
        [LoadActions.Type.LOADED]: (state, action) => {
            console.info('loaded --------- ', state, action, '----------')
            state.isLoading = false;
            return state;
        }
    },
    initialState
);
