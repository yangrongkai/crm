'use strict'


import  * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, permissionRedux, PermissionState } from 'reduxes';
import {
    AddOrganizationManager,
    EditOrganizationManager,
} from 'containers/components/permission';
import * as config from  '&/config.js';
import './index.less';


export interface OrganizationProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface OrganizationState {
}

export interface OrganizationEvent{
    organizationSearch: any;
    organizationRemove: any;
}

@connect(
    (state: RootState, ownProps): Pick<OrganizationProps, 'permission' > =>{
        return { permission: state.permission };
    },
    (dispatch: Dispatch): Pick<OrganizationProps, 'permissionHelper' > => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class OrganizationManager extends React.PureComponent<OrganizationProps, OrganizationState>  implements OrganizationEvent{
    addOrganizationComponent: any;
    editOrganizationComponent: any;

    organizationSearch: any;
    organizationRemove: any

    constructor(props: OrganizationProps, context?: any) {
        super(props, context);

        this.organizationSearch = this.props.permissionHelper.organizationSearch;
        this.organizationRemove = this.props.permissionHelper.organizationRemove;

        this.deleteOrganization = this.deleteOrganization.bind(this);
        this.refreshOrganization = this.refreshOrganization.bind(this);
    }

    componentDidMount(){
        this.refreshOrganization()
    }

    refreshOrganization(){
        return this.organizationSearch({
            appkey: config.permission.appkey
        })
    }

    deleteOrganization(organizationId: number){
        return this.organizationRemove({
            organizationId: organizationId 
        }).then(() => {
            this.refreshOrganization()
        })
    }

    render(){
        return (
            <div>
            <antd.Alert message={
                <antd.Space>
                    <span>
                        组织管理树列表
                    </span>
                    <span>
                        <a
                            style={{ margin: '0 8px' }}
                            onClick={() => this.addOrganizationComponent.onOpen(0)}
                        >
                            添加顶级组织
                        </a>
                    </span>
                </antd.Space>
            } type="info" showIcon />
                <antd.Table
                    scroll={{x: 1300}}
                    columns={[
                        {
                            title: '组织名称',
                            dataIndex: 'name',
                            key: 'name',
                            fixed: 'left'
                        },
                        {
                            title: '涉及职位',
                            dataIndex: 'positionList',
                            key: 'positionList',
                            render: (text: any, record: any) => {
                                let nameList = text.map((obj: any)=> obj.name)
                                let name = nameList.join(", ")
                                return (
                                    <span>{name}</span>
                                )
                            }
                        },
                        {
                            title: '描述',
                            dataIndex: 'remark',
                            key: 'remark'
                        },
                        {
                            title: '备注',
                            dataIndex: 'remark',
                            key: 'remark'
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
                            }
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
                            }
                        },
                        {
                            title: '操作',
                            dataIndex: 'option',
                            key: 'option',
                            fixed: 'right',
                            render: (text: string, record: any) => {
                                return (
                                    <div>
                                        <antd.Space>
                                            <a onClick={() => this.addOrganizationComponent.onOpen(record.id)}>
                                                添加
                                            </a>
                                            <a onClick={() => this.editOrganizationComponent.onOpen(record.id)}>
                                                编辑
                                            </a>
                                            <antd.Popconfirm 
                                                title="您确定要删除吗?"
                                                onConfirm={() => this.deleteOrganization(record.id)}>
                                                <a >
                                                    删除
                                                </a>
                                            </antd.Popconfirm>
                                        </antd.Space>

                                    </div>
                                )
                            }
                        }
                    ]}
                    indentSize={42}
                    dataSource={this.props.permission.organizationSearch.dataList}
                    pagination={false}
                    rowKey={(record: any) => record.id}
                    key={JSON.stringify(this.props.permission.organizationSearch.dataList)}
                    defaultExpandAllRows
                />
                <AddOrganizationManager
                    father={this}
                    onRef={(ref: any) => this.addOrganizationComponent = ref}
                />
                <EditOrganizationManager
                    father={this}
                    onRef={(ref: any) => this.editOrganizationComponent = ref}
                />
            </div>
        )
    }
};
