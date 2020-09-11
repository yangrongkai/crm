'use strict'


import { RouteConfig } from 'react-router-config';
import { App } from 'containers/app';
import { Login } from 'containers/base/login';
import { Welcome } from 'containers/pages/welcome';
import { personPaths } from './person';
import { permissionPaths } from './permission';


export const paths: RouteConfig[] = [
    {
        path: "/login",
        component: Login as any,
    },
    {
        path: "/",
        component: App as any,
        routes:[
            ...personPaths,
            ...permissionPaths,
            {
                path: "/welcome",
                exact: true,
                component: Welcome as any,
            },
        ]
    },

]
