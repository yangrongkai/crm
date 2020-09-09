'use strict'


import React from 'react';
import * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, PersonState, personRedux, } from 'reduxes';
import { hex_md5 } from 'common/utils/security/CryptoMd5.js';
import './index.less';


export interface ResetPasswordProps {
    person: PersonState;
    personHelper: any;
    history: any;
}

export interface ResetPasswordState {
    visible: boolean;
}

export interface ResetPasswordEvent{
    accountResetPassword: any;
    accountLogout: any;
}

@connect(
    (state: RootState, ownProps): Pick<ResetPasswordProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<ResetPasswordProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class ResetPassword extends React.PureComponent<ResetPasswordProps, ResetPasswordState>  implements ResetPasswordEvent{
    private formRef: any;
    accountResetPassword: any;
    accountLogout: any;

    constructor(props: ResetPasswordProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false 
        };

        this.accountResetPassword = this.props.personHelper.accountResetPassword;
        this.accountLogout = this.props.personHelper.accountLogout;

        this.onClose = this.onClose.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    onClose(){
        this.setState({
            visible: false,
        });
    };

    openResetPassword(){
        this.setState({
            visible: true,
        });
        this.formRef.current.setFieldsValue({
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
        });
    };

    resetPassword(){
        this.formRef.current.validateFields().then((values: any) => {
            this.accountResetPassword({
                oldPassword: hex_md5(values.oldPassword),
                newPassword: hex_md5(values.newPassword),
                repeatPassword: hex_md5(values.repeatPassword),
            }
            ).then(() => {
                this.accountLogout().then(() =>{
                    this.props.history.push("/login");
                })
            });
        })
    }

    render(){
        const { person } = this.props;
        return (
            <div>
                <antd.Drawer
                    title="重置密码"
                    width={480}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    forceRender={true}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <antd.Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </antd.Button>
                            <antd.Button type="primary" onClick={this.resetPassword}>
                                Submit
                            </antd.Button>
                        </div>
                    }
                >
                    <antd.Form 
                        ref={this.formRef}
                        labelCol={{span:4 }}
                        wrapperCol={{span:12 }}
                        colon={true}
                    >
                            <antd.Form.Item label="账号">
                                <span className="ant-form-text">
                                    {person.account.username}
                                </span>
                            </antd.Form.Item>
                            <antd.Form.Item
                                name="oldPassword"
                                label="原密码"
                                rules={[
                                    { required: true, message: '请输入原密码' },
                                ]}
                            >
                                <antd.Input.Password 
                                    style={{width:"360px"}}
                                    type="password"
                                    placeholder="请输入原密码" 
                                />
                            </antd.Form.Item>
                            <antd.Form.Item
                                name="newPassword"
                                label="新密码"
                                rules={[{ required: true, message: '请输入新密码' }]}
                            >
                                <antd.Input.Password 
                                    style={{width:"360px"}}
                                    type="password"
                                    placeholder="请输入新密码" 
                                />
                            </antd.Form.Item>
                            <antd.Form.Item
                                name="repeatPassword"
                                label="确认密码"
                                rules={[
                                    { required: true, message: '请确认密码' },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('两次密码不匹配');
                                        },
                                    }),
                                ]}
                            >
                                <antd.Input.Password 
                                    style={{width:"360px"}}
                                    type="password"
                                    placeholder="请确认密码" 
                                />
                            </antd.Form.Item>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
