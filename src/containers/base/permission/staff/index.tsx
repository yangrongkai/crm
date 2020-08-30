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
    staffRemove: any;
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

    staffSearch: any;
    staffRemove: any;

    constructor(props: StaffPageProps, context?: any) {
        super(props, context);

        this.state = {
            currentPage: 1,
            pageSizeOptions: ["10", "20", "50"],
        }

        this.staffSearch =this.props.permissionHelper.staffSearch;
        this.staffRemove = this.props.permissionHelper.staffRemove;

        this.formRef = React.createRef();
        this.searchStaff = this.searchStaff.bind(this);
        this.refreshStaff = this.refreshStaff.bind(this);
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
    
    refreshStaff(){
        this.formRef.current.validateFields().then((values: any) => {
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

    deleteStaff(staffId: number){
        this.staffRemove({
            staffId: staffId
        }).then(() =>{
            this.refreshStaff()
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
                                },
                                {
                                    title: '姓名',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: '部门',
                                    dataIndex: 'department',
                                    key: 'department',
                                },
                                {
                                    title: '职位',
                                    dataIndex: 'position',
                                    key: 'position',
                                },
                                {
                                    title: '管理员',
                                    dataIndex: 'isAdmin',
                                    key: 'isAdmin',
                                },
                                {
                                    title: '生日',
                                    dataIndex: 'birthday',
                                    key: 'birthday',
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
                                    render: (text: string, record: any) => {
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
                                    render: (text: string, record: any) => {
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
                                    render: (text: string, record: any) => (
                                        <antd.Space>
                                            <a
                                                onClick={() => this.addStaffComponent.onOpen(record.id)}

                                            >添加</a>
                                            <a
                                                onClick={() => this.detailStaffComponent.onOpen(record.id)}

                                            >详情</a>
                                            <antd.Popconfirm 
                                                title="您确认要删除吗"
                                                onConfirm={() => this.deleteStaff(record.id)}
                                            >
                                                <a>删除</a>
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
            </div>
        )
    }
};
