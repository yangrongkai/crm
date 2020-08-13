'use strict'


import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';


import {
    RootState,
    PersonState,
    personRedux,
} from 'reduxes';
import './index.less';
import { EditPersonCentreManager } from 'containers/components/person/edit';


export interface PersonCentreProps {
    person: PersonState;
    personHelper: any;
    editPersonComponent: any;
}

export interface PersonCentreState {
    visible: boolean;
}

export interface CentrePageEvent{
    personGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<PersonCentreProps, 'person' > =>{
        console.log("个人中心数据回流到这里-----》》》》》 ", state, ownProps)
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
    editPersonComponent: any;

    constructor(props: PersonCentreProps, context?: any) {
        super(props, context);

        this.personGet = this.props.personHelper.personGet;
    }

    componentDidMount(){
        this.personGet()
    }

    render(){
        const { person } = this.props;
        return (
            <div>
                <div>
                    <p className="site-description-item-profile-p">账号信息</p>
                    <antd.Row>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                头像:
                            </p>
                            <img src={person.account.headUrl} style={{width:"40px", height:"40px"}}/>
                        </div>
                    </antd.Row>
                    <antd.Row>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    账号:
                                </p>
                                {person.account.username}
                            </div>
                        </antd.Col>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    昵称:
                                </p>
                                {person.account.nick}
                            </div>
                        </antd.Col>
                    </antd.Row>
                    <antd.Row>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    注册时间:
                                </p>
                                {person.account.createTime.format("YYYY-MM-DD hh:mm")}
                            </div>
                        </antd.Col>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    最后登录时间:
                                </p>
                                {person.account.lastLoginTime.format("YYYY-MM-DD hh:mm")}
                            </div>
                        </antd.Col>
                    </antd.Row>
                    <antd.Divider />
                    <p className="site-description-item-profile-p">
                        基本信息 &nbsp;
                        <a >
                            <icons.EditOutlined onClick={() => this.editPersonComponent.editPerson()}/>
                        </a>
                    </p>
                    <antd.Row>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    姓名:
                                </p>
                                {person.name}
                                &nbsp;
                                {
                                    person.gender == "man"
                                    ? <icons.ManOutlined style={{color:"blue"}}/>
                                    : <icons.WomanOutlined style={{color:"pink"}}/>
                                }
                            </div>
                        </antd.Col>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    工号:
                                </p>
                                {person.workNumber}
                            </div>
                        </antd.Col>
                    </antd.Row>
                    <antd.Row>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    生日:
                                </p>
                                {person.birthday.format("YYYY-MM-DD")}
                            </div>
                        </antd.Col>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    管理员:
                                </p>
                                {person.isAdmin ? "是" : "不是"}
                            </div>
                        </antd.Col>
                    </antd.Row>
                    <antd.Row>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    手机号:
                                </p>
                                {person.phone}
                            </div>
                        </antd.Col>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    邮箱:
                                </p>
                                {person.email}
                            </div>
                        </antd.Col>
                    </antd.Row>
                    <antd.Divider />
                    <p className="site-description-item-profile-p">公司信息</p>
                    <antd.Row>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    公司:
                                </p>
                                {person.company.name}
                            </div>
                        </antd.Col>
                        <antd.Col span={12}>
                            <div className="site-description-item-profile-wrapper">
                                <p className="site-description-item-profile-p-label">
                                    社会统一编码
                                </p>
                                {person.company.licenseNumber}
                            </div>
                        </antd.Col>
                    </antd.Row>
                </div>
                <EditPersonCentreManager
                    onRef={(ref: any) => this.editPersonComponent = ref}
                />
            </div>
        )
    }
};
