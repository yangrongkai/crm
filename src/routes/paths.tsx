'use strict'


import { RouteConfig } from 'react-router-config';
import { App } from 'containers/app';
import { Login } from 'containers/pages/login';
import { One } from 'containers/pages/one';
import { Two } from 'containers/pages/two';


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
                path: "/one",
                exact: true,
                component: One as any,
            },
            {
                path: "/two",
                exact: true,
                component: Two as any,
            },
        ]
    },

]
