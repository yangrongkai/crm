'use strict'


import moment from 'moment';
import { PersonContainer } from './container';


export { PersonState } from './model';

export const personRedux = new PersonContainer({
    name: "",
    birthday: moment('1970-01-01', "YYYY-MM_DD"),
    phone: "",
    email: "",
    workNumber: "",
    isAdmin: "",
    organization: {
        id: undefined,
        name: ""
    },
    position: {
        id: undefined,
        name: ""
    },
    permission: {
        content: []
    },
    account: {
        username: "",
        nick: "",
        headUrl: "",
        status: "",
        lastLoginTime: moment('1970-01-01', "YYYY-MM_DD"),
        lastLoginIp: "",
        registerIp: "",
        updateTime: moment('1970-01-01', "YYYY-MM_DD"),
        createTime: moment('1970-01-01', "YYYY-MM_DD"),
    },
    company: {
        id: 0,
        name: "",
        licenseNumber: "",
        createTime: "",
    },
});
