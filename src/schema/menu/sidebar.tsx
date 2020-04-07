'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const sidebarMenu: MenuElementInterface[] = [
    {
        key: 'staff',
        name: '组织结构',
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
                key: 'sublist',
                name: '员工列表',
                icon: icons.TeamOutlined,
                router:"/two",
            },
        ],
    },
];
