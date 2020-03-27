'use strict'


import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Layout } from 'antd';


import { RootState } from 'reduxes/reducers';
import { AppActions } from 'reduxes/actions';
import { wrapper } from 'containers/components/base';
import { Header, Sidebar, Content, Footer } from 'containers/app/layout'
import { TokenEnum, TokenConstant } from 'common/utils/persistence';

import './index.less';


export interface AppProps{
    app: RootState.AppState
    location: any,
    route: any;
    appHelper: any;
}

@connect(
    (state: RootState.RootState, ownProps): Pick<AppProps, 'app' | 'route' | 'location'> => {
        console.log(" app 数据回流到这里-----》》》》》 ", state, ownProps)
        return { app: state.app, route: ownProps.route, location: ownProps.location};
    },
    (dispatch: Dispatch): Pick<AppProps, 'appHelper'> => {
        return {
            appHelper: bindActionCreators(AppActions, dispatch),
        };
    }
)
class AppComponet extends React.Component<AppProps>{

    constructor(props: AppProps, context?: any){
        super(props, context);
    }

    verifyAuthorization(): boolean{
        let token = TokenConstant.get();
        if( token && token.hasOwnProperty(TokenEnum.ACCESS_TOKEN) && token[TokenEnum.ACCESS_TOKEN] ){
            return true;
        }
        return false;
    }

    render(){
        if( !this.verifyAuthorization() ){
            console.log(this.props);
            this.props.history.push("/login");
        }
        return (
            <Layout style={{ height: "100%" }}>
                <Sidebar />
                <Layout className="site-layout">
                    <Header /> 
                    <Content {...this.props}/>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }

}

export const App = wrapper({component: AppComponet})
