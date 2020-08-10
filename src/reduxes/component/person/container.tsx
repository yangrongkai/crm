'use strict'


import { handleActions } from 'redux-actions';


import { ApiFieldSet } from 'common/api/fieldSet';
import { BaseContainer } from 'reduxes/tools/container';
import { PersonState } from './model';
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
        return handleActions<PersonState, ApiFieldSet>(
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
                [this.getPerson.fulfilled.toString()]: (state, action) => {
                    console.log('get person action成功', state, action)
                    return Object.assign({}, state, action.payload.staffInfo, {
                        headUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597053984761&di=f534be49bc87dabdddabc4b0d743129c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F20%2F20170320112905_5zhQ3.jpeg"
                    })
                },
            },
            this.initialState
        );
    }

}
