'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const organizationMenu: MenuElementInterface[] = [
    {
        key: 'authorization',
        name: '授权管理',
        icon: icons.HomeOutlined,
        router:"/",
        child: [
            {
                key: 'permission',
                name: '权限授权',
                icon: icons.VerifiedOutlined,
                router:"/permissionPlatform",
            },
        ],
    },
    {
        key: 'permission',
        name: '权限管理',
        icon: icons.HomeOutlined,
        router:"/",
        child: [
            {
                key: 'rulegroup',
                name: '权限组管理',
                icon: icons.ClusterOutlined,
                router:"/permissionRuleGroup",
            },
            {
                key: 'department',
                name: '部门管理',
                icon: icons.ClusterOutlined,
                router:"/permissionOrganization",
            },
            {
                key: 'position',
                name: '职位管理',
                icon: icons.ClusterOutlined,
                router:"/permissionPosition",
            },
            {
                key: 'sublist',
                name: '员工列表',
                icon: icons.TeamOutlined,
                router:"/permissionStaff",
            },
        ],
    },
];
