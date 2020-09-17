'use strict'


import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Layout } from 'antd';
import { RootState, AppState, appRedux, PersonState, personRedux } from 'reduxes';
import { wrapper } from 'containers/tools/wrapper';
import * as config from '&/config.js';
import { Header, Sidebar, Content, Footer } from 'containers/app/layout'
import { TokenEnum, TokenConstant } from 'common/utils/persistence';
import './index.less';


export interface AppProps{
    location?: any,
    route?: any;
    history?: any;
    app: AppState,
    appHelper: any;
    person: PersonState;
    personHelper: any;
}

export interface AppEvent{
    getPerson: any;
}

@connect(
    (state: RootState, ownProps): Pick<AppProps, 'app' | 'route' | 'location' | "person"> => {
        return { 
            app: state.app,
            person: state.person,
            route: ownProps.route,
            location: ownProps.location
        };
    },
    (dispatch: Dispatch): Pick<AppProps, 'appHelper' | 'personHelper'> => {
        return {
            appHelper: bindActionCreators(appRedux.actions(), dispatch),
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
class AppComponet extends React.Component<AppProps> implements AppEvent{
    getPerson: any;

    constructor(props: AppProps, context?: any){
        super(props, context);

        this.getPerson = this.props.personHelper.personGet;
    }

    componentDidMount(){
        if(!this.authorize()){
            this.props.history.push("/login");
        } else {
            this.getPerson({
                appkey: config.permission.appkey
            })
        }
    }

    shouldComponentUpdate(nextProps: AppProps, nextState: any): boolean{
        if(!this.authorize()){
            this.props.history.push("/login");
            return false;
        }
        return true;
    }

    authorize(){
        let token = TokenConstant.get();
        if( token
            && token.hasOwnProperty(TokenEnum.ACCESS_TOKEN)
            && token[TokenEnum.ACCESS_TOKEN] ){
            return true;
        } else {
            return false
        }
    }

    render(){
        return (
            <Layout style={{ height: "100%" }}>
                <Sidebar {...this.props}/>
                <Layout className="site-layout">
                    <Header {...this.props}/> 
                    <Content {...this.props}/>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }

}

export const App = wrapper({component: AppComponet})
