'use strict';


import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Menu, Layout } from 'antd';


import { sidebarMenu } from 'schema/menu';
import { MenuElement, MenuElementHelper } from 'common/interface';
import { RootState, appRedux } from 'reduxes';
import * as globalConfig from '&/config.js';
import './index.less';



export interface SidebarProps {
    app: RootState.AppState;
    appHelper: any;
}

export interface SidebarState{
    openKeys: string[];
    menuJSX: JSX.Element[];
    level1KeySet: any;
    level2KeyMap: any;
    menuHelper: MenuElementHelper;
}

@connect(
    (state: RootState.RootState, ownProps): Pick<SidebarProps, 'app'> => {
        console.log("sidebar 数据回流到这里-----》》》》》 ", state, ownProps)
        return { app: state.app };
    },
    (dispatch: Dispatch): Pick<SidebarProps, 'appHelper'> => {
        return {
            appHelper: bindActionCreators(appRedux.actions(), dispatch),
        };
    }
)
export class Sidebar extends React.PureComponent<SidebarProps, SidebarState> {

  
    constructor(props: SidebarProps, context?: any){
        super(props, context);
        let menuHelper = new MenuElementHelper(sidebarMenu);
        let firstKey: string = (menuHelper.root.getChild()[0]).path || "";
        let openKeys = firstKey === "" ? [] : [firstKey];
        let menuJSX = this.establishMenu(menuHelper);
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
            menuJSX,
            level1KeySet,
            level2KeyMap,
            menuHelper
        };
    }
  
    transFormMenuItem(obj: MenuElement) {
        return (
            <Menu.Item key={obj.path} style={{ margin: '0px' }}>
                { obj.icon && <obj.icon /> }
                { obj.level === 1 && !obj.icon && <span className="invisible-nav-text">{obj.name[0]}</span> }
                <Link to={obj.router} style={{ display: 'inline' }}><span className="nav-text">{obj.name}</span></Link>
            </Menu.Item>
        );
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
            
                        return (
                            <Menu.SubMenu key={level2.path} title={level2.icon ? <span><level2.icon />{level2.name}</span> : level2.name}>
                                {level3menu}
                            </Menu.SubMenu>
                        );
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
        
                return (
                    <Menu.SubMenu key={level1.path} title={level1Title}>
                        {level2menu}
                    </Menu.SubMenu>
                )
            }
            else {
                const tmp = this.transFormMenuItem(level1);
                return tmp;
            }
        })
        return menuJSX;
    }

    handleOpenChange = (openKeys: string[]) => {
        if (!globalConfig.sidebar.autoMenuSwitch) {
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
        if (globalConfig.sidebar.autoMenuSwitch && this.state.level1KeySet.has(item.key) && this.state.openKeys.length > 0) {
            this.setState({openKeys: []});
        }
    };
  
    render() {
        return (
            <Layout.Sider trigger={null} collapsible collapsed={this.props.app.isCollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline"
                    onOpenChange={this.handleOpenChange}
                    onSelect={this.handleSelect}
                    openKeys={this.props.app.isCollapsed ? [] : this.state.openKeys}>
                    {this.state.menuJSX}
                </Menu>
            </Layout.Sider>
        );
    }
  
};
