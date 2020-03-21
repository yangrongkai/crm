'use strict'


import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

import { wrapper } from 'containers/components/base';
import { Footer } from 'containers/app/layout'
import { TokenEnum, TokenConstant } from 'common/utils/persistence';

import './index.less';



export interface AppProps{
}

class AppComponet extends React.Component<AppProps>{

    constructor(props: AppProps, context?: any){
        super(props, context);
        console.log('~~~~~~~~~~~~>>>>>>>>>>>>>>>    ', props)
        this.state = {
            collapsed: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    verifyAuthorization(): boolean{
        let token = TokenConstant.get();
        if( token && token.hasOwnProperty(TokenEnum.ACCESS_TOKEN) && token[TokenEnum.ACCESS_TOKEN] ){
            return true;
        }
        return false;
    }

    toggle(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
        if( !this.verifyAuthorization() ){
            console.log(this.props);
            this.props.history.push("/login");
        }
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <UserOutlined />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <VideoCameraOutlined />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <UploadOutlined />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                          margin: '24px 16px',
                          padding: 24,
                          minHeight: 280,
                        }}
                      >
                        Content
                    </Content>
                    <Footer/>
                </Layout>
          </Layout>
        )
    }

}

export const App = wrapper({component: AppComponet})
