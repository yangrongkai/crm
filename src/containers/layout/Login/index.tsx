'use strict'

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// import { bindActionCreators } from 'redux';
// import { message } from 'antd';
import { message, Button, notification } from 'antd';


import * as classNames from 'classnames';
import * as globalConfig from '&/config.js';
import { RootState } from 'reduxes/reducers';
import { omit } from 'common/utils';
import { LoginActions } from 'reduxes/actions';
import * as style from './index.less';

import { localStorage } from 'common/utils/persistence'
// import * as log from 'common/utils/log/Logger.js';
// const logger = log.Logger.getLogger('Login');

export interface LoginProps{
    login: RootState.LoginState,
    loginHelper: any,
}

@connect(
    (state: RootState.RootState, ownProps): Pick<LoginProps, 'login'> => {
        console.log("数据回流到这里-----》》》》》 ", state, ownProps)
        return { login: state.login };
    },
    (dispatch: Dispatch): Pick<LoginProps, 'loginHelper'> => {
        return {
            loginHelper: bindActionCreators(omit(LoginActions, 'Type'), dispatch),
        };
    }
)
export class Login extends React.PureComponent<LoginProps> {
  
    static defaultProps: Partial<LoginProps> = {
    };

    constructor(props: LoginProps, context?: any) {
        super(props, context);
        this.state = { requesting: false };
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // logger.info(event.target.value)
        this.props.login.username = event.target.value;
    };
  
    handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // logger.info(event.target.value)
        this.props.login.password = event.target.value;
    };
  
    handleSubmit = async(event: React.KeyboardEvent<HTMLFormElement>) => {  // async可以配合箭头函数
        event.preventDefault();
        // const hide = message.loading('正在验证...', 0);
    
        const { login , loginHelper } = this.props;
        let params = {'yrk':'a'};
        let api = "demo.test";
        localStorage.sync('username', login.username)
        localStorage.sync('password', login.password)
        // logger.debug('username = %s, password = %s', login.username, login.password);
        console.log('loginHelper : loginAccount --------->>> ', loginHelper.loginAccount(api, params).then(
            (res: any) => {
                console.log('------ result --->>>> ', res)
                console.log('------ result --->>>> ', res.value)
                message.success('登录成功');
            }
        ))
    
        /*
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
        */
    };

    openNotification = () => {
      const args = {
        message: 'Notification Title',
        description:
          'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
        duration: 0,
      };
      notification.open(args);
    };
  
    render() {
        // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
        console.log(' 我进行了渲染 ', this.props.login.isLoading)
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
                                type="submit" disabled={this.props.login.isLoading}>
                                登录
                        </button>
                    </form>
                </div>
            <Button type="primary" onClick={this.openNotification}>
                Open the notification box
              </Button>
      
            </div>
        );
    }
  
};
