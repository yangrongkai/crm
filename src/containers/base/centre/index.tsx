'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, PersonState, personRedux } from 'reduxes';
import { EditPersonCentreManager } from 'containers/components/person';
import { EditAccount, ResetPassword } from 'containers/components/account';
import './index.less';


export interface PersonCentreProps {
    person: PersonState;
    personHelper: any;
    editPersonComponent: any;
    resetAccountPassoword: any;
    editAccountContent: any;
    history: any;
}

export interface PersonCentreState {
    visible: boolean;
}

export interface CentrePageEvent{
    personGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<PersonCentreProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<PersonCentreProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class PersonCentreManager extends React.PureComponent<PersonCentreProps, PersonCentreState>  implements CentrePageEvent{
    personGet: any;
    editPersonContent: any;
    editAccountContent: any;
    resetAccountPassoword: any;

    constructor(props: PersonCentreProps, context?: any) {
        super(props, context);

        this.personGet = this.props.personHelper.personGet;
    }

    componentDidMount(){
        this.personGet({
        })
    }

    render(){
        const { person } = this.props;
        return (
            <div>
                <div className="person-centre-detail">
                    <antd.Form 
                        labelCol={{span:8 }}
                        wrapperCol={{span:16 }}
                        colon={true}
                    >
                        <p>
                            账号信息&nbsp;
                            <a >
                                <icons.EditOutlined onClick={() => this.editAccountContent.editAccount()}/>
                            </a>
                        </p>
                        <div>
                            <antd.Row>
                                <antd.Col span={12}>
                                <antd.Form.Item label="头像">
                                    <span className="ant-form-text">
                                        { 
                                            person.account.headUrl == "" 
                                            ? <img src={config.defaultHeadPortrait} className="personal-head-image"/>
                                            : <img src={this.props.person.account.headUrl} className="personal-head-image"/>
                                        }
                                    </span>
                                </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="账号">
                                        <span className="ant-form-text">
                                            {person.account.username}&nbsp;
                                        </span>
                                        <span className="ant-form-text">
                                            <a onClick={() => this.resetAccountPassoword.openResetPassword()}>
                                                修改密码
                                            </a>
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="注册时间">
                                        <span className="ant-form-text">
                                            {person.account.createTime.format("YYYY-MM-DD hh:mm:ss")}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="昵称">
                                        <span className="ant-form-text">
                                            {person.account.nick}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="最后登录时间">
                                        <span className="ant-form-text">
                                            {person.account.lastLoginTime.format("YYYY-MM-DD hh:mm:ss")}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                        </div>
                        <antd.Divider />
                        <p>
                            基本信息 &nbsp;
                            <a >
                                <icons.EditOutlined onClick={() => this.editPersonContent.editPerson()}/>
                            </a>
                        </p>
                        <div>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="姓名">
                                        <span className="ant-form-text">
                                            {person.name}
                                        </span>
                                        <span className="ant-form-text">
                                            {
                                                person.gender == "man"
                                                ? <icons.ManOutlined style={{color:"blue"}}/>
                                                : <icons.WomanOutlined style={{color:"pink"}}/>
                                            }
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="工号">
                                        <span className="ant-form-text">
                                            {person.workNumber}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="生日">
                                        <span className="ant-form-text">
                                            {person.birthday.format("YYYY-MM-DD")}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="管理员">
                                        <span className="ant-form-text">
                                            {person.isAdmin ? "是" : "不是"}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="邮箱">
                                        <span className="ant-form-text">
                                            {person.email}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="手机">
                                        <span className="ant-form-text">
                                            {person.phone}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="QQ">
                                        <span className="ant-form-text">
                                            {person.qq}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="微信">
                                        <span className="ant-form-text">
                                            {person.wechat}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                        </div>
                        <antd.Divider />
                        <p>
                            公司信息
                        </p>
                        <div>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="公司">
                                        <span className="ant-form-text">
                                            {person.company.name}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="部门">
                                        <span className="ant-form-text">
                                            {person.organization.name}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                            <antd.Row>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="社会统一编码">
                                        <span className="ant-form-text">
                                            {person.company.licenseNumber}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                                <antd.Col span={12}>
                                    <antd.Form.Item label="职位">
                                        <span className="ant-form-text">
                                            {person.position.name}
                                        </span>
                                    </antd.Form.Item>
                                </antd.Col>
                            </antd.Row>
                        </div>
                    </antd.Form>
                </div>
                <EditPersonCentreManager
                    onRef={(ref: any) => this.editPersonContent = ref}
                />
                <ResetPassword
                    {...this.props}
                    onRef={(ref: any) => this.resetAccountPassoword = ref}
                />
                <EditAccount
                    onRef={(ref: any) => this.editAccountContent = ref}
                />
            </div>
        )
    }
};
