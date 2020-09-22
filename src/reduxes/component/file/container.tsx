'use strict'


import { BaseContainer } from 'reduxes/tools/container';
import { FileState } from './model';
import * as config from  '&/config.js';


export enum FileTypes {
    FILE_UPLOAD = 'FILE_UPLOAD'
}


export class FileContainer extends BaseContainer {

    fileUpload: any;

    constructor(initialState: any){
        super(initialState);

        this.fileUpload = this.createAsynchronizationAction(
            'file.upload',
            "file",
            FileTypes.FILE_UPLOAD
        );
    }

    loadActions(): any{
        return {
            fileUpload: this.fileUpload,
        }
    }

    loadReducer(): any{
        return {
            [this.fileUpload.fulfilled.toString()]: (state: FileState, action: any) => {
                return Object.assign({}, state, {
                    filePaths: action.payload.filePaths
                })
            },
        }
    }

}
