'use strict'


import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';


export class AccountManager extends React.PureComponent {

    onFinish = values => {
        console.log('Success:', values);
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }

    render(){
        return (
            <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="原密码"
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="新密码"
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="conformPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item  >
                    <Button type="primary" htmlType="submit">
                        确认修改
                    </Button>
                </Form.Item>
        </Form>
        )
    }
};
