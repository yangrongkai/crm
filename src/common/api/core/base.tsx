'use strict'


import * as config from '&/config.js';
import { message } from 'antd';
import { HttpRequest } from 'common/utils/channel/http';
import { signatureHelper } from 'common/api/tools';
import { FieldSetHelper } from 'common/api/fieldSet';
import { Server } from 'common/api/server'


export abstract class BaseApi {

    name: string;
    description: string;
    accessUrl: string;
    server: Server;
    parmsHelper: FieldSetHelper;
    returnHelper: FieldSetHelper;
    mockData: any;

    constructor(name: string, server: Server, description: string = ""){
        this.name = name;
        this.description = description;
        this.parmsHelper = new FieldSetHelper();
        this.returnHelper= new FieldSetHelper();
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

    request(params: any){
        let requestParms = this.parmsHelper.parse(params)
        let header = this._generateProtocolHeader();
        let request = Object.assign({}, header, requestParms)
        request['sign'] = signatureHelper.getSignature(request)
        console.log("我正在请求服务器")
        if( config.debug ){
            return new Promise(
                (resolve, reject) => {
                    var timeOut = Math.random() * 2;
                    setTimeout(function () {
                        console.log("我得到了假数据返回的结果")
                        if (timeOut < 1) {
                            resolve('200 OK');
                        }
                        else {
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
                console.log("我得到了服务器的结果")
                let { isSuccess, result } = this._parseResponseHeader(res)
                if( !isSuccess ){
                    message.warn(result.msg)
                    throw new Error(result.msg);
                } else {
                    result = this.receive(result);
                }
                return result;
            });
        }
    }
    
    receive(result: any): any{
        let responseResult = this.returnHelper.parse(result);
        return responseResult;
    }

    toString(): string{
        return "";
    }

}
