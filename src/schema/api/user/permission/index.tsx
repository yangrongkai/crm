'use strict'


import { ApiInterface } from 'common/interface';
import { platformApi } from './platform';


export const permissionApi: ApiInterface[] = [
    ...platformApi,
]
