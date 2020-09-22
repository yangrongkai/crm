'use strict'


import { userApi } from './user';
import { enterpriseApi } from './enterprise';
import { fileUploadApi } from './file';


export const apiConfig = [
    ...userApi,
    ...enterpriseApi,
    ...fileUploadApi,
]
