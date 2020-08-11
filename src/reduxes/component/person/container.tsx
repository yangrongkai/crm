'use strict'


import { BaseContainer } from 'reduxes/tools/container';
import { PersonState } from './model';
import * as config from  '&/config.js';


export enum PersonType {
    ASYNC_UPDATA = 'ASYNC_UPDATA',
    ASYNC_GET = 'ASYNC_GET'
}

export class PersonContainer extends BaseContainer {

    updatePerson: any;
    getPerson: any;

    constructor(initialState: any){
        super(initialState);

        this.updatePerson = this.createAsynchronizationAction(
            'staff.myself.update',
            config.defaultFlag,
            PersonType.ASYNC_UPDATA
        );
        this.getPerson = this.createAsynchronizationAction(
            'staff.myself.get',
            config.defaultFlag,
            PersonType.ASYNC_GET
        );
    }

    loadActions(): any{
        return {
            updatePerson: this.updatePerson,
            getPerson: this.getPerson,
        }
    }

    loadReducer(): any{
        return {
            [this.updatePerson.pending.toString()]: (state: PersonState, action: any) => {
                console.log('update person action进行中', state, action)
                return Object.assign({}, state, {
                    isLoading: true
                });
            },
            [this.updatePerson.fulfilled.toString()]: (state: PersonState, action: any) => {
                console.log('update person action成功了', state, action)
                return Object.assign({}, state, {
                    isLoading: false
                })
            },
            [this.getPerson.fulfilled.toString()]: (state: PersonState, action: any) => {
                return Object.assign({}, state, action.payload.staffInfo, {
                    headUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597053984761&di=f534be49bc87dabdddabc4b0d743129c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F20%2F20170320112905_5zhQ3.jpeg"
                })
            },
        }
    }

}
