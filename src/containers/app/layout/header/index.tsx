'use strict'


import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { Row, Col, Menu, Layout } from 'antd';
import * as icons from '@ant-design/icons';


import { RootState } from 'reduxes/reducers';
import { omit } from 'common/utils';
import { AppActions } from 'reduxes/actions';
import { wrapper } from 'containers/components/base';
import * as globalConfig from '&/config.js';
import { headerMenu } from 'schema/menu';
import { MenuElement, MenuElementHelper } from 'common/interface';
import './index.less';


export interface HeaderProps{
    app: RootState.AppState,
    appHelper: any
}

export interface HeaderState{
    userMenu: JSX.Element;
    menuJSX: JSX.Element[];
    menuHelper: MenuElementHelper;
}

@connect(
    (state: RootState.RootState, ownProps): Pick<HeaderProps, 'app'> => {
        console.log(" header 数据回流到这里-----》》》》》 ", state, ownProps)
        return { app: state.app };
    },
    (dispatch: Dispatch): Pick<HeaderProps, 'appHelper'> => {
        return {
            appHelper: bindActionCreators(omit(AppActions, 'Type'), dispatch),
        };
    }
)
class HeaderComponent extends React.PureComponent<HeaderProps, HeaderState>{

    constructor(props: HeaderProps, context?: any){
        super(props, context);
        let menuHelper = new MenuElementHelper(headerMenu);
        let { userMenu, menuJSX } = this.establishMenu(menuHelper);
        this.state = {
            userMenu,
            menuJSX,
            menuHelper
        }

        this.toggle = this.toggle.bind(this);
    }

    transFormMenuItem(obj: MenuElement) {
        return (
            <Menu.Item key={obj.path}>
                {obj.icon && <obj.icon />}
                {obj.url ? <a target="_blank" href={obj.url}>{obj.name}</a> : <Link to={obj.router}>{obj.name}</Link>}
            </Menu.Item>
        );
    }

    establishMenu(menuHelper: MenuElementHelper): any{
        let logoutMenuItem = (
            <Menu.Item key="logout">
                <icons.LogoutOutlined />
                <a href={`${globalConfig.getAPIPath()}${globalConfig.login.logout}`}>注销</a>
            </Menu.Item>
        );

        let userMenuItems = null;

        let child = menuHelper.root.getChild();
        let menuJSX = child.map( (level1: MenuElement)  => {
            let transformedLevel1Menu;

            let child1 = level1.getChild();
            if (child1.length > 0) {
                let level2menu = child1.map((level2: MenuElement) => {
                    let child2 = level2.getChild();
                    if (child2.length > 0) {
                        const level3menu = child2.map((level3: MenuElement) => {
                            return this.transFormMenuItem(level3);
                        });
            
                        return (
                            <Menu.ItemGroup key={level2.path}
                                 title={level2.icon ? <span><level2.icon />{` ${level2.name}`}</span> : <span>{level2.name}</span>}>
                                <Menu.Divider />
                                {level3menu}
                            </Menu.ItemGroup>
                        );
                    } else {
                        return this.transFormMenuItem(level2);
                    }
                });

                transformedLevel1Menu = (
                    <Menu.SubMenu key={level1.path}
                        title={level1.icon ? <span><level1.icon />{level1.name}</span> : level1.name}>
                        {level2menu}
                    </Menu.SubMenu>
                );
            }
            else {
                transformedLevel1Menu = this.transFormMenuItem(level1);
            }

            if (level1.key === 'userMenu') {
                userMenuItems = transformedLevel1Menu.props.children;
                return null;
            } else {
                return transformedLevel1Menu;
            }

        })

        const userMenu = (
                <Menu.SubMenu title={<span><icons.LogoutOutlined /> 丢失用户信息 </span>}>
                    {userMenuItems && userMenuItems[0] ? userMenuItems : null}
                    <Menu.Divider />
                    {logoutMenuItem}
                </Menu.SubMenu>
            );

        return {
            menuJSX,
            userMenu
        };
    }

    toggle(){
        this.props.appHelper.changeCollapse();
    }

    render() {
        return (
            <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
                <Row>
                    <Col flex="32px">
                        { this.props.app.isCollapsed ? 
                            <icons.MenuUnfoldOutlined className="trigger" onClick={this.toggle}/> : 
                            <icons.MenuFoldOutlined className="trigger" onClick={this.toggle}/> }
                    </Col>
                    <Col flex="auto" style={{ textAlign: "end" }}>
                        <Menu className="header-menu" mode="horizontal">
                            {this.state.menuJSX}
                            {this.state.userMenu}
                        </Menu>
                    </Col>
                </Row>
            </Layout.Header>
        );
    }

}

export const Header = wrapper({component: HeaderComponent})
