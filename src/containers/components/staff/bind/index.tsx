'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    staffRedux,
    StaffState,
    permissionRedux,
    PermissionState,
} from 'reduxes';
import * as config from '&/config.js';
import './index.less';


export interface BindStaffProps {
    staff: StaffState;
    staffHelper: any;
    permission: PermissionState;
    permissionHelper: any,
}

export interface BindStaffState {
    visible: boolean;
    staff: any;
    organizationList: any[];
    positionList: any[];
}

export interface BindStaffEvent{
    staffGet: any;
    staffBind: any;
    organizationFilter: any;
}

@connect(
    (state: RootState, ownProps): Pick<BindStaffProps, 'staff' | 'permission'> =>{
        return { 
            staff: state.staff,
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<BindStaffProps, 'staffHelper' | 'permissionHelper'> => {
        return {
            staffHelper: bindActionCreators(staffRedux.actions(), dispatch),
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class BindStaffManager extends React.PureComponent<BindStaffProps, BindStaffState>  implements BindStaffEvent{
    private formRef: any;
    staffGet: any;
    staffBind: any;
    organizationFilter: any;

    constructor(props: BindStaffProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            staff: {
                id: -1,
                name: "",
            },
            organizationList: [],
            positionList: [] 
        };

        this.staffGet = this.props.staffHelper.staffGet;
        this.staffBind = this.props.staffHelper.staffBind;
        this.organizationFilter = this.props.permissionHelper.organizationFilter;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.bindStaff = this.bindStaff.bind(this);
        this.selectOrganization = this.selectOrganization.bind(this);
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

    onOpen(staffId: number){
        this.organizationFilter({
        }).then(() => {
            this.staffGet({
                staffId: staffId
            }).then(() => {
                let staff = this.props.staff.staffCurrent
                let organizationList = this.props.permission.organizationFilter.dataList;
                let positionList = organizationList.find(
                    (obj) => obj.id==staff.organization.id
                ).positionList
                this.setState({
                    visible: true,
                    staff: staff,
                    organizationList: organizationList,
                    positionList: positionList
                });
                this.formRef.current.setFieldsValue({
                    positionId: staff.position.id,
                    organizationId: staff.organization.id,
                })
            })
        })
    }

    bindStaff(){
        this.formRef.current.validateFields().then((values: any) => {
            this.staffBind(
                Object.assign({}, values, {
                    staffId: this.state.staff.id
                })
            ).then(()=>{
                this.props.father.refreshStaff().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    selectOrganization(value: any){
        let organizationList = this.props.permission.organizationFilter.dataList;
        let organization = organizationList.find((obj) => obj.id == value)
        this.setState({
            positionList: organization.positionList
        });
        this.formRef.current.setFieldsValue({
            positionId: organization.positionList[0].id,
        })
    };

    render(){
        const organizationOptions = this.state.organizationList.map(
            (record: any) => {
                return (
                    <antd.Select.Option key={record.id} value={record.id}>
                        {record.name}
                    </antd.Select.Option>
                )
        });
        const positionOptions = this.state.positionList.map(
            (record: any) => {
                return (
                    <antd.Select.Option key={record.id} value={record.id}>
                        {record.name}
                    </antd.Select.Option>
                )
        });
        return (
            <div>
                <antd.Drawer
                    title="调岗"
                    width={380}
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
                            <antd.Space>
                                <antd.Button
                                    onClick={this.onClose}
                                >
                                    取消
                                </antd.Button>
                                <antd.Button 
                                    type="primary"
                                    onClick={this.bindStaff}
                                >
                                    提交
                                </antd.Button>
                            </antd.Space>
                        </div>
                    }
                >
                    <antd.Form 
                        ref={this.formRef}
                        layout="vertical"
                        colon={true}
                    >
                                <antd.Form.Item
                                    name="organizationId"
                                    label="部门"
                                    rules={[{ required: true, message: '部门' }]}
                                >
                                    <antd.Select
                                        showSearch
                                        placeholder="请选择部门"
                                        defaultActiveFirstOption={true}
                                        showArrow={false}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={null}
                                        onChange={this.selectOrganization}
                                    >
                                        {organizationOptions}
                                    </antd.Select>
                                </antd.Form.Item>
                                <antd.Form.Item
                                    name="positionId"
                                    label="职位"
                                    rules={[{ required: true, message: '请输入职位' }]}
                                >
                                    <antd.Select
                                        showSearch
                                        placeholder="请选择职位"
                                        defaultActiveFirstOption={true}
                                        showArrow={false}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={null}
                                    >
                                        {positionOptions}
                                    </antd.Select>
                                </antd.Form.Item>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
