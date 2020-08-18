'use strict'


import { MenuElementInterface } from 'common/interface';
import { organizationMenu } from './permission'


export const sidebarMenu: MenuElementInterface[] = [
    ...organizationMenu,
];
