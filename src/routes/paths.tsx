'use strict'


import { RouteConfig } from 'react-router-config';
// import { App } from 'containers/app';
// import { Footer } from 'containers/layout/Footer';
import * as layout from 'containers/layout';


export const paths: RouteConfig[] = [
    {
        path: "/",
        // component: App as any,
        component: layout.Login as any,
        /*
        routes:[
            {
                path: "/",
                exact: true,
                component: Welcome
            },
            {
                path: "/hello",
                exact: true,
                component: Hello
            },
            {
                path: "/error",
                exact: true,
                component: Error
            },
        ]
        */
    },
]
