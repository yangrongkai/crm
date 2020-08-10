'use strict'


/** Login model definitions **/
export interface PersonModel {
    nick: string;
    headUrl: string;
    name: string;
    birthday: string;
    phone: string;
    email: string;
    workNumber: string;
    isAdmin: string;
}

export enum PersonFilter {
}


export type PersonState = Partial<PersonModel>;
