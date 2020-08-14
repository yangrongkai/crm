'use strict'


import React from 'react';
import * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, PersonState, personRedux } from 'reduxes';
import './index.less';


export interface EditAccountProps {
    person: PersonState;
    personHelper: any;
}

export interface EditAccountState {
    visible: boolean;
}

export interface EditAccountEvent{
    accountUpdate: any;
    updateAccount: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditAccountProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<EditAccountProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class EditAccount extends React.PureComponent<EditAccountProps, EditAccountState>  implements EditAccountEvent{
    private formRef: any;
    accountUpdate: any;
    accountGet: any;

    constructor(props: EditAccountProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false 
        };

        this.accountUpdate = this.props.personHelper.accountUpdate;
        this.accountGet = this.props.personHelper.personGet;

        this.onClose = this.onClose.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
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

    editAccount(){
        this.setState({
            visible: true,
        });
        const { person } = this.props
        this.formRef.current.setFieldsValue(
            Object.assign({}, person.account, {
            })
        );
    };

    updateAccount(){
        let fields = this.formRef.current.getFieldsValue()
        this.accountUpdate(
            {
                updateInfo: fields 
            }
        ).then(() => {
            this.accountGet().then(
                (req: any) => {
                    this.onClose();
                }
            )
        });
    }

    render(){
        return (
            <div>
                <antd.Drawer
                    title="修改账号信息"
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
                            <antd.Button type="primary" onClick={this.updateAccount}>
                                Submit
                            </antd.Button>
                        </div>
                    }
                >
                    <antd.Form 
                        ref={this.formRef}
                        layout="horizontal"
                        labelCol={{span:4 }}
                        wrapperCol={{span:12 }}
                        colon={true}
                    >
                        <antd.Row >
                            <antd.Form.Item
                                name="headUrl"
                                label="头像"
                                rules={[{ required: false, message: '请输入头像地址' }]}
                            >
                                <antd.Input 
                                    style={{width:"360px"}}
                                    placeholder="请输入头像地址" 
                                />
                            </antd.Form.Item>
                        </antd.Row>
                        <antd.Row >
                            <antd.Form.Item
                                name="nick"
                                label="昵称"
                                rules={[{ required: true, message: '请输入昵称' }]}
                            >
                                <antd.Input 
                                    style={{width:"360px"}}
                                    placeholder="请输入昵称" 
                                />
                            </antd.Form.Item>
                        </antd.Row>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
