'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { 
    RootState,
    permissionRedux,
    PermissionState,
    StaffState,
    staffRedux,
} from 'reduxes';
import { 
    AddStaffManager,
    DetailStaffManager,
    BindStaffManager,
} from 'containers/components/staff';
import './index.less';


export interface StaffPageProps {
    permission: PermissionState;
    permissionHelper: any;
    staff: StaffState;
    staffHelper: any;
    history: any;
}

export interface StaffPageState {
    currentPage: number;
    pageSizeOptions: any[],
}

export interface StaffPageEvent{
    staffSearch: any;
    staffResetPassword: any;
}


@connect(
    (state: RootState, ownProps): Pick<StaffPageProps, 'permission' | "staff"> =>{
        return { permission: state.permission, staff: state.staff};
    },
    (dispatch: Dispatch): Pick<StaffPageProps, 'permissionHelper' | 'staffHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
            staffHelper: bindActionCreators(staffRedux.actions(), dispatch),
        };
    }
)
export class StaffManager extends React.PureComponent<StaffPageProps, StaffPageState>  implements StaffPageEvent{

    private formRef: any;
    addStaffComponent: any;
    detailStaffComponent: any;
    bindStaffComponent: any;

    staffSearch: any;
    staffResetPassword: any;

    constructor(props: StaffPageProps, context?: any) {
        super(props, context);

        this.state = {
            currentPage: 1,
            pageSizeOptions: ["10", "20", "50"],
        }

        this.staffSearch =this.props.staffHelper.staffSearch;
        this.staffResetPassword =this.props.staffHelper.staffResetPassword;

        this.formRef = React.createRef();
        this.searchStaff = this.searchStaff.bind(this);
        this.refreshStaff = this.refreshStaff.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.changePagination = this.changePagination.bind(this);
    }

    searchStaff(){
        this.formRef.current.validateFields().then((values: any) => {
            this.staffSearch({
                currentPage: 1,
                searchInfo: values,
            }).then(()=>{
                this.setState({
                    currentPage: 1,
                })
            });
        })
    }

    componentDidMount(){
        this.searchStaff()
    }
    
    resetPassword(staffId: number){
        this.staffResetPassword({
            staffId: staffId
        })
    }

    refreshStaff(){
        return this.formRef.current.validateFields().then((values: any) => {
            this.staffSearch({
                currentPage: this.state.currentPage,
                searchInfo: values,
            })
        })
    }

    changePagination(index: number){
        this.formRef.current.validateFields().then((values: any) => {
            this.staffSearch({
                currentPage: index,
                searchInfo: values,
            }).then(()=>{
                this.setState({
                    currentPage: index,
                })
            });
        })
    }

