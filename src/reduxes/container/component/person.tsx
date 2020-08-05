'use strict'


import { handleActions } from 'redux-actions';


import { BaseContainer } from '../base';
import { PersonState } from '../state';
import * as models from 'reduxes/models';
import * as config from  '&/config.js';

export enum PersonType {
    UPDATA = 'UPDATA',
    GET = 'GET'
}

export class PersonContainer extends BaseContainer {
    initialState: any;
    updatePerson: any;
    getPerson: any;

    constructor(initialState: any){
        super(initialState);

        this.initialState = initialState;
        this.updatePerson = this.createAsynchronizationAction(config.defaultFlag, PersonType.UPDATA);
        this.getPerson = this.createAsynchronizationAction(config.defaultFlag, PersonType.GET);
    }

    actions(): any{
        return {
            updatePerson: this.updatePerson,
            getPerson: this.getPerson,
        }
    }

    reducer(): any{
        return handleActions<PersonState, models.PersonModel>(
            {
                [this.updatePerson.pending.toString()]: (state, action) => {
                    console.log('action进行中')
                    return Object.assign({}, state, {
                        isLoading: true
                    });
                },
                [this.updatePerson.fulfilled.toString()]: (state, action) => {
                    console.log('action成功了')
                    return Object.assign({}, state, {
                        isLoading: false
                    })
                },
                [this.updatePerson.rejected.toString()]: (state, action) => {
                    console.log('action失败了')
                    return Object.assign({}, state, {
                        isLoading: false
                    })
                },
            },
            this.initialState
        );
    }

}

export const loginRedux = new PersonContainer({});
