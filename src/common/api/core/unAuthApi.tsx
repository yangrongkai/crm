'use strict'

import { BaseApi } from './base';


export class UnAuthorizationApi extends BaseApi{

    request(params:any){
        return super._request(params, false)
    }

}
