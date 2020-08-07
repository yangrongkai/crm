'use strict'


import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, Input, Button, Checkbox } from 'antd';


import * as config from '&/config.js';
import { RootState, AccountState, accountRedux } from 'reduxes';
// import * as classNames from 'classnames';
// import * as style from './index.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';


export interface LoginProps{
    account: AccountState,
    accountHelper: any,
    history: any,
}

@connect(
    (state: RootState, ownProps): Pick<LoginProps, 'account'> =>{
        console.log("数据回流到这里-----》》》》》 ", state, ownProps)
        return { account: state.account };
    },
    (dispatch: Dispatch): Pick<LoginProps, 'accountHelper'> => {
        return {
            accountHelper: bindActionCreators(accountRedux.actions(), dispatch),
        };
    }
)
export class Login extends React.PureComponent<LoginProps> {
  
    static defaultProps: Partial<LoginProps> = {
    };

    constructor(props: LoginProps, context?: any) {
        super(props, context);
        
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async () => {
        const { account, accountHelper } = this.props;
        accountHelper.loginAccount("staff.account.login", account).then(
            (res: any) => {
                this.props.history.push("/");
            }
        )
    };

    inputChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        let attr = event.target.name
        let value = event.target.value
        this.props.accountHelper.updateModel({
            [attr]: value
        })
    }

    render() {
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
                            name="username"
                            onChange={this.inputChange}
                            value={this.props.account.username}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            name="password"
                            type="password"
                            onChange={this.inputChange}
                            value={this.props.account.password}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
      
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            disabled={this.props.account.isLoading}
                            >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};
