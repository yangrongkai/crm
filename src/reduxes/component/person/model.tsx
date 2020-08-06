'use strict'


/** Login model definitions **/
export interface PersonModel {
    nick: string;
    head_url: string;
    name: string;
    birthday: string;
    phone: string;
    email: string;
    work_number: string;
    is_admin: string;
}

export enum PersonFilter {
}


export type PersonState = Partial<PersonModel>;
