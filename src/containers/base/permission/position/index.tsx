'use strict'


import  * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, permissionRedux, PermissionState } from 'reduxes';
import {
    AddPositionManager,
    EditPositionManager,
} from 'containers/components/permission';
import * as config from  '&/config.js';
import './index.less';


export interface PositionProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface PositionState {
}

export interface PositionEvent{
    positionSearch: any;
    positionRemove: any;
}

@connect(
    (state: RootState, ownProps): Pick<PositionProps, 'permission' > =>{
        return { permission: state.permission };
    },
    (dispatch: Dispatch): Pick<PositionProps, 'permissionHelper' > => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class PositionManager extends React.PureComponent<PositionProps, PositionState>  implements PositionEvent{
    addPositionComponent: any;
    editPositionComponent: any;

    positionSearch: any;
    positionRemove: any

    constructor(props: PositionProps, context?: any) {
        super(props, context);

        this.positionSearch = this.props.permissionHelper.positionSearch;
        this.positionRemove = this.props.permissionHelper.positionRemove;

        this.deletePosition = this.deletePosition.bind(this);
        this.refreshPosition = this.refreshPosition.bind(this);
    }

    componentDidMount(){
        this.refreshPosition()
    }

    refreshPosition(){
        return this.positionSearch({
            appkey: config.permission.appkey
        })
    }

    deletePosition(positionId: number){
        return this.positionRemove({
            positionId: positionId 
        }).then(() => {
            this.refreshPosition()
        })
    }

    render(){
        return (
            <div>
            <antd.Alert message={
                <antd.Space>
                    <span>
                        职位管理树桩列表
                    </span>
                    <span>
                        <a
                            style={{ margin: '0 8px' }}
                            onClick={() => this.addPositionComponent.onOpen(0)}
                        >
                            添加顶级职位
                        </a>
                    </span>
                </antd.Space>
            } type="info" showIcon />
                <antd.Table
                    scroll={{x: 1300}}
                    columns={[
                        {
                            title: '职称',
                            dataIndex: 'name',
                            key: 'name',
                            fixed: 'left'
                        },
                        {
                            title: '权限组',
                            dataIndex: 'ruleGroupName',
                            key: 'ruleGroupName'
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
                                            <a onClick={() => this.addPositionComponent.onOpen(record.id)}>
                                                添加
                                            </a>
                                            <a onClick={() => this.editPositionComponent.onOpen(record.id)}>
                                                编辑
                                            </a>
                                            <antd.Popconfirm 
                                                title="您确定要删除吗?"
                                                onConfirm={() => this.deletePosition(record.id)}
                                                okText="确定"
                                                cancelText="取消"
                                            >
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
                    dataSource={this.props.permission.positionSearch.dataList}
                    pagination={false}
                    rowKey={(record: any) => record.id}
                    key={JSON.stringify(this.props.permission.positionSearch.dataList)}
                    defaultExpandAllRows
                />
                <AddPositionManager
                    father={this}
                    onRef={(ref: any) => this.addPositionComponent = ref}
                />
                <EditPositionManager
                    father={this}
                    onRef={(ref: any) => this.editPositionComponent = ref}
                />
            </div>
        )
    }
};
