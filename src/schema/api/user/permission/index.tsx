'use strict'


import { ApiInterface } from 'common/interface';
import { platformApi } from './platform';
import { authorizationApi } from './authorization';
import { ruleApi } from './rule';
import { ruleGroupApi } from './rulegroup';
import { positionApi } from './position';
import { organizationApi } from './organization';


export const permissionApi: ApiInterface[] = [
    ...platformApi,
    ...authorizationApi,
    ...ruleApi,
    ...ruleGroupApi,
    ...positionApi,
    ...organizationApi,
]
