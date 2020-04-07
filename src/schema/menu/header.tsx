'use strict'


import * as icons from '@ant-design/icons';
import { MenuElementInterface } from 'common/interface';


export const headerMenu: MenuElementInterface[] = [
    {
        key: 'userMenu',
        name: "用户菜单",
        child: [
            {
                key: 'account',
                name: '账户',
                child: [
                    {
                        key: 'detail',
                        name: '账户详情',
                        icon: icons.IdcardOutlined,
                    },
                    {
                        key: 'reset-password',
                        name: '修改密码',
                        icon: icons.TagOutlined,
                    },
                ],
            },
            {
                key: 'user',
                name: '个人',
                child: [
                    {
                        key: 'information',
                        name: '个人详情',
                        icon: icons.UserOutlined,
                    },
                    {
                        key: 'setting',
                        name: '个人设置',
                        icon: icons.SettingOutlined,
                    },
                    {
                        key: 'modify',
                        name: '修改信息',
                        icon: icons.EditOutlined,
                    },
                ],
            },
            {
                key: 'company',
                name: '公司',
                child: [
                    {
                        key: 'detail',
                        name: '公司详情',
                        icon: icons.HomeOutlined,
                    },
                ],
            },
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
