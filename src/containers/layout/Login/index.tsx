'use strict'

import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { message } from 'antd';


import * as classNames from 'classnames';
import * as globalConfig from '&/config.js';
import { RootState } from 'reduxes/reducers';
import { omit } from 'common/utils';
import { LoginActions, LoadActions } from 'reduxes/actions';
import * as style from './index.less';

import * as log from 'common/utils/log/Logger.js';
const logger = log.Logger.getLogger('Login');

export namespace Login{
    export interface Props{
        login: RootState.LoginState,
        load: RootState.LoadState,
        loginHelper: LoginActions,
        loadHelper: LoadActions
    }
    export interface State{
        requesting: boolean,
    }
}

@connect(
    (state: RootState, ownProps): Pick<Login.Props, 'login' | 'load'> => {
        return { login: state.login,  load: state.load};
    },
    (dispatch: Dispatch): Pick<Login.Props, 'loginHelper' | 'loadHelper'> => {
        return {
            loginHelper: bindActionCreators(omit(LoginActions, 'Type'), dispatch),
            loadHelper: bindActionCreators(omit(LoadActions, 'Type'), dispatch)
        };
    }
)
export class Login extends React.PureComponent<Login.Props, Login.State> {
  
    static defaultProps: Partial<Login.Props> = {
    };

    constructor(props: Login.Props, context?: any) {
        super(props, context);
        this.state = { requesting: false };
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        logger.info(event.target.value)
        this.props.login.username = event.target.value;
    };
  
    handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        logger.info(event.target.value)
        this.props.login.password = event.target.value;
    };
  
    handleSubmit = async(event: React.KeyboardEvent<HTMLFormElement>) => {  // async可以配合箭头函数
        event.preventDefault();
        // this.setState({requesting: true});
        const hide = message.loading('正在验证...', 0);
    
        const { login , loginHelper, loadHelper } = this.props;
        logger.debug('username = %s, password = %s', login.username, login.password);
        console.log(loginHelper.loginAccount)
        loginHelper.loginAccount(login)
        loadHelper.loading()
        loadHelper.loaded()
    
        try {
            // 服务端验证
            // const res = await ajax.login(username, password);
            hide();
            // logger.debug('login validate return: result %o', res);
      
            // if (res.success) {
            if (true) {
                message.success('登录成功');
                // 如果登录成功, 触发一个loginSuccess的action, payload就是登录后的用户名
                // this.props.handleLoginSuccess(res.data);
            } else {
                // message.error(`登录失败: ${res.message}, 请联系管理员`);
                this.setState({requesting: false});
            }
        } catch (exception) {
            hide();
            message.error(`网络请求出错: ${exception.message}`);
            // logger.error('login error, %o', exception);
            this.setState({requesting: false});
        }
    };
  
    render() {
        // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
        return (
            <div id="loginDIV">
      
                {/*debug模式下显示fork me on github*/}
                {globalConfig.debug &&
                <a href="https://github.com/jiangxy/react-antd-admin">
                    <img style={{position: 'absolute', top: 0, right: 0, border: 0}}
                         src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
                         alt="Fork me on GitHub"
                         data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
                </a>}
        
                <div className={classNames(style["login"])}>
                    <h1>{globalConfig.name}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input className={classNames(style["login-input"])} type="text" value={this.props.login.username}
                               onChange={this.handleUsernameInput} placeholder="用户名" />
                        <input className={classNames(style['login-input'])} type="password" value={this.props.login.password}
                               onChange={this.handlePasswordInput} placeholder="密码" />
                        <button className={classNames(style['btn-large'], style['btn'])}
                                type="submit" disabled={this.state.requesting}>
                          登录
                        </button>
                    </form>
                </div>
      
            </div>
        );
    }
  
};
