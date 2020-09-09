'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { 
    RootState,
    staffRedux,
    StaffState,
    permissionRedux,
    PermissionState,
} from 'reduxes';
import './index.less';


export interface AddStaffProps {
    staff: StaffState;
    staffHelper: any;
    permission: PermissionState;
    permissionHelper: any,
}

export interface AddStaffState {
    visible: boolean;
    organizationList: any[];
    positionList: any[];
}

export interface AddStaffEvent{
    staffAdd: any;
    organizationFilter: any;
}

@connect(
    (state: RootState, ownProps): Pick<AddStaffProps, 'staff' | 'permission'> =>{
        return { 
            staff: state.staff,
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<AddStaffProps, 'staffHelper' | 'permissionHelper'> => {
        return {
            staffHelper: bindActionCreators(staffRedux.actions(), dispatch),
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class AddStaffManager extends React.PureComponent<AddStaffProps, AddStaffState>  implements AddStaffEvent{
    private formRef: any;
    staffAdd: any;
    organizationFilter: any;

    constructor(props: AddStaffProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            organizationList: [],
            positionList: [] 
        };

        this.staffAdd = this.props.staffHelper.staffAdd;
        this.organizationFilter = this.props.permissionHelper.organizationFilter;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.selectOrganization = this.selectOrganization.bind(this);
        this.addStaff = this.addStaff.bind(this);
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

    onOpen(){
        this.organizationFilter({
            appkey: config.permission.appkey
        }).then(() => {
            let organizationList = this.props.permission.organizationFilter.dataList;
            if(organizationList.length > 0){
                this.setState({
                    visible: true,
                    organizationList: organizationList,
                    positionList: organizationList[0].positionList
                });
                this.formRef.current.setFieldsValue({
                    name: undefined,
                    gender: "man",
                    birthday: undefined,
                    email: undefined,
                    phone: undefined,
                    qq: undefined,
                    wechat: undefined,
                    organizationId: undefined,
                    positionId: undefined,
                })
            } else {
                this.onClose()
                antd.message.warn("系统没有设置组织结构")
            }
        })
    }

    addStaff(){
        this.formRef.current.validateFields().then((values: any) => {
            this.staffAdd({
                appkey: config.permission.appkey,
                staffInfo: Object.assign({}, values, {
                })
            }).then(()=>{
                this.props.father.refreshStaff().then(() =>{
                    this.onClose()
                })
            })
        })
    }

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
                    title="添加员工"
                    width={680}
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
                                    onClick={this.addStaff}
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
                        <antd.Row gutter={16}>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="name"
                                    label="姓名"
                                    rules={[{ required: true, message: '请输入姓名' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入姓名" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                            <antd.Col span={12}>
                                <antd.Row>
                                    <antd.Col span={8}>
                                        <antd.Form.Item name="gender" label="性别">
                                            <antd.Radio.Group>
                                                <antd.Radio.Button value="man">男</antd.Radio.Button>
                                                <antd.Radio.Button value="woman">女</antd.Radio.Button>
                                            </antd.Radio.Group>
                                         </antd.Form.Item>
                                    </antd.Col>
                                    <antd.Col span={16}>
                                            <antd.Form.Item
                                                name="birthday"
                                                label="生日"
                                                rules={[{ required: false, message: '请输入生日' }]}
                                            >
                                                <antd.DatePicker
                                                    format="YYYY-MM-DD"
                                                />
                                            </antd.Form.Item>
                                    </antd.Col>
                                </antd.Row>
                            </antd.Col>
                        </antd.Row>
                        <antd.Row gutter={16}>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="phone"
                                    label="手机号"
                                    rules={[{ required: true, message: '请输入手机号' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入手机号" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="email"
                                    label="邮箱"
                                    rules={[{ required: false, message: '请输入邮件' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入邮箱" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                        </antd.Row>
                        <antd.Row gutter={16}>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="qq"
                                    label="QQ"
                                    rules={[{ required: false, message: '请输入QQ' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入QQ" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="wechat"
                                    label="微信"
                                    rules={[{ required: false, message: '请输入微信' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入微信" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                        </antd.Row>
                        <antd.Row gutter={16}>
                            <antd.Col span={12}>
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
                            </antd.Col>
                            <antd.Col span={12}>
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
                            </antd.Col>
                        </antd.Row>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
