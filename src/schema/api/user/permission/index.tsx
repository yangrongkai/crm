'use strict'


import { ApiInterface } from 'common/interface';
import { platformApi } from './platform';
import { authorizationApi } from './authorization';
import { ruleApi } from './rule';


export const permissionApi: ApiInterface[] = [
    ...platformApi,
    ...authorizationApi,
    ...ruleApi,
]
