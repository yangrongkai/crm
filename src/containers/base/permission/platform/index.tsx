'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, authorizationRedux, AuthorizationState } from 'reduxes';
import { 
    AddPlatformManager,
    DetailPlatformManager,
    EditPlatformManager,
    DetailCompanyManager,
} from 'containers/components/authorization';
import './index.less';


export interface PlatformProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
    history: any;
}

export interface PlatformState {
    currentPage: number;
    pageSizeOptions: any[],
}

export interface PlatformPageEvent{
    platformSearch: any;
    platformRemove: any;
}


@connect(
    (state: RootState, ownProps): Pick<PlatformProps, 'authorization' > =>{
        return { authorization: state.authorization };
    },
    (dispatch: Dispatch): Pick<PlatformProps, 'authorizationHelper' > => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
        };
    }
)
export class PlatformManager extends React.PureComponent<PlatformProps, PlatformState>  implements PlatformPageEvent{

    private formRef: any;
    addPlatformComponent: any;
    detailPlatformComponent: any;
    editPlatformComponent: any;
    detailCompanyComponent: any;

    platformSearch: any;
    platformRemove: any;

    constructor(props: PlatformProps, context?: any) {
        super(props, context);

        this.state = {
            currentPage: 1,
            pageSizeOptions: ["10", "20", "50"],
        }

        this.platformSearch =this.props.authorizationHelper.platformSearch;
        this.platformRemove = this.props.authorizationHelper.platformRemove;

        this.formRef = React.createRef();
        this.searchPlatform = this.searchPlatform.bind(this);
        this.refreshPlatform = this.refreshPlatform.bind(this);
        this.changePagination = this.changePagination.bind(this);
    }

    searchPlatform(){
        this.formRef.current.validateFields().then((values: any) => {
            this.platformSearch({
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
        this.searchPlatform()
    }
    
    refreshPlatform(){
        this.formRef.current.validateFields().then((values: any) => {
            this.platformSearch({
                currentPage: this.state.currentPage,
                searchInfo: values,
            })
        })
    }

    changePagination(index: number){
        this.formRef.current.validateFields().then((values: any) => {
            this.platformSearch({
                currentPage: index,
                searchInfo: values,
            }).then(()=>{
                this.setState({
                    currentPage: index,
                })
            });
        })
    }

    deletePlatform(platformId: number){
        this.platformRemove({
            platformId: platformId
        }).then(() =>{
            this.refreshPlatform()
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
                                    label="平台名称"
                                    rules={[
                                      {
                                        message: '平台名称',
                                      },
                                    ]}
                                >
                                    <antd.Input placeholder="平台名称" />
                                </antd.Form.Item>
                                <antd.Button type="primary" 
                                    onClick={ this.searchPlatform }
                                >
                                    搜索
                                </antd.Button>
                                <antd.Button
                                    style={{ margin: '0 8px' }}
                                    onClick={() => this.addPlatformComponent.onOpen()}
                                >
                                    添加
                                </antd.Button>
                        </antd.Space>
                    </antd.Form>
                    <antd.Table
                        title={() => {
                            let message = "共计 " + this.props.authorization.platformList.total + " 条";
                            return (
                                <antd.Alert message={message} type="info" showIcon />
                            )
                        }}
                        columns={
                            [
                                {
                                    title: '平台名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: '归属公司',
                                    dataIndex: 'companyName',
                                    key: 'companyName',
                                },
                                {
                                    title: '授权类型',
                                    dataIndex: 'appType',
                                    key: 'appType',
                                    render: (text: string) => {
                                        let mapping: any = {
                                            position: "公司",
                                            person: "个人",
                                        }
                                        return (
                                            <span>
                                                {mapping[text]}
                                            </span>
                                        )
                                    }
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
                                    render: (text: string, record: any) => (
                                        <antd.Space>
                                            <a
                                                onClick={() => this.detailPlatformComponent.onOpen(record.id)}

                                            >详情</a>
                                            <a
                                                onClick={() => this.editPlatformComponent.onOpen(record.id)}

                                            >编辑</a>
                                            <a
                                                onClick={() => this.detailCompanyComponent.onOpen(record.id)}

                                            >授权</a>

                                            <antd.Popconfirm 
                                                title="您确认要删除吗"
                                                onConfirm={() => this.deletePlatform(record.id)}
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
                        dataSource={this.props.authorization.platformList.dataList}
                        pagination={{
                            current: this.state.currentPage,
                            total: this.props.authorization.platformList.total,
                            onChange: this.changePagination
                        }}
                        rowKey={(record) => record.id}
                    >
                    </antd.Table>
                </antd.Space>
                <AddPlatformManager
                    father={this}
                    onRef={(ref: any) => this.addPlatformComponent = ref}
                />
                <DetailPlatformManager
                    father={this}
                    onRef={(ref: any) => this.detailPlatformComponent = ref}
                />
                <EditPlatformManager
                    father={this}
                    onRef={(ref: any) => this.editPlatformComponent = ref}
                />
                <DetailCompanyManager
                    father={this}
                    onRef={(ref: any) => this.detailCompanyComponent = ref}
                />
            </div>
        )
    }
};
