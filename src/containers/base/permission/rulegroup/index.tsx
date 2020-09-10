'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, permissionRedux, PermissionState } from 'reduxes';
import { 
    AddRuleGroupManager,
    EditRuleGroupManager,
} from 'containers/components/permission';
import './index.less';


export interface RuleGroupProps {
    permission: PermissionState;
    permissionHelper: any;
    history: any;
}

export interface RuleGroupState {
    currentPage: number;
    pageSizeOptions: any[],
}

export interface RuleGroupEvent{
    ruleGroupSearch: any;
    ruleGroupRemove: any;
}


@connect(
    (state: RootState, ownProps): Pick<RuleGroupProps, 'permission' > =>{
        return { permission: state.permission };
    },
    (dispatch: Dispatch): Pick<RuleGroupProps, 'permissionHelper' > => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class RuleGroupManager extends React.PureComponent<RuleGroupProps, RuleGroupState>  implements RuleGroupEvent{

    private formRef: any;
    addRuleGroupComponent: any;
    editRuleGroupComponent: any;
    detailCompanyComponent: any;

    ruleGroupSearch: any;
    ruleGroupRemove: any;

    constructor(props: RuleGroupProps, context?: any) {
        super(props, context);

        this.state = {
            currentPage: 1,
            pageSizeOptions: ["10", "20", "50"],
        }

        this.ruleGroupSearch =this.props.permissionHelper.ruleGroupSearch;
        this.ruleGroupRemove = this.props.permissionHelper.ruleGroupRemove;

        this.formRef = React.createRef();
        this.searchRuleGroup = this.searchRuleGroup.bind(this);
        this.refreshRuleGroup = this.refreshRuleGroup.bind(this);
        this.changePagination = this.changePagination.bind(this);
    }

    componentDidMount(){
        this.searchRuleGroup()
    }
    
    searchRuleGroup(){
        return this.formRef.current.validateFields().then((values: any) => {
            this.ruleGroupSearch({
                appkey: config.permission.appkey,
                currentPage: 1,
                searchInfo: values,
            }).then(()=>{
                this.setState({
                    currentPage: 1,
                })
            });
        })
    }

    refreshRuleGroup(){
        return this.formRef.current.validateFields().then((values: any) => {
            this.ruleGroupSearch({
                appkey: config.permission.appkey,
                currentPage: this.state.currentPage,
                searchInfo: values,
            })
        })
    }

    changePagination(index: number){
        return this.formRef.current.validateFields().then((values: any) => {
            this.ruleGroupSearch({
                appkey: config.permission.appkey,
                currentPage: index,
                searchInfo: values,
            }).then(()=>{
                this.setState({
                    currentPage: index,
                })
            });
        })
    }

    deleteRuleGroup(ruleGroupId: number){
        this.ruleGroupRemove({
            ruleGroupId: ruleGroupId
        }).then(() =>{
            this.refreshRuleGroup()
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
                                    label="权限组名称"
                                    rules={[
                                      {
                                        message: '权限组名称',
                                      },
                                    ]}
                                >
                                    <antd.Input placeholder="权限组名称" />
                                </antd.Form.Item>
                                <antd.Button type="primary" 
                                    onClick={ this.searchRuleGroup }
                                >
                                    搜索
                                </antd.Button>
                                <antd.Button
                                    style={{ margin: '0 8px' }}
                                    onClick={() => this.addRuleGroupComponent.onOpen()}
                                >
                                    添加
                                </antd.Button>
                        </antd.Space>
                    </antd.Form>
                    <antd.Table
                        scroll={{ x: 1300 }}
                        title={() => {
                            let message = "共计 " + this.props.permission.ruleGroupSearch.total + " 条";
                            return (
                                <antd.Alert message={message} type="info" showIcon />
                            )
                        }}
                        columns={
                            [
                                {
                                    title: '权限组名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    fixed: 'left',
                                },
                                {
                                    title: '描述',
                                    dataIndex: 'description',
                                    key: 'description',
                                },
                                {
                                    title: '备注',
                                    dataIndex: 'remark',
                                    key: 'remark',
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
                                    title: '操作',
                                    key: 'action',
                                    fixed: 'right',
                                    render: (text: string, record: any) => (
                                        <antd.Space>
                                            <a
                                                onClick={() => this.editRuleGroupComponent.onOpen(record.id)}

                                            >编辑</a>

                                            <antd.Popconfirm 
                                                title="您确认要删除吗"
                                                onConfirm={() => this.deleteRuleGroup(record.id)}
                                                okText="确定"
                                                cancelText="取消"
                                            >
                                                <a>删除</a>
                                            </antd.Popconfirm>
                                        </antd.Space>
                                    ),
                                },
                            ]
                        }
                        dataSource={this.props.permission.ruleGroupSearch.dataList}
                        pagination={{
                            current: this.state.currentPage,
                            total: this.props.permission.ruleGroupSearch.total,
                            onChange: this.changePagination
                        }}
                        rowKey={(record: any) => record.id}
                        key={JSON.stringify(this.props.permission.ruleGroupSearch.dataList)}
                    >
                    </antd.Table>
                </antd.Space>
                <AddRuleGroupManager
                    father={this}
                    onRef={(ref: any) => this.addRuleGroupComponent = ref}
                />
                <EditRuleGroupManager
                    father={this}
                    onRef={(ref: any) => this.editRuleGroupComponent = ref}
                />
            </div>
        )
    }
};
