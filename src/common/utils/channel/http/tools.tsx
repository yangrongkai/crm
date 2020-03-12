'use stict'


/**
 * Created by Roy on 2020/3/6.
 * http通用工具函数
 */
import * as qs from 'qs'
import axios from 'axios'
import { message } from 'antd'


export class HttpRequest {

    static get(url: string, msg: string = '网络传输异常', headers: any){
        axios.get(url, headers)
            .then(( res: any ) => res.data)
            .catch(( err: any ) => {
                console.log(err)
                message.warn(msg)      
            })
    }

    static post(url: string, data: any, headers: any = {}, isqs: boolean = true, msg: string = '网络传输异常'){
        let parameters: any = data;
        if( isqs ){
            parameters = qs.stringify(data);
        }
        return axios.post(url, parameters, headers)
            .then(( res: any ) => {
                if( res.status === 200 ){
                    return res.data;
                } else {
                    message.warn(msg);
                }
            })
            .catch(( err: any ) => {
                console.log(err)
                message.warn(msg)
            })
        
    }

    
    static file(url: string , formData: any, msg: string = '网络传输异常'){
        let headers: any = {'Content-Type': 'multipart/form-data'}
        return this.post(url, formData, headers, false)
    }

}
