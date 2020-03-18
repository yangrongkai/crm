'use strict'


// import globalConfig from '&/config.js';
import { message } from 'antd';
import { HttpRequest } from 'common/utils/channel/http';
import { signatureHelper } from 'common/api/tools';
import { FieldSetHelper } from 'common/api/fieldSet';
import { IServer } from 'common/api/server'


export abstract class BaseApi {

    server: IServer;
    name: string;
    description: string;
    parmsHelper: FieldSetHelper;
    returnHelper: FieldSetHelper;
    accessUrl: string;

    constructor(name: string, server: IServer, description: string = ""){
        this.name = name;
        this.description = description;
        this.parmsHelper = new FieldSetHelper();
        this.returnHelper= new FieldSetHelper();
        this.server = server;
        this.accessUrl = this._getApiUrl();
    }

    _getApiUrl(): string{
        return "http://localhost:8011/interface/"
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
        return HttpRequest.post(
            this.accessUrl,
            request
        ).then( (res) => {
            console.log("我得到了服务器的结果")
            let { isSuccess, result } = this._parseResponseHeader(res)
            if( !isSuccess ){
                message.warn(result.msg)
            } else {
                result = this.receive(result);
            }
            return result;
        });
    }
    
    receive(result: any): any{
        let responseResult = this.returnHelper.parse(result);
        return responseResult;
    }

    toString(): string{
        return "";
    }

}
