'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const headerMenu: MenuElementInterface[] = [
    {
        key: 'userMenu',
        name: "用户菜单",
        child: [
            {
                key: 'user',
                name: '个人中心',
                child: [
                    {
                        key: 'person-manager',
                        name: '个人中心',
                        icon: icons.UserOutlined,
                        router:"/personCentre",
                    },
                    /*
                    {
                        key: 'person-message',
                        name: '私人消息',
                        icon: icons.UserOutlined,
                        router:"/person/centre",
                    },
                    */
                ],
            },
            /*
            {
                key: 'company',
                name: '日志管理',
                child: [
                    {
                        key: 'person-logger',
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