    render(){
        return (
            <div >
                <antd.Space 
                    direction="vertical"
                    style={{
                        width:"100%",
                    }}
                >
                    <antd.Form
                        ref={this.formRef}
                        labelCol={{span:8 }}
                        wrapperCol={{span:16 }}
                        colon={true}
                        style={{
                            padding: "5px 15px"
                        }}
                    >
                        <antd.Space align="baseline">
                                <antd.Form.Item
                                    name="name"
                                    label="工号"
                                    rules={[
                                      {
                                        message: '工号',
                                      },
                                    ]}
                                >
                                    <antd.Input placeholder="工号" />
                                </antd.Form.Item>
                                <antd.Button type="primary" 
                                    onClick={ this.searchStaff }
                                >
                                    搜索
                                </antd.Button>
                                <antd.Button
                                    style={{ margin: '0 8px' }}
                                    onClick={() => this.addStaffComponent.onOpen()}
                                >
                                    添加
                                </antd.Button>
                        </antd.Space>
                    </antd.Form>
                    <antd.Table
                        scroll={{ x: 2400 }}
                        title={() => {
                            let message = "共计 " + this.props.staff.staffSearch.total + " 条";
                            return (
                                <antd.Alert message={message} type="info" showIcon />
                            )
                        }}
                        columns={
                            [
                                {
                                    title: '工号',
                                    dataIndex: 'workNumber',
                                    key: 'workNumber',
                                    fixed: "left",
                                },
                                {
                                    title: '姓名',
                                    dataIndex: 'name',
                                    key: 'name',
                                    fixed: "left",
                                    render : (text: string, record: any) =>{
                                        return (
                                            <antd.Space>
                                                <span className="ant-form-text">
                                                    {record.name}
                                                </span>
                                                <span className="ant-form-text">
                                                    {
                                                        record.gender == "man"
                                                        ? <icons.ManOutlined style={{color:"blue"}}/>
                                                        : <icons.WomanOutlined style={{color:"pink"}}/>
                                                    }
                                                </span>
                                            </antd.Space>
                                        )
                                    }
                                },
                                {
                                    title: '部门',
                                    dataIndex: 'organization',
                                    key: 'organization',
                                    render: (text: any, record: any) => {
                                        return (
                                            <span className="ant-form-text">
                                                {text.name}
                                            </span>
                                        )
                                    }
                                },
                                {
                                    title: '职位',
                                    dataIndex: 'position',
                                    key: 'position',
                                    render: (text: any, record: any) => {
                                        return (
                                            <span className="ant-form-text">
                                                {text.name}
                                            </span>
                                        )
                                    }
                                },
                                {
                                    title: '管理员',
                                    dataIndex: 'isAdmin',
                                    key: 'isAdmin',
                                    render: (text: any, record: any) => {
                                        return (
                                            <span className="ant-form-text">
                                                {
                                                    record.isAdmin
                                                    ? <span>是</span>
                                                    : <span>不是</span>
                                                }
                                            </span>
                                        )
                                    }
                                },
                                {
                                    title: '生日',
                                    dataIndex: 'birthday',
                                    key: 'birthday',
                                    render: (text: any, record: any) => {
                                        return (
                                            <span>
                                                {text.format("YYYY-MM-DD")}
                                            </span>
                                        )
                                    },
                                },
                                {
                                    title: '手机号',
                                    dataIndex: 'phone',
                                    key: 'phone',
                                },
                                {
                                    title: '邮箱',
                                    dataIndex: 'email',
                                    key: 'email',
                                },
                                {
                                    title: 'QQ',
                                    dataIndex: 'qqq',
                                    key: 'qq',
                                },
                                {
                                    title: '微信',
                                    dataIndex: 'wechat',
                                    key: 'wechat',
                                },
                                {
                                    title: '更新时间',
                                    dataIndex: 'updateTime',
                                    key: 'updateTime',
                                    render: (text: any, record: any) => {
                                        return (
                                            <span>
                                                {text.format("YYYY-MM-DD hh:mm:ss")}
                                            </span>
                                        )
                                    },
                                },
                                {
                                    title: '创建时间',
                                    dataIndex: 'createTime',
                                    key: 'createTime',
                                    render: (text: any, record: any) => {
                                        return (
                                            <span>
                                                {text.format("YYYY-MM-DD hh:mm:ss")}
                                            </span>
                                        )
                                    },
                                },
                                {
                                    title: '备注',
                                    dataIndex: 'remark',
                                    key: 'remark',
                                    ellipsis: true,
                                },
                                {
                                    title: '操作',
                                    key: 'action',
                                    fixed: "right",
                                    render: (text: string, record: any) => (
                                        <antd.Space>
                                            <a
                                                onClick={() => this.detailStaffComponent.onOpen(record.id)}

                                            >详情</a>
                                            <a
                                                onClick={() => this.bindStaffComponent.onOpen(record.id)}

                                            >调岗</a>
                                            <antd.Popconfirm 
                                                title="此操作将会把密码修改为“123456”."
                                                okText="确认"
                                                cancelText="取消"
                                                onConfirm={ () => this.resetPassword(record.id) }
                                            >
                                                <a href="#">
                                                    重置密码
                                                </a>
                                            </antd.Popconfirm>
                                        </antd.Space>
                                    ),
                                },
                            ]
                        }
                        dataSource={this.props.staff.staffSearch.dataList}
                        pagination={{
                            current: this.state.currentPage,
                            total: this.props.staff.staffSearch.total,
                            onChange: this.changePagination
                        }}
                    >
                    </antd.Table>
                </antd.Space>
                <AddStaffManager
                    father={this}
                    onRef={(ref: any) => this.addStaffComponent = ref}
                />
                <DetailStaffManager
                    father={this}
                    onRef={(ref: any) => this.detailStaffComponent = ref}
                />
                <BindStaffManager
                    father={this}
                    onRef={(ref: any) => this.bindStaffComponent = ref}
                />
            </div>
        )
    }
};
