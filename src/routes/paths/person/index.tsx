'use strict'


import { RouteConfig } from 'react-router-config';
import { PersonCentreManager } from 'containers/base/centre';


export const personPaths: RouteConfig[] = [
    {
        path: "/personCentre",
        exact: true,
        component: PersonCentreManager as any,
    }
]
