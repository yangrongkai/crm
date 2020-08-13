'use strict'


import { RouteConfig } from 'react-router-config';
import { App } from 'containers/app';
import { Login } from 'containers/pages/login';
import { PersonCentreManager } from 'containers/components/centre';
import { One } from 'containers/pages/one';
import { Two } from 'containers/pages/two';
import { Welcome } from 'containers/pages/welcome';


export const paths: RouteConfig[] = [
    {
        path: "/login",
        component: Login as any,
    },
    {
        path: "/",
        component: App as any,
        routes:[
            {
                path: "/centre",
                exact: true,
                component: PersonCentreManager as any,
            },
            {
                path: "/one",
                exact: true,
                component: One as any,
            },
            {
                path: "/two",
                exact: true,
                component: Two as any,
            },
            {
                path: "/welcome",
                exact: true,
                component: Welcome as any,
            },
        ]
    },

]
