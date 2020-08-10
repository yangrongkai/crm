'use strict'


import React from 'react';
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';


import { RootState, PersonState, personRedux } from 'reduxes';
// import * as classNames from 'classnames';
// import * as style from './index.less';

import './index.less';


export interface PersonProps {
    person: PersonState,
    personHelper: any,
}

@connect(
    (state: RootState, ownProps): Pick<PersonProps, 'person'> =>{
        console.log("数据回流到这里-----》》》》》 ", state, ownProps)
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<PersonProps, 'personHelper'> => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class PersonCentreManager extends React.PureComponent {

    static defaultProps: Partial<PersonProps> = {
    };

    constructor(props: PersonProps, context?: any) {
        super(props, context);
    }

    componentWillMount(){
        let { personHelper } = this.props;
        personHelper.getPerson('staff.myself.get')
    }

    render(){
        return (
            <div>
                <p className="site-description-item-profile-p">账号信息</p>
                <Row>
                    <Col span={12}>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                昵称:
                            </p>
                            {this.props.person.nick}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                头像:
                            </p>
                            <img src={this.props.person.headUrl} style={{width:"40px", heigth:"40px"}}/>
                        </div>
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">基本信息</p>
                <Row>
                    <Col span={12}>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                姓名:
                            </p>
                            {this.props.person.name}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                生日:
                            </p>
                            {this.props.person.birthday}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                手机号:
                            </p>
                            {this.props.person.phone}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                email:
                            </p>
                            {this.props.person.email}
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
                            {this.props.person.workNumber}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="site-description-item-profile-wrapper">
                            <p className="site-description-item-profile-p-label">
                                是否是管理员:
                            </p>
                            {this.props.person.isAdmin}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
};
