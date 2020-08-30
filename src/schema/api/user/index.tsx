'use strict'


import { ApiInterface } from 'common/interface';
import { accountApi } from './account';
import { myselfApi } from './myself';
import { staffApi } from './staff';
import { permissionApi } from './permission';


export const userApi: ApiInterface[] = [
    ...accountApi,
    ...myselfApi,
    ...staffApi,
    ...permissionApi,
]
