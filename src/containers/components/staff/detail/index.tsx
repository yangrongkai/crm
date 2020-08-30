'use strict'


import  * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, authorizationRedux, AuthorizationState } from 'reduxes';
import {
    EditStaffManager,
} from 'containers/components/authorization';
import './index.less';


export interface DetailStaffProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
}

export interface DetailStaffState {
    visible: boolean;
    currentPage: number,
    platform: any;
}

export interface DetailStaffEvent{
    platformGet: any;
    authorizationAdd: any;
    authorizationSearch: any;
    authorizationUpdate: any;
    authorizationGet: any;
    authorizationRemove: any;
    authorizationApply: any;
    authorizationForbidden: any;
    authorizationRefresh: any;
}

@connect(
    (state: RootState, ownProps): Pick<DetailStaffProps, 'authorization' > =>{
        return { authorization: state.authorization };
    },
    (dispatch: Dispatch): Pick<DetailStaffProps, 'authorizationHelper' > => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
        };
    }
)
export class DetailStaffManager extends React.PureComponent<DetailStaffProps, DetailStaffState>  implements DetailStaffEvent{
    private formRef: any;
    addStaffComponent: any;
    editStaffComponent: any;

    platformGet: any;
    authorizationAdd: any;
    authorizationSearch: any;
    authorizationUpdate: any;
    authorizationGet: any;
    authorizationRemove: any;
    authorizationApply: any;
    authorizationForbidden: any;
    authorizationRefresh: any;

    constructor(props: DetailStaffProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            currentPage: 1,
            platform: undefined,
        };

        this.platformGet = this.props.authorizationHelper.platformGet;
        this.authorizationSearch = this.props.authorizationHelper.authorizationSearch;
        this.authorizationUpdate = this.props.authorizationHelper.authorizationUpdate;
        this.authorizationGet = this.props.authorizationHelper.authorizationGet;
        this.authorizationRemove = this.props.authorizationHelper.authorizationRemove;
        this.authorizationApply = this.props.authorizationHelper.authorizationApply;
        this.authorizationForbidden = this.props.authorizationHelper.authorizationForbidden;
        this.authorizationRefresh = this.props.authorizationHelper.authorizationRefresh;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.deleteStaff = this.deleteStaff.bind(this);
        this.resetStaff = this.resetStaff.bind(this);
        this.searchStaff = this.searchStaff.bind(this);

        this.formRef = React.createRef();
        this.changePagination = this.changePagination.bind(this);
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
            this.authorizationSearch({
                currentPage: 1,
                platformId: platformId,
                searchInfo: {}
            }).then(() => {
                let platform =this.props.authorization.platformCurrent
                this.setState({
                    platform: platform,
                    visible: true,
                    currentPage: 1,
                })
                this.formRef.current.setFieldsValue(
                    {
                        name: ""
                    }
                );

            })
        })
    }

    resetStaff(){
        return this.formRef.current.validateFields().then((values: any) => {
            this.authorizationSearch({
                currentPage: this.state.currentPage,
                platformId: this.state.platform.id,
                searchInfo: values
            }).then(() => {
            })
        })
    }

    searchStaff(){
        return this.formRef.current.validateFields().then((values: any) => {
            this.authorizationSearch({
                currentPage: 1,
                platformId: this.state.platform.id,
                searchInfo: values
            }).then(() => {
                let platform =this.props.authorization.platformCurrent
                this.setState({
                    platform: platform,
                    visible: true,
                    currentPage: 1,
                })
            })
        })
    }

    changePagination(index: number){
        return this.formRef.current.validateFields().then((values: any) => {
            this.authorizationSearch({
                currentPage: index,
                platformId: this.state.platform.id,
                searchInfo: values,
            }).then(()=>{
                this.setState({
                    currentPage: index,
                })
            });
        })
    }

    deleteStaff(authorizationId: number){
        return this.authorizationRemove({
            authorizationId: authorizationId 
        }).then(() => {
            this.resetStaff()
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
                    forceRender={true}
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
                        title="授权列表"
                    >
                    </antd.Descriptions>
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
                                    label="公司名称"
                                    rules={[
                                      {
                                        message: '公司名称',
                                      },
                                    ]}
                                >
                                    <antd.Input placeholder="公司名称" />
                                </antd.Form.Item>
                                <antd.Button type="primary" 
                                    onClick={ this.searchStaff }
                                >
                                    搜索
                                </antd.Button>
                                <antd.Button
                                    style={{ margin: '0 8px' }}
                                    onClick={() => this.addStaffComponent.onOpen(this.state.platform.id)}
                                >
                                    添加
                                </antd.Button>
                        </antd.Space>
                    </antd.Form>
                    <antd.Table
                        scroll={{x: 1300}}
                        columns={[
                            {
                                title: '公司',
                                dataIndex: 'companyName',
                                key: 'companyName',
                                fixed: 'left'
                            },
                            {
                                title: 'appkey',
                                dataIndex: 'appkey',
                                key: 'appkey',
                            },
                            {
                                title: '使用状态',
                                dataIndex: 'useStatus',
                                key: 'useStatus',
                                render: (text: string, record: any) => {
                                    return (
                                        <span>
                                            { 
                                                text == "enable" ?
                                                <span >已启用</span>:
                                                <span >已禁用</span>
                                            }
                                        </span>
                                    )
                                }
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
                                                <a onClick={() => this.editStaffComponent.onOpen(record.id)}>
                                                    编辑
                                                </a>
                                                <antd.Popconfirm 
                                                    title="您确定要删除吗?"
                                                    onConfirm={() => this.deleteStaff(record.id)}>
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
                        dataSource={this.props.authorization.authorizationList.dataList}
                        pagination={{
                            current: this.state.currentPage,
                            total: this.props.authorization.authorizationList.total,
                            onChange: this.changePagination
                        }}
                        defaultExpandAllRows
                    />
                    <EditStaffManager
                        father={this}
                        onRef={(ref: any) => this.editStaffComponent = ref}
                    />
                </antd.Drawer>
            </div>
        )
    }
};
