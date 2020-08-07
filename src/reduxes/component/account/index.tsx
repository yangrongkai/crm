'use strict'


import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import { AccountContainer } from './container';


export { AccountState } from './model';

let token = TokenConstant.get()
export const accountRedux = new AccountContainer({
    username: "",
    password: "",
    accessToken: token == null ? "": token[TokenEnum.ACCESS_TOKEN], 
    renewFlag: token == null ? "": token[TokenEnum.RENEW_FLAG], 
    expireTime: token ==null? "": token[TokenEnum.EXPIRE_TIME], 
});
