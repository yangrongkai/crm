'use stict'


/** load model definitions **/
import { handleActions } from 'redux-actions';

import * as config from '&/config.js';
import { AppModel } from 'reduxes/models';
import { AppType } from 'reduxes/actions';
import * as RootState from './state';


const initialState: RootState.AppState = {
    isCollapsed: config.sidebar.collapsible
}

export const AppReducer = handleActions<RootState.AppState, AppModel>(
    {
        [AppType.COLLAPSED]: (state, action) => {
            return Object.assign({}, state ,{
                isCollapsed: !state.isCollapsed
            });
        }
    },
    initialState
);
