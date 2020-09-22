'use strict'


import * as config from '&/config.js';
import { message } from 'antd';
import { HttpRequest } from 'common/utils/channel/http';
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

    _postRequest(params: any, extraParams: any, hearders: any, isQs:boolean=true, isForm:boolean=false){
        // 如果转换后的数据以下划线开头，则不进行签名，如： _uploadfiles
        let requestParms = this.parmsHelper.transfer(
            params,
            this.parmsHelper.fmt,
            false,
        )
        let header = this._generateProtocolHeader()
        let signParams: any = {}
        for(let key in requestParms){
            if(!key.startsWith("_")){
                signParams[key] = requestParms[key]
            }
        }
        requestParms['sign'] = signatureHelper.getSignature(signParams)
        let request = Object.assign({}, header, extraParams, requestParms)
        console.log(" request ------------->>>>>>   ", request)
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
                    let success = JSON.stringify(this.mockData.success)
                    return this.receive(JSON.parse(success));
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
                request,
                hearders,
                isQs,
                isForm
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
    
    request(params: any, extraParams: any){
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
