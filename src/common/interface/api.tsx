'use strict'


// import { NumberField, StringField} from 'common/api/fields';
// import { UnAuthorizationApi, ControllerApi } from 'common/api/core';


// type ApiTypes = UnAuthorizationApi | ControllerApi;
// type FieldTypes = NumberField | StringField;

export interface ApiFiled {
    attr: string;
    alias?: string;
    // type: FieldTypes;
    type: any; // fields

}

export interface MockInterface {
    success: any;
    failure: any;
}

export interface ApiInterface {
    name: string; 
    descriptions: string; 
    servers: string[];
    // type: ApiTypes;
    type: any;
    request: ApiFiled[];
    response: ApiFiled[];
    mock: MockInterface;
}
