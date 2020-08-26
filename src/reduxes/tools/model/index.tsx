'use strict'


export interface SearchModel<T> {
    dataList: T[];
    total: number;
    totalPage: number;
}

export interface AllModel<T> {
    dataList: T[];
    total: number;
}
