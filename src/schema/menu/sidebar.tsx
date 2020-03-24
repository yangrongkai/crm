'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const sidebarMenu: MenuElementInterface[] = [
    {
        key: 'app',  // route时url中的值
        name: '我的第一个菜单',  // 在菜单中显示的名称
        icon: icons.HomeOutlined,  // 图标是可选的
        router:"/",
        child: [
            {
                key: 'one',
                name: '第一个',
                icon: icons.HomeOutlined,  // 图标是可选的
                router:"/one",
            },
            {
                key: 'two',
                name: '第二个',
                icon: icons.HomeOutlined,  // 图标是可选的
                router:"/two",
            },
        ],
    },
    {
        key: 'alone',
        name: '我没有子菜单',
        icon: icons.HomeOutlined,
    },
    {
        key: 'alone2',
        name: '我没有图标',
    },
    {
        key: 'noiconhaha',
        name: '又一个没图标的',
        child: [
            {
                key: 'nesnesnes',
                name: 'N64',
            },
        ],
    },
    {
        key: 'daohang',
        name: '导航',
        icon: icons.HomeOutlined,
        child: [
            {
              key: '555',
              name: '选项5',
            },
            {
                key: 'sanji',  // 最多只能到三级导航
                name: '三级导航',
                icon: icons.HomeOutlined,
                child: [
                    {
                        key: '666',
                        name: '选项6',
                        icon: icons.HomeOutlined,
                    },
                    {
                        key: '777',
                        name: '选项7',
                        icon: icons.HomeOutlined,
                    },
                    {
                        key: '888',
                        name: '选项8',
                    },
                    {
                        key: '999',
                        name: '选项9',
                    },
                ],
            },
        ],
    },
    {
        key: 'test',
        name: '测试',
        icon: icons.HomeOutlined,
        child: [
            {
                key: 'aaa',
                name: '选项a',
            },
            {
                key: 'bbb',
                name: '选项b',
                icon: icons.HomeOutlined,
            },
            {
                key: 'ccc',
                name: '选项c',
            },
            {
                key: 'sanjiaaa',  // 最多只能到三级导航
                name: '三级导航aaa',
                child: [
                    {
                        key: '666aa',
                        name: '选项6',
                        icon: icons.HomeOutlined,
                    },
                ],
            },
            {
                key: 'sanjibbb',  // 最多只能到三级导航
                name: '三级导航bbb',
                child: [
                    {
                        key: '666bb',
                        name: '选项6',
                    },
                ],
            },
          ],
      },
];
