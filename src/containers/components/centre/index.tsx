'use strict'


import React from 'react';
import { 
    Drawer,
    Form,
    Button,
    Input,
    DatePicker,
    Divider,
    Col,
    Row
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';


import {
    RootState,
    PersonState,
    personRedux,
    AccountState,
    accountRedux,
} from 'reduxes';
// import * as classNames from 'classnames';
// import * as style from './index.less';

import './index.less';


export interface PersonCentreProps {
    person: PersonState,
    account: AccountState,
    personHelper: any,
    accountHelper: any,
}

export interface PersonCentreState {
    visible: boolean,
}

@connect(
    (state: RootState, ownProps): Pick<PersonCentreProps, 'person' | 'account'> =>{
        console.log("个人中心数据回流到这里-----》》》》》 ", state, ownProps)
        return { person: state.person, account: state.account};
    },
    (dispatch: Dispatch): Pick<PersonCentreProps, 'personHelper' | 'accountHelper'> => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
            accountHelper: bindActionCreators(accountRedux.actions(), dispatch),
        };
    }
)
export class PersonCentreManager extends React.PureComponent<PersonCentreProps, PersonCentreState> {
    private formRef: any;

    static defaultProps: Partial<PersonCentreProps> = {
    };

    constructor(props: PersonCentreProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false 
        };

        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
        this.formRef = React.createRef();
    }

    componentWillMount(){
    }

    componentDidMount(){
        const { personHelper } = this.props;
        personHelper.getPerson()
    }

    showDrawer(){
        this.setState({
            visible: true,
        });
        const { person } = this.props
        this.formRef.current.setFieldsValue(
            Object.assign({}, person, {
                "birthday": moment(person.birthday, 'YYYY-MM-DD')
            })
        );
    };

    onClose(){
        this.setState({
            visible: false,
        });
    };

    updatePerson(){
        let { personHelper } = this.props;
        let fields = this.formRef.current.getFieldsValue()
        let value = Object.assign({}, fields, {
            birthday: fields.birthday.format("YYYY-MM-DD")
        })

        personHelper.updatePerson(
            {
                myselfInfo: value 
            }
        ).then(() => {
            personHelper.getPerson('staff.myself.get').then(
                () => {
                    this.onClose();
                }
            )
        });
    }

    render(){
        const { person, account } = this.props;
        return (
            <div>
                <div>
                    <p className="site-description-item-profile-p">账号信息</p>
                    <Row>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                头像:
                            </p>
                            <img src={person.headUrl} style={{width:"40px", height:"40px"}}/>
                        </div>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    昵称:
                                </p>
                                {person.nick}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    账号:
                                </p>
                                {account.username}
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <p className="site-description-item-profile-p">
                        基本信息 &nbsp;
                        <a >
                            <EditOutlined onClick={this.showDrawer}/>
                        </a>
                    </p>
                    <Row>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    姓名:
                                </p>
                                {person.name}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    生日:
                                </p>
                                {person.birthday}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    手机号:
                                </p>
                                {person.phone}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    邮箱:
                                </p>
                                {person.email}
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <p className="site-description-item-profile-p">公司信息</p>
                    <Row>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    工号:
                                </p>
                                {person.workNumber}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    是否是管理员:
                                </p>
                                {person.isAdmin}
                            </div>
                        </Col>
                    </Row>
                </div>
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
