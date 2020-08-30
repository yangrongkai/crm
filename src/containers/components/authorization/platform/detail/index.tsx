'use strict'


import  * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, authorizationRedux, AuthorizationState } from 'reduxes';
import {
    AddRuleManager,
    EditRuleManager,
} from 'containers/components/authorization';
import './index.less';


export interface DetailPlatformProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
}

export interface DetailPlatformState {
    visible: boolean;
    platform: any;
}

export interface DetailPlatformEvent{
    platformGet: any;
    ruleAll: any;
    ruleRemove: any;
}

@connect(
    (state: RootState, ownProps): Pick<DetailPlatformProps, 'authorization' > =>{
        return { authorization: state.authorization };
    },
    (dispatch: Dispatch): Pick<DetailPlatformProps, 'authorizationHelper' > => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
        };
    }
)
export class DetailPlatformManager extends React.PureComponent<DetailPlatformProps, DetailPlatformState>  implements DetailPlatformEvent{
    private formRef: any;
    addRuleComponent: any;
    editRuleComponent: any;

    platformGet: any;
    ruleAll: any;
    ruleRemove: any

    constructor(props: DetailPlatformProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            platform: undefined,
        };

        this.platformGet = this.props.authorizationHelper.platformGet;
        this.ruleAll = this.props.authorizationHelper.ruleAll;
        this.ruleRemove = this.props.authorizationHelper.ruleRemove;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.deleteRule = this.deleteRule.bind(this);
        this.resetRule = this.resetRule.bind(this);
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

    onOpen(platformId: number){
        this.platformGet({
            platformId: platformId
        }).then(() => {
            this.ruleAll({
                platformId: platformId
            }).then(() => {
                let platform =this.props.authorization.platformCurrent
                this.setState({
                    platform: platform
                })
                this.setState({
                    visible: true,
                })
            })
        })
    }

    resetRule(){
        return this.ruleAll({
            platformId: this.state.platform.id
        })
    }

    deleteRule(ruleId: number){
        return this.ruleRemove({
            ruleId: ruleId 
        }).then(() => {
            this.resetRule()
        })
    }

    render(){
        const {platform} = this.state;
        if( platform == undefined ){
            return (<div></div>);
        }
        let mapping = {
            position: "公司",
            person: "个人",
        }
        return (
            <div>
                <antd.Drawer
                    title={
                        <span>
                            {platform.name}
                        </span>
                    }
                    width={840}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <antd.Descriptions 
                        title="基础信息"
                        column={2}
                    >
                        <antd.Descriptions.Item label="归属公司" >
                            <span>
                                {platform.companyName}
                            </span>
                        </antd.Descriptions.Item>
                        <antd.Descriptions.Item label="授权类型">
                            <span>
                                {mapping[platform.appType]}
                            </span>
                        </antd.Descriptions.Item>
                        <antd.Descriptions.Item label="修改时间">
                            <span>
                                {platform.updateTime.format("YYYY-MM-DD hh:mm:ss")}
                            </span>
                        </antd.Descriptions.Item>
                        <antd.Descriptions.Item label="创建时间">
                            <span>
                                {platform.createTime.format("YYYY-MM-DD hh:mm:ss")}
                            </span>
                        </antd.Descriptions.Item>
                        <antd.Descriptions.Item label="备注" span={2}>
                            <span>
                                {platform.remark}
                            </span>
                        </antd.Descriptions.Item>
                    </antd.Descriptions>
                    <antd.Divider/>
                    <antd.Descriptions 
                        title="权限规则"
                        extra={
                            <a onClick={() => this.addRuleComponent.onOpen(platform.id, undefined)}>
                                添加
                            </a>
                        }
                    >
                    </antd.Descriptions>
                    <antd.Table
                        scroll={{x: 1300}}
                        columns={[
                            {
                                title: '规则名称',
                                dataIndex: 'name',
                                key: 'name',
                                fixed: 'left'
                            },
                            {
                                title: '编码',
                                dataIndex: 'code',
                                key: 'code',
                            },
                            {
                                title: '描述',
                                dataIndex: 'description',
                                key: 'description'
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
                                render: (text: string, record: any) => {
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
                                render: (text: string, record: any) => {
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
                                                <a onClick={() => this.addRuleComponent.onOpen(platform.id, record)}>
                                                    添加
                                                </a>
                                                <a onClick={() => this.editRuleComponent.onOpen(record)}>
                                                    编辑
                                                </a>
                                                <antd.Popconfirm 
                                                    title="您确定要删除吗?"
                                                    onConfirm={() => this.deleteRule(record.id)}>
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
                        dataSource={this.props.authorization.ruleList.dataList}
                        pagination={false}
                        defaultExpandAllRows
                    />
                    <AddRuleManager
                        father={this}
                        onRef={(ref: any) => this.addRuleComponent = ref}
                    />
                    <EditRuleManager
                        father={this}
                        onRef={(ref: any) => this.editRuleComponent = ref}
                    />
                </antd.Drawer>
            </div>
        )
    }
};
