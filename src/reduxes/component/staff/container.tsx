'use strict'


import { BaseContainer } from 'reduxes/tools/container';
import { StaffState } from './model';
import * as config from  '&/config.js';


export enum StaffTypes {
    STAFF_ADD = "STAFF_ADD",
    STAFF_GET = "STAFF_GET",
    STAFF_SEARCH = "STAFF_SEARCH",
    STAFF_UPDATE = "STAFF_UPDATE",
}


export class StaffContainer extends BaseContainer {

    staffAdd: any;
    staffGet: any;
    staffSearch: any;
    staffUpdate: any;
    
    constructor(initialState: any){
        super(initialState);

        this.staffAdd = this.createAsynchronizationAction(
            "staff.add",
            config.defaultFlag,
            StaffTypes.STAFF_ADD
        );
        this.staffGet = this.createAsynchronizationAction(
            "staff.get",
            config.defaultFlag,
            StaffTypes.STAFF_GET
        );
        this.staffSearch = this.createAsynchronizationAction(
            "staff.search",
            config.defaultFlag,
            StaffTypes.STAFF_SEARCH
        );
        this.staffUpdate = this.createAsynchronizationAction(
            "staff.update",
            config.defaultFlag,
            StaffTypes.STAFF_UPDATE
        );
    }

    loadActions(): any{
        return {
            staffAdd: this.staffAdd,
            staffGet: this.staffGet,
            staffSearch: this.staffSearch,
            staffUpdate: this.staffUpdate,
        }
    }

    loadReducer(): any{
        return {
            [this.staffAdd.fulfilled.toString()]: (state: StaffState, action: any) => {
                return Object.assign({}, state, {
                })
            },
            [this.staffGet.fulfilled.toString()]: (state: StaffState, action: any) => {
                return Object.assign({}, state, {
                    staffCurrent: action.payload.staffInfo
                })
            },
            [this.staffSearch.fulfilled.toString()]: (state: StaffState, action: any) => {
                return Object.assign({}, state, {
                    staffSearch: {
                        dataList: action.payload.dataList,
                        total: action.payload.total,
                        totalPage: action.payload.totalPage,
                    }
                })
            },
            [this.staffUpdate.fulfilled.toString()]: (state: StaffState, action: any) => {
                return Object.assign({}, state, {
                })
            },
        }
    }
}
