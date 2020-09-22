'use strict'

import { BaseApi } from './base';


export class UnAuthorizationApi extends BaseApi{

    request(params:any, extraParams: any = undefined){
        return super._postRequest(params, extraParams, {})
    }

}
