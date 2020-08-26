'use strict'


import { userApi } from './user';
import { enterpriseApi } from './enterprise';


export const apiConfig = [
    ...userApi,
    ...enterpriseApi,
]
