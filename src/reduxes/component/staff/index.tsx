'use strict'


import { StaffContainer } from './container';
export { StaffState } from './model';

export const staffRedux = new StaffContainer({
    staffSearch: {
        dataList: [],
        total: 0,
        totalPage: 0,
    },
    staffCurrent:{
    },
});
