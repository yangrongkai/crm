'use strict'


import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, Input, Button, Layout } from 'antd';


import * as config from '&/config.js';
import { hex_md5 } from 'common/utils/security/CryptoMd5.js';
import { RootState, PersonState, personRedux } from 'reduxes';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';


export interface LoginProps{
    person: PersonState,
    personHelper: any,
    history: any,
}

export interface LoginState{
    isLogining: boolean,
}

// 页面需要的接口，redux需要匹配该接口
export interface LoginPageEvent{
    login: any
}

@connect(
    (state: RootState, ownProps): Pick<LoginProps, 'person'> =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<LoginProps, 'personHelper'> => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class Login extends React.PureComponent<LoginProps, LoginState> {

    private formRef: any;
    login: any;
  
    constructor(props: LoginProps, context?: any) {
        super(props, context);
        this.state = { 
            isLogining: false 
        };
        
        // 绑定事件
        this.login = this.props.personHelper.accountLogin;

        this.formRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async () => {
        let values = this.formRef.current.getFieldsValue()
        values.password = hex_md5(values.password)
        this.setState({ isLogining: true });
        console.log(values)
        this.login(
            values
        ).then(
            (resp: any) => {
                this.setState({ isLogining: false });
                this.props.history.push("/");
            }
        ).catch(
            () => {
                this.setState({ isLogining: false });
            }
        )
    };

    render() {
        const text: string = config.footer || 'footer被弄丢啦!';
        return (
            <div id="login-component">
                <Form
                    ref={this.formRef}
                    name="login"
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
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            disabled={this.state.isLogining}
                        >
                            Log in
                        </Button>
                    </Form.Item>

                    <Layout.Footer dangerouslySetInnerHTML={{ __html: text }} />
                </Form>
            </div>
        );
    }
};
