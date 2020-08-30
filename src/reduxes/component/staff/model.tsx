'use strict'


import { SearchModel } from 'reduxes/tools/model';
import { PersonModel } from 'reduxes/component/person/model';


export type StaffState = {
    staffSearch: SearchModel<Partial<PersonModel>>;
    staffCurrent: Partial<PersonModel>;
}
