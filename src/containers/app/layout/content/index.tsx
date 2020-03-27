'use strict'


import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Tabs, Breadcrumb, Layout } from 'antd';


import { RootState } from 'reduxes/reducers';
import { AppActions } from 'reduxes/actions';
import { wrapper } from 'containers/components/base';
import * as globalConfig from '&/config.js';
import { sidebarMenu, headerMenu } from 'schema/menu';
import { MenuElement, MenuElementHelper} from 'common/interface';

import { Welcome } from 'containers/pages/welcome';

import './index.less';



export interface ContentProps{
    route: any;
    history: any;
    app: RootState.AppState;
    appHelper: any;
    collapse: boolean;
}

export interface ContentState{
    currentTabKey: string;
    tabPanes: any[];
    tabTitleMap: Map<string, JSX.Element>;
    tabCounter: number;
}

@connect(
    (state: RootState.RootState, ownProps): Pick<ContentProps, 'app' | 'route' | 'history'> => {
        console.log("content 数据回流到这里-----》》》》》 ", state, ownProps)
        return { app: state.app, route: ownProps.route, history: ownProps.history};
    },
    (dispatch: Dispatch): Pick<ContentProps, 'appHelper'> => {
        return {
            appHelper: bindActionCreators(AppActions, dispatch),
        };
    }
)
class ContentComponet extends React.Component<ContentProps, ContentState>{


    constructor(props: ContentProps, context?: any){
        super(props, context);
        this.state = {
            currentTabKey: "",
            tabPanes: [],
            tabTitleMap: this.parseTabTitle(),
            tabCounter: 0
        };

        this.onTabChange = this.onTabChange.bind(this);
        this.onTabRemove = this.onTabRemove.bind(this);
    }

    componentWillMount() {
        this.updateTab(this.props);
    }
  
    componentWillReceiveProps(nextProps: ContentProps) {
        this.updateTab(nextProps);
    }

    parseTabTitle() {
        const tabTitleMap = new Map();
    
        let addItem = ( item: MenuElement ) => {
            if (item.url) {
                return;
            }
            if (item.icon) {
                tabTitleMap.set(item.router, <span className="ant-layout-tab-text"><item.icon />{item.name}</span>);
            } else {
                tabTitleMap.set(item.router, <span className="ant-layout-tab-text">{item.name}</span>);
            }
        };
        let browseMenu = ( item: MenuElement ) => {
            let child = item.getChild();
            if (child.length > 0) {
                child.forEach(browseMenu);
            } else {
                addItem(item);
            }
        };
    
        (new MenuElementHelper(sidebarMenu)).elementMap.forEach(browseMenu);
        (new MenuElementHelper(headerMenu)).elementMap.forEach(browseMenu);
    
        // add 404 page for system
        tabTitleMap.set('/404', <span className="ant-layout-tab-text">Error</span>);
        return tabTitleMap;
    }
  
    getRouteComponent(pathName: string): null | React.Component{
        let root = this.props.route;
        let prefix = root.path === "/" ? "" : root.path;
        for( let route of root.routes ){
            let routePath = prefix + route.path;
            if(routePath === pathName){
                return route.component;
            }
        }
        return null;
    }

    updateTab(nextProps: ContentProps) {
        if (globalConfig.tabMode.enable !== true) {
            return;
        }

        let pathName = nextProps.history.location.pathname;
        if (!this.state.tabTitleMap.has(pathName)) {
            this.state.tabPanes.length = 0;
            return;
        }

        let tabTitle = this.state.tabTitleMap.get(pathName);
        let component = this.getRouteComponent(pathName)

    
        if (globalConfig.tabMode.allowDuplicate === true) {
            this.setState({ tabCounter: this.state.tabCounter + 1 });
            pathName = pathName + this.state.tabCounter;
        }
    
        this.setState({ currentTabKey: pathName });
    
        let exist = false;
        for (let pane of this.state.tabPanes) {
            if (pane.key === pathName) {
                exist = true;
                break;
            }
        }
    
        if (!exist && component !== null) {
            this.state.tabPanes.push({
                key: pathName,
                title: tabTitle,
                content: component,
            });
        }
    }

    onTabRemove(targetKey: any){
        let nextTabKey = this.state.currentTabKey;
        if (this.state.currentTabKey === targetKey) {
            let currentTabIndex = -1;
            this.state.tabPanes.forEach((pane: any, i: any) => {
                if (pane.key === targetKey) {
                    currentTabIndex = i;
                }
            });
  
            if (currentTabIndex > 0) {
                nextTabKey = this.state.tabPanes[currentTabIndex - 1].key;
            } else if (currentTabIndex === 0 && this.state.tabPanes.length > 1) {
                nextTabKey = this.state.tabPanes[currentTabIndex + 1].key;
            }
        }

        let newTabPanes = this.state.tabPanes.filter( (pane: any) => pane.key !== targetKey);
        this.setState({tabPanes: newTabPanes, currentTabKey: nextTabKey});
    }

    onTabChange(activeKey: any){
        this.setState({currentTabKey: activeKey});
    }

    renderBody() {
        if (globalConfig.tabMode.enable === true) {
            if (this.state.tabPanes.length === 0) {
                return <div className="ant-layout-container"><Welcome /></div>;
            } else {
                return ( 
                    <Tabs activeKey={this.state.currentTabKey} type="editable-card"
                             onEdit={this.onTabRemove} onChange={this.onTabChange}
                             hideAdd className="ant-layout-tab">
                        {this.state.tabPanes.map( (pane: any) => (
                            <Tabs.TabPane 
                                tab={pane.title} 
                                key={pane.key} 
                                closable={true}>
                                <pane.content {...this.props}/>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                );
            }
        }
        else {
            return (
                <div>
                    <Breadcrumb routes={this.props.route.routes}/>
                    <div className="ant-layout-container">
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }
  
    render(){
        return (
            <Layout.Content
                    className="site-layout-background"
                    style={{
                      margin: '6px 6px',
                      padding: '4px 8px',
                      minHeight: 280,
                    }}
                >
                {this.renderBody()}
            </Layout.Content>
        )
    }

}

export const Content = wrapper({component: ContentComponet})
