'use strict'


import { ApiInterface } from 'common/interface';
import { accountApi } from './account';
import { myselfApi } from './myself';
import { permissionApi } from './permission';


export const userApi: ApiInterface[] = [
    ...accountApi,
    ...myselfApi,
    ...permissionApi,
]
