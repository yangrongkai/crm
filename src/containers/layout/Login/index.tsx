'use strict'


import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { message, Form, Input, Button, Checkbox } from 'antd';


import * as config from '&/config.js';
import { RootState } from 'reduxes/reducers';
import { omit } from 'common/utils';
import { LoginActions } from 'reduxes/actions';
// import * as classNames from 'classnames';
// import * as style from './index.less';
import { localStorage } from 'common/utils/persistence';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';


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
        this.state = { visible: false, placement: 'left' };
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.info(event.target.value)
        this.props.login.username = event.target.value;
    };
  
    handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.info(event.target.value)
        this.props.login.password = event.target.value;
    };
  
    handleSubmit = async () => {
        // const hide = message.loading('正在验证...', 0);
    
        const { login , loginHelper } = this.props;
        let api = "user.login";
        localStorage.sync('username', login.username)
        localStorage.sync('password', login.password)
        console.log(" ]]]]]]]>>>>>>>>>>>> start ---->>> ", login)
        loginHelper.loginAccount(api, login).then(
            (res: any) => {
                localStorage.sync('token', res.value);
                message.success('登录成功');
            }
        )
    
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

    render() {
        // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
        console.log(' 我进行了渲染 ', this.props.login.isLoading)
        return (
            <div id="login-component">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.handleSubmit}
                >
                    <h2>{ config.name }</h2>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Username" 
                            onChange={this.handleUsernameInput}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={this.handlePasswordInput}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
      
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            disabled={this.props.login.isLoading}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
  
};
