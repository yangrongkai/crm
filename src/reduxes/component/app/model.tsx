'use strict'


/** Login model definitions **/
export interface AppModel {
    isCollapsed: boolean
}

export enum AppFilter {
}

export type AppState = Partial<AppModel>;
