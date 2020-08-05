'use strict'

import { BaseApi } from './base';


export class AuthorizationApi extends BaseApi{

    request(params:any){
        return super._request(params, true)
    }

}
