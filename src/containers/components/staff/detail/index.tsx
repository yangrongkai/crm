'use strict'


import  * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    permissionRedux,
    PermissionState,
    StaffState,
    staffRedux,
} from 'reduxes';
import { EditStaffManager } from 'containers/components/staff';
import * as config from '&/config.js';
import './index.less';


export interface DetailStaffProps {
    permission: PermissionState;
    permissionHelper: any;
    staff: StaffState;
    staffHelper: any;
    history: any;
}

export interface DetailStaffState {
    visible: boolean;
    staff: any;
}

export interface DetailStaffEvent{
    staffGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<DetailStaffProps, 'permission' | "staff"> =>{
        return { permission: state.permission, staff: state.staff};
    },
    (dispatch: Dispatch): Pick<DetailStaffProps, 'permissionHelper' | 'staffHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
            staffHelper: bindActionCreators(staffRedux.actions(), dispatch),
        };
    }
)
export class DetailStaffManager extends React.PureComponent<DetailStaffProps, DetailStaffState>  implements DetailStaffEvent{
    editStaffComponent: any;

    staffGet: any;

    constructor(props: DetailStaffProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            staff: undefined,
        };

        this.staffGet = this.props.staffHelper.staffGet;
        this.refreshStaff = this.refreshStaff.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    onClose(){
        this.setState({
            visible: false,
        });
    };

    onOpen(staffId: number){
        this.staffGet({
            staffId: staffId
        }).then(() => {
            let staff = this.props.staff.staffCurrent;
            this.setState({
                staff: staff,
                visible: true,
            })
        })
    }

    refreshStaff(){
        return this.staffGet({
            staffId: this.state.staff.id
        }).then(() => {
            let staff = this.props.staff.staffCurrent;
            this.setState({
                staff: staff,
            })
        })
    }

    render(){
        const { staff } = this.state;
        if( staff == undefined ){
            return (<div></div>);
        }
        return (
            <div>
                <antd.Drawer
                    title={
                        <span>
                            {staff.name}
                        </span>
                    }
                    width={840}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    forceRender={true}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <div>
                        <div className="person-centre-detail">
                            <antd.Form 
                                labelCol={{span:8 }}
                                wrapperCol={{span:16 }}
                                colon={true}
                            >
                                <p>
                                    账号信息&nbsp;
                                </p>
                                <div>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                        <antd.Form.Item label="头像">
                                            <span className="ant-form-text">
                                                { 
                                                    staff.account.headUrl == "" 
                                                    ? <img src={config.defaultHeadPortrait} className="personal-head-image"/>
                                                    : <img src={staff.account.headUrl} className="personal-head-image"/>
                                                }
                                            </span>
                                        </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="账号">
                                                <span className="ant-form-text">
                                                    {staff.account.username}&nbsp;
                                                </span>
                                                <span className="ant-form-text">
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="注册时间">
                                                <span className="ant-form-text">
                                                    {staff.account.createTime.format("YYYY-MM-DD hh:mm:ss")}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="昵称">
                                                <span className="ant-form-text">
                                                    {staff.account.nick}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="最后登录时间">
                                                <span className="ant-form-text">
                                                    {staff.account.lastLoginTime.format("YYYY-MM-DD hh:mm:ss")}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                </div>
                                <antd.Divider />
                                <p>
                                    基本信息 &nbsp;
                                    <a onClick={() => this.editStaffComponent.onOpen(staff.id)}>
                                        <icons.EditOutlined />
                                    </a>
                                </p>
                                <div>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="姓名">
                                                <span className="ant-form-text">
                                                    {staff.name}
                                                </span>
                                                <span className="ant-form-text">
                                                    {
                                                        staff.gender == "man"
                                                        ? <icons.ManOutlined style={{color:"blue"}}/>
                                                        : <icons.WomanOutlined style={{color:"pink"}}/>
                                                    }
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="工号">
                                                <span className="ant-form-text">
                                                    {staff.workNumber}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="生日">
                                                <span className="ant-form-text">
                                                    {staff.birthday.format("YYYY-MM-DD")}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="管理员">
                                                <span className="ant-form-text">
                                                    {staff.isAdmin ? "是" : "不是"}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="邮箱">
                                                <span className="ant-form-text">
                                                    {staff.email}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="手机">
                                                <span className="ant-form-text">
                                                    {staff.phone}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="QQ">
                                                <span className="ant-form-text">
                                                    {staff.qq}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="微信">
                                                <span className="ant-form-text">
                                                    {staff.wechat}
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
                                                    {staff.company.name}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="部门">
                                                <span className="ant-form-text">
                                                    {staff.organization.name}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                    <antd.Row>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="社会统一编码">
                                                <span className="ant-form-text">
                                                    {staff.company.licenseNumber}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                        <antd.Col span={12}>
                                            <antd.Form.Item label="职位">
                                                <span className="ant-form-text">
                                                    {staff.position.name}
                                                </span>
                                            </antd.Form.Item>
                                        </antd.Col>
                                    </antd.Row>
                                </div>
                            </antd.Form>
                        </div>
                    </div>
                    <EditStaffManager
                        father={this}
                        onRef={(ref: any) => this.editStaffComponent = ref}
                    />
                </antd.Drawer>
            </div>
        )
    }
};
