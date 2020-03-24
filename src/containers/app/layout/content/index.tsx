'use strict'


import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Tabs, Breadcrumb, Layout } from 'antd';


import { RootState } from 'reduxes/reducers';
import { omit } from 'common/utils';
import { AppActions } from 'reduxes/actions';
import { wrapper } from 'containers/components/base';
import * as globalConfig from '&/config.js';
import { sidebarMenu, headerMenu } from 'schema/menu';

import { Welcome } from 'containers/pages/welcome';

import './index.less';



export interface ContentProps{
    app: RootState.AppState;
    route: any;
    history: any;
    appHelper: any;
    collapse: boolean;
}

export interface ContentState{
    currentTabKey: string;
    tabPanes: any[];
}

@connect(
    (state: RootState.RootState, ownProps): Pick<ContentProps, 'app' | 'route' | 'history'> => {
        console.log("content 数据回流到这里-----》》》》》 ", state, ownProps)
        return { app: state.app, route: ownProps.route, history: ownProps.history};
    },
    (dispatch: Dispatch): Pick<ContentProps, 'appHelper'> => {
        return {
            appHelper: bindActionCreators(omit(AppActions, 'Type'), dispatch),
        };
    }
)
class ContentComponet extends React.Component<ContentProps, ContentState>{

    tabTitleMap: any;
    tabCounter: number;

    constructor(props: ContentProps, context?: any){
        super(props, context);
        this.state = {
            currentTabKey: "",
            tabPanes: [],
        };

        this.onTabRemove = this.onTabRemove.bind(this);
    }

    componentWillMount() {
        if (globalConfig.tabMode.enable !== true) {
            return;
        }
    
        this.tabTitleMap = this.parseTabTitle();
        this.updateTab(this.props);
    }
  
    componentWillReceiveProps(nextProps: any) {
        if (globalConfig.tabMode.enable !== true) {
            return;
        }
    
        const action = this.props.history.action;
        console.log(" location  ------>>>>>> ", this.props, action)
        /*
        if (action === 'PUSH') {
            return;
        }
    
        if (this.props.app.isCollapsed === nextProps.app.isCollapsed) {
            this.updateTab(nextProps);
        }
        */
        this.updateTab(nextProps);
    }

    parseTabTitle() {
        const tabTitleMap = new Map();
    
        const addItem = ( item: any ) => {
            if (item.url) {  // 对于直接跳转的菜单项, 直接忽略, 只有headerMenu中可能有这种
              return;
            }
            if (item.icon) {
                tabTitleMap.set(item.key, <span className="ant-layout-tab-text"><item.icon />{item.name}</span>);
            } else {
                tabTitleMap.set(item.key, <span className="ant-layout-tab-text">{item.name}</span>);
            }
        };
        const browseMenu = ( item: any ) => {
            if (item.child) {
                item.child.forEach(browseMenu);
            } else {
                addItem(item);
            }
        };
    
        // 又是dfs, 每次用js写这种就觉得很神奇...
        sidebarMenu.forEach(browseMenu);
        headerMenu.forEach(browseMenu);
    
        // 最后要手动增加一个key, 对应于404页面
        tabTitleMap.set('*', <span className="ant-layout-tab-text">Error</span>);
        return tabTitleMap;
    }
  
    updateTab(props: any) {
        console.log('---->> update tab ----->    ', props)
        const routes = props.route.routes;

        let pathName = this.props.location.pathname;
        let path = pathName.substr(pathName.lastIndexOf('/'));
        let key = path.replace("/","");  // react-router传入的key
        let route = routes.filter((item: any) => item.path === path)[0]
    
        console.log(" updateTabe ---------->>>>>>  key = ", pathName, path, key, route)
        if (!key || !this.tabTitleMap.has(key)) {
            this.state.tabPanes.length = 0;
            return;
        }
    
        const tabTitle = this.tabTitleMap.get(key);
    
        if (globalConfig.tabMode.allowDuplicate === true) {
            if (!this.tabCounter) {
                this.tabCounter = 0;
            }
      
            this.tabCounter++;
            key = key + this.tabCounter;
        }
    
        this.setState({ currentTabKey: key });
    
        let exist = false;
        for (const pane of this.state.tabPanes) {
            if (pane.key === key) {
                exist = true;
                break;
            }
        }
    
        if (!exist) {
            this.state.tabPanes.push({
                key,
                title: tabTitle,
                content: route.component,
            });
        }
    }

    onTabRemove(targetKey: any){
        // 如果关闭的是当前tab, 要激活哪个tab?
        // 首先尝试激活左边的, 再尝试激活右边的
        console.log('------------>>>>> remove ', targetKey, this.state)
        let nextTabKey = this.state.currentTabKey;
        if (this.state.currentTabKey === targetKey) {
            let currentTabIndex = -1;
            this.state.tabPanes.forEach((pane: any, i: any) => {
                if (pane.key === targetKey) {
                    currentTabIndex = i;
                }
            });
  
            // 如果当前tab左边还有tab, 就激活左边的
            if (currentTabIndex > 0) {
                nextTabKey = this.state.tabPanes[currentTabIndex - 1].key;
            }
            // 否则就激活右边的tab
            else if (currentTabIndex === 0 && this.state.tabPanes.length > 1) {
                nextTabKey = this.state.tabPanes[currentTabIndex + 1].key;
            }
  
          // 其实还有一种情况, 就是只剩最后一个tab, 但这里不用处理
        }

        // 过滤panes
        const newTabPanes = this.state.tabPanes.filter( (pane: any) => pane.key !== targetKey);
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
