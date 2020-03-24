'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const headerMenu: MenuElementInterface[] = [
    {
        key: 'userMenu',
        name: "用户菜单",
        child: [
            {
                key: 'modifyUser',
                name: '修改用户信息',
                icon: icons.UserOutlined,
                url: 'http://jxy.me',
            },
            {
                key: 'user222',
                name: '药药切克闹',
                icon: icons.UserOutlined,
            },
            {
                key: 'user333',
                name: '选项3',
                child: [
                    {
                        key: 'user333aaa',
                        name: 'user333aaa',
                        icon: icons.UserOutlined,
                    },
                    {
                        key: 'user333bbb',
                        name: 'user333bbb',
                        url: 'http://jxy.me',
                    },
                ],
            },
        ],
    },
    {
        key: 'headerMenu2',
        name: 'header菜单',
        icon: icons.UserOutlined,
        child: [
            {
                key: 'headerMenu111',
                name: '菜单项1',
                icon: icons.UserOutlined,
                url: 'http://jxy.me',
            },
            {
                key: '菜单项2',
                name: '短信表管理',
                url: 'http://jxy.me',
            },
            {
                key: '菜单项3',
                name: '选项3',
                icon: icons.UserOutlined,
                url: 'http://jxy.me',
            },
        ],
    },
    {
        key: 'headerMenu3',
        name: '我没有子菜单',
        icon: icons.UserOutlined,
        url: 'http://jxy.me',
    },
    {
        key: 'headerMenu4',
        name: '我也没有子菜单',
        icon: icons.UserOutlined,
    },
    {
        key: 'headerMenu5',
        name: '我没有图标',
        child: [
            {
                key: 'headerMenu5000000',
                name: '二级导航无子菜单',
            },
            {
                key: 'headerMenu51111',
                name: '三级导航',
                icon: icons.UserOutlined,
                child: [
                    {
                        key: 'headerMenu51111aa',
                        name: '选项6',
                        icon: icons.UserOutlined,
                    },
                    {
                        key: 'headerMenu51111bb',
                        name: '选项7',
                        icon: 'inbox',
                    },
                ],
            },
            {
                key: 'headerMenu52222',
                name: '三级导航无图标',
                child: [
                    {
                        key: 'headerMenu52222aa',
                        name: '选项8',
                    },
                    {
                        key: 'headerMenu52222bb',
                        name: '选项9',
                    },
                ],
            },
        ],
    },
];
