'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const organizationMenu: MenuElementInterface[] = [
    {
        key: 'permission',
        name: '权限管理',
        icon: icons.HomeOutlined,
        router:"/",
        child: [
            {
                key: 'platform',
                name: '平台管理',
                icon: icons.VerifiedOutlined,
                router:"/permissionPlatform",
            },
            {
                key: 'rulegroup',
                name: '权限组管理',
                icon: icons.ClusterOutlined,
                router:"/permissionRuleGroup",
            },
        ],
    },
    {
        key: 'organization',
        name: '组织管理',
        icon: icons.HomeOutlined,
        router:"/",
        child: [
            {
                key: 'department',
                name: '部门列表',
                icon: icons.ClusterOutlined,
                router:"/one",
            },
            {
                key: 'department',
                name: '职位管理',
                icon: icons.ClusterOutlined,
                router:"/one",
            },
            {
                key: 'sublist',
                name: '员工列表',
                icon: icons.TeamOutlined,
                router:"/two",
            },
        ],
    },
];
