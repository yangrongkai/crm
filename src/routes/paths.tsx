'use strict'


import { RouteConfig } from 'react-router-config';
// import { App } from 'containers/app';
// import { Footer } from 'containers/app/layout/footer';
import { App } from 'containers/app';
import { Login } from 'containers/pages/login';


export const paths: RouteConfig[] = [
    {
        path: "/login",
        component: Login as any,
    },
    {
        path: "/",
        component: App as any,
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
