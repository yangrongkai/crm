'use strict'


import { RouteConfig } from 'react-router-config';

import {
    PermissionPlatformManager,
    PermissionRuleGroupManager
} from 'containers/base/permission';

export const permissionPaths: RouteConfig[] = [
    {
        path: "/permissionPlatform",
        exact: true,
        component: PermissionPlatformManager as any,
    },
    {
        path: "/permissionRuleGroup",
        exact: true,
        component: PermissionRuleGroupManager as any,
    },
]
