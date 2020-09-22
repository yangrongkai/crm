'use strict'

import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { BaseApi } from './base';


export class FileUploadApi extends BaseApi{

    request(params:any, extraParams: any = undefined){
        if(extraParams == undefined){
            extraParams = {}
        }
        extraParams['auth'] = TokenConstant.get()[TokenEnum.ACCESS_TOKEN] 
        let headers: any = {'Content-Type': 'multipart/form-data'}
        return super._postRequest(params, extraParams, headers, false, true)
    }

}
