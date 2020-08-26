'use strict'


import { BaseContainer } from 'reduxes/tools/container';
import { EnterpriseState } from './model';
import * as config from  '&/config.js';



export enum EnterpriseType {
    ENTERPRISE_SEARCH= 'ENTERPRISE_SEARCH',
}

export class EnterpriseContainer extends BaseContainer {
    initialState: any;

    enterpriseSearch: any;

    constructor(initialState: any){
        super(initialState);

        this.initialState = initialState;
        this.enterpriseSearch = this.createAsynchronizationAction(
            "enterprise.search",
            config.defaultFlag,
            EnterpriseType.ENTERPRISE_SEARCH,
        );
    }

    loadActions(): any{
        return {
            enterpriseSearch: this.enterpriseSearch,
        }
    }

    loadReducer(): any{
        return {
            [this.enterpriseSearch.fulfilled.toString()]: (state: EnterpriseState, action: any) => {
                return Object.assign({}, state ,{
                    dataList: action.payload.dataList,
                    total: action.payload.total,
                    totalPage: action.payload.totalPage,
                });
            },
        }
    }
}
