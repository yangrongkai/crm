'use strict'


import { SearchModel } from 'reduxes/tools/model';

/** Login model definitions **/
export interface EnterpriseModel {
    id: number;
    name: string;
}

export type EnterpriseState = SearchModel<Partial<EnterpriseModel>>;
