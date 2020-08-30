'use strict'


import { RouteConfig } from 'react-router-config';

import {
    PlatformManager,
    RuleGroupManager,
    OrganizationManager,
    PositionManager,
    StaffManager,
} from 'containers/base/permission';

export const permissionPaths: RouteConfig[] = [
    {
        path: "/permissionPlatform",
        exact: true,
        component: PlatformManager as any,
    },
    {
        path: "/permissionRuleGroup",
        exact: true,
        component: RuleGroupManager as any,
    },
    {
        path: "/permissionOrganization",
        exact: true,
        component: OrganizationManager as any,
    },
    {
        path: "/permissionPosition",
        exact: true,
        component: PositionManager as any,
    },
    {
        path: "/permissionStaff",
        exact: true,
        component: StaffManager as any,
    },
]
