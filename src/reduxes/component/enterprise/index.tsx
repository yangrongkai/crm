'use strict'


import { EnterpriseContainer } from './container';


export { EnterpriseState } from './model';
export const enterpriseRedux = new EnterpriseContainer({
    dataList: [],
    total:0,
    totalPage:0,
});
