'use strict'


import React from 'react';
import { 
    Drawer,
    Form,
    Button,
    Input,
    DatePicker,
    Col,
    Row
} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
    RootState,
    PersonState,
    personRedux,
} from 'reduxes';
import './index.less';


export interface EditPersonProps {
    person: PersonState;
    personHelper: any;
}

export interface EditPersonState {
    visible: boolean;
}

export interface EditPersonEvent{
    personUpdate: any;
    personGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditPersonProps, 'person' > =>{
        console.log("编辑数据回流到这里-----》》》》》 ", state, ownProps)
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<EditPersonProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class EditPersonCentreManager extends React.PureComponent<EditPersonProps, EditPersonState>  implements EditPersonEvent{
    private formRef: any;
    personUpdate: any;
    personGet: any;

    constructor(props: EditPersonProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false 
        };

        this.personUpdate = this.props.personHelper.personUpdate;
        this.personGet = this.props.personHelper.personGet;

        this.onClose = this.onClose.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
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

    editPerson(){
        this.setState({
            visible: true,
        });
        const { person } = this.props
        this.formRef.current.setFieldsValue(
            Object.assign({}, person, {
            })
        );
    };

    updatePerson(){
        let fields = this.formRef.current.getFieldsValue()
        this.personUpdate(
            {
                myselfInfo: fields 
            }
        ).then(() => {
            this.personGet().then(
                (req: any) => {
                    this.onClose();
                }
            )
        });
    }

    render(){
        return (
            <div>
                <Drawer
                    title="修改个人信息"
                    width={720}
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
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button type="primary" onClick={this.updatePerson}>
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form 
                        ref={this.formRef}
                        layout="vertical"
                        colon={true}
                        hideRequiredMark
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="名称"
                                    rules={[{ required: true, message: '请输入名称' }]}
                                >
                                    <Input 
                                        placeholder="请输入名称" 
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="birthday"
                                    label="生日"
                                    rules={[{ required: true, message: '请输入生日' }]}
                                >
                                    <DatePicker
                                        style={{ width: '50%' }}
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="手机号"
                                    rules={[{ required: true, message: '请输入手机号' }]}
                                >
                                    <Input 
                                        placeholder="请输入手机号" 
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="邮箱"
                                    rules={[{ required: true, message: '请输入邮件' }]}
                                >
                                    <Input 
                                        placeholder="请输入邮箱" 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        )
    }
};
