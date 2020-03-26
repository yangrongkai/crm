'use strict'


import { NumberField, StringField} from 'common/api/fields';
import { UnAuthorizationApi, TestApi } from 'common/api/core';


type ApiTypes = UnAuthorizationApi | TestApi;
type FieldTypes = NumberField | StringField;

export interface ApiFiled {
    attr: string;
    type: FieldTypes;

}

export interface MockInterface {
    success: any;
    failure: any;
}

export interface ApiInterface {
    name: string; 
    descriptions: string; 
    servers: string[];
    type: ApiTypes;
    request: ApiFiled[];
    response: ApiFiled[];
    mock: MockInterface;
}
