'use strict'


import { ApiInterface } from 'common/interface';
import { accountApi } from './account';
import * as fields from 'common/api/fields';
import * as api from 'common/api/core';

export const userApi: ApiInterface[] = [
    ...accountApi,
]
