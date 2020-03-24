'use strict';


import { createAction } from 'redux-promise-middleware-actions';


export enum AppType {
    COLLAPSED = 'changed',
}

export const AppActions = {
    changeCollapse: createAction(AppType.COLLAPSED),
};
