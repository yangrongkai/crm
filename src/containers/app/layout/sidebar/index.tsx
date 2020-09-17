'use strict';


import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Menu, Layout } from 'antd';


import { sidebarMenu } from 'schema/menu';
import { MenuElement, MenuElementHelper } from 'common/interface';
import { authorizePermission } from 'common/utils/permission';
import {
    RootState,
    AppState, 
    appRedux,
    PersonState, 
    personRedux,
} from 'reduxes';
import * as config from '&/config.js';
import './index.less';



export interface SidebarProps {
    app: AppState;
    appHelper: any;
    person: PersonState;
    personHelper: any;
}

export interface SidebarState{
    openKeys: string[];
    level1KeySet: any;
    level2KeyMap: any;
    menuHelper: MenuElementHelper;
}

@connect(
    (state: RootState, ownProps): Pick<SidebarProps, 'app' | 'person'> => {
        console.log("sidebar 数据回流到这里-----》》》》》 ", state, ownProps)
        return { app: state.app, person: state.person };
    },
    (dispatch: Dispatch): Pick<SidebarProps, 'appHelper' | 'personHelper'> => {
        console.log(" sidebar 数据绑定到这里-----》》》》》 ", dispatch) 
        return {
            appHelper: bindActionCreators(appRedux.actions(), dispatch),
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class Sidebar extends React.PureComponent<SidebarProps, SidebarState> {

  
    constructor(props: SidebarProps, context?: any){
        super(props, context);
        let menuHelper = new MenuElementHelper(sidebarMenu);
        let firstKey: string = (menuHelper.root.getChild()[0]).path || "";
        let openKeys = firstKey === "" ? [] : [firstKey];
        let elementLevel1 = menuHelper.getElementByLevel(1);
        let level1KeySet = new Set(elementLevel1.map( (item: MenuElement) => item.path ));
        let level2KeyMap = new Map();
        for(let element1 of elementLevel1){
            let child = element1.getChild();
            if( child.length > 0 ){
                for(let element2 of child){
                    level2KeyMap.set(element2.path, element1.path);
                }
            }
        }
        
        this.state = {
            openKeys,
            level1KeySet,
            level2KeyMap,
            menuHelper
        };
    }

    transFormMenuItem(obj: MenuElement) {
        return authorizePermission(
            obj.auth,
            this.props.person.permission,
            (
                <Menu.Item key={obj.path} style={{ margin: '0px' }}>
                    { obj.icon && <obj.icon /> }
                    { obj.level === 1 && !obj.icon && <span className="invisible-nav-text">{obj.name[0]}</span> }
                    <Link to={obj.router} style={{ display: 'inline' }}><span className="nav-text">{obj.name}</span></Link>
                </Menu.Item>
            ),
            config.allowPermission
        )
    };


    establishMenu(menuHelper: MenuElementHelper): JSX.Element[]{
        let child = menuHelper.root.getChild();
        let menuJSX = child.map( (level1: MenuElement)  => {
            let child1 = level1.getChild();
            if (child1.length > 0) {
                let level2menu = child1.map((level2: MenuElement) => {
                    let child2 = level2.getChild();
                    if (child2.length > 0) {
                        const level3menu = child2.map((level3: MenuElement) => {
                            return this.transFormMenuItem(level3);
                        });
            
                        return authorizePermission(
                            level2.auth,
                            this.props.person.permission,
                            (
                                <Menu.SubMenu key={level2.path} title={level2.icon ? <span><level2.icon />{level2.name}</span> : level2.name}>
                                    {level3menu}
                                </Menu.SubMenu>
                            ),
                            config.allowPermission
                        )
                    } else {
                        return this.transFormMenuItem(level2);
                    }
                });

                let level1Title;
                if (level1.icon) {
                    level1Title = (<span><level1.icon /><span className="nav-text">{level1.name}</span></span>);
                } else {
                    level1Title = <span><span className="invisible-nav-text">{level1.name[0]}</span> <span className="nav-text">{level1.name}</span></span>;
                }

                return authorizePermission(
                    level1.auth,
                    this.props.person.permission,
                    (
                        <Menu.SubMenu key={level1.path} title={level1Title}>
                            {level2menu}
                        </Menu.SubMenu>
                    ),
                    config.allowPermission
                )
            }
            else {
                const tmp = this.transFormMenuItem(level1);
                return tmp;
            }
        })
        return menuJSX.filter((element) => element != undefined)
    }

    handleOpenChange = (openKeys: string[]) => {
        if (!config.sidebar.autoMenuSwitch) {
            this.setState({openKeys});
            return;
        }
    
        const newOpenKeys = [];
    
        let lastKey = '';
        for (let i = openKeys.length; i >= 0; i--) {
            if (this.state.level1KeySet.has(openKeys[i])) {
                lastKey = openKeys[i];
                break;
            }
        }

        for (const key of openKeys) {
            const ancestor = this.state.level2KeyMap.get(key);
            if (ancestor === lastKey) {
                newOpenKeys.push(key);
            }
        }
        newOpenKeys.push(lastKey);
        this.setState({openKeys: newOpenKeys});
    };
  
    handleSelect = (item: any) => {
        if (config.sidebar.autoMenuSwitch && this.state.level1KeySet.has(item.key) && this.state.openKeys.length > 0) {
            this.setState({openKeys: []});
        }
    };
  
    render() {
        let menuJSX = this.establishMenu(this.state.menuHelper);
        return (
            <Layout.Sider trigger={null} collapsible collapsed={this.props.app.isCollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline"
                    onOpenChange={this.handleOpenChange}
                    onSelect={this.handleSelect}
                    openKeys={this.props.app.isCollapsed ? [] : this.state.openKeys}>
                    {menuJSX}
                </Menu>
            </Layout.Sider>
        );
    }
  
};
