'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const headerMenu: MenuElementInterface[] = [
    {
        key: 'userMenu',
        name: "用户菜单",
        child: [
            /*
            {
                key: 'account',
                name: '账户',
                child: [
                    {
                        key: 'account-manager',
                        name: '账号管理',
                        icon: icons.IdcardOutlined,
                        router:"/account",
                    },
                ],
            },
            */
            {
                key: 'user',
                name: '个人中心',
                child: [
                    {
                        key: 'person-manager',
                        name: '个人中心',
                        icon: icons.UserOutlined,
                        router:"/centre",
                    },
                ],
            },
            /*
            {
                key: 'company',
                name: '公司',
                child: [
                    {
                        key: 'detail',
                        name: '公司信息',
                        icon: icons.HomeOutlined,
                    },
                ],
            },
            */
        ],
    },
    {
        key: 'notice',
        name: '公告',
        icon: icons.SoundOutlined,
        child: [
            {
                key: 'system',
                name: '系统公告',
                icon: icons.ContainerOutlined,
            },
            {
                key: 'person',
                name: '个人消息',
                icon: icons.MessageOutlined,
            },
        ],
    },
    {
        key: 'logger',
        name: '操作日志',
        icon: icons.ProfileOutlined,
        child: [
            {
                key: 'system',
                name: '系统日志',
                icon: icons.HddOutlined,
            },
        ],
    },
];
