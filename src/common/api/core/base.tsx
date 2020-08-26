'use strict'


import * as config from '&/config.js';
import { message } from 'antd';
import { HttpRequest } from 'common/utils/channel/http';
import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { signatureHelper } from 'common/api/tools';
import { ApiFieldHelper, ApiFieldSet } from 'common/api/fieldSet';
import { Server } from 'common/api/server'


export abstract class BaseApi {

    name: string;
    description: string;
    accessUrl: string;
    server: Server;
    parmsHelper: ApiFieldHelper;
    returnHelper: ApiFieldHelper;
    mockData: any;

    constructor(
        name: string,
        server: Server,
        description: string = "",
        parmsFmt: ApiFieldSet,
        returnFmt: ApiFieldSet,
        mockData: any
    ){
        this.name = name;
        this.description = description;
        this.parmsHelper = new ApiFieldHelper(parmsFmt);
        this.returnHelper= new ApiFieldHelper(returnFmt);
        this.mockData = mockData;

        this.server = server;
        this.accessUrl = this._getApiUrl();
    }

    _getApiUrl(): string{
        return this.server.url;
    }
    
    _generateProtocolHeader(): any{
        return {
            'flag': this.server.flag,
            'api': this.name,
            'timestamp': Date.parse(new Date().toJSON()),
        }
    }

    _parseResponseHeader(response: any): any{
        let isSuccess: boolean =  response.status === 'ok';
        let result: any;
        if( isSuccess ){
            result = response.result;
        } else {
            result =  {
                code: response.code,
                msg: response.msg,
            }
        }
        return {
            isSuccess,
            result
        }
    }

    _request(params: any, is_auth=true){
        let requestParms = this.parmsHelper.transfer(
            params,
            this.parmsHelper.fmt,
            false,
        )
        let header = this._generateProtocolHeader()
        let other = {}
        if(is_auth){
            other = {
                auth: TokenConstant.get()[TokenEnum.ACCESS_TOKEN]
            }
        }
        let request = Object.assign({}, header, other, requestParms)
        request['sign'] = signatureHelper.getSignature(request)
        if( config.debug ){
            return new Promise(
                (resolve, reject) => {
                    var timeOut = Math.random() * 2;
                    setTimeout(function () {
                        if (timeOut < 1  || config.allowAccess) {
                            resolve('200 OK');
                        } else {
                            reject('timeout in ' + timeOut + ' seconds.');
                        }
                    }, timeOut * 1000);
                }
            ).then( 
                (res) => {
                    return this.receive(this.mockData.success);
                }
            ).catch( 
                (res) => {
                    message.warn(this.mockData.failure.msg);
                    // interrupt promise list
                    throw new Error(this.mockData);
                    // return result
                }
            );
        } else {
            return HttpRequest.post(
                this.accessUrl,
                request
            ).then( (res) => {
                let { isSuccess, result } = this._parseResponseHeader(res)
                if( !isSuccess ){
                    throw result;
                } else {
                    result = this.receive(result);
                }
                return result;
            });
        }
    }
    
    request(params: any){
        throw new Error("need to implemented!");
    }

    receive(result: any): any{
        let responseResult = this.returnHelper.transfer(
            result,
            this.returnHelper.fmt,
            true,
        );
        return responseResult;
    }

    toString(): string{
        return "";
    }

}
