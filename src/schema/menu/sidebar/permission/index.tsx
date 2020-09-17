'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const organizationMenu: MenuElementInterface[] = [
    {
        key: 'auth',
        name: '授权管理',
        auth: "PWVR",
        icon: icons.HomeOutlined,
        router:"/",
        child: [
            {
                key: 'permission',
                name: '权限授权',
                auth: "PWVR-GRNN",
                icon: icons.VerifiedOutlined,
                router:"/permissionPlatform",
            },
        ],
    },
    {
        key: 'permission',
        name: '权限管理',
        auth: "GgLn",
        icon: icons.HomeOutlined,
        router:"/",
        child: [
            {
                key: 'rulegroup',
                name: '权限组管理',
                auth: "GgLn-ENFq",
                icon: icons.ClusterOutlined,
                router:"/permissionRuleGroup",
            },
            {
                key: 'position',
                name: '职位管理',
                auth: "GgLn-jbLV",
                icon: icons.ClusterOutlined,
                router:"/permissionPosition",
            },
            {
                key: 'department',
                name: '部门管理',
                auth: "GgLn-qXEB",
                icon: icons.ClusterOutlined,
                router:"/permissionOrganization",
            },
            {
                key: 'sublist',
                name: '员工列表',
                auth: "GgLn-LkcJ",
                icon: icons.TeamOutlined,
                router:"/permissionStaff",
            },
        ],
    },
];
