'use strict'


import moment from 'moment';
import { PersonContainer } from './container';
import { TokenEnum, TokenConstant } from 'common/utils/persistence';


export { PersonState } from './model';

let token = TokenConstant.get()
export const personRedux = new PersonContainer({
    name: "",
    birthday: moment('1970-01-01', "YYYY-MM_DD"),
    phone: "",
    email: "",
    workNumber: "",
    isAdmin: "",
    token:{
        accessToken: token == null ? "": token[TokenEnum.ACCESS_TOKEN],
        renewFlag: token == null ? "": token[TokenEnum.RENEW_FLAG],
        expireTime: token ==null? "": token[TokenEnum.EXPIRE_TIME],
    },
    account: {
        username: "",
        nick: "",
        headUrl: "",
        state: "",
        lastLoginTime: "",
        lastLoginIp: "",
        registerIp: "",
        updateTime: "",
        createTime: "",
    },
    company: {
        id: 0,
        name: "",
        licenseNumber: "",
        createTime: "",
    },
});
