'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    authorizationRedux,
    AuthorizationState,
    EnterpriseState,
    enterpriseRedux
} from 'reduxes';
import './index.less';


export interface EditPlatformProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
    enterprise: EnterpriseState;
    enterpriseHelper: any;
}

export interface EditPlatformState {
    visible: boolean;
    platform: any;
}

export interface EditPlatformEvent{
    platformUpdate: any;
    platformGet: any;
    enterpriseSearch: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditPlatformProps, 'authorization' | "enterprise" > =>{
        return { 
            authorization: state.authorization,
            enterprise: state.enterprise,
        };
    },
    (dispatch: Dispatch): Pick<EditPlatformProps, 'authorizationHelper'| "enterpriseHelper" > => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
            enterpriseHelper: bindActionCreators(enterpriseRedux.actions(), dispatch),
        };
    }
)
export class EditPlatformManager extends React.PureComponent<EditPlatformProps, EditPlatformState>  implements EditPlatformEvent{
    private formRef: any;
    platformUpdate: any;
    platformGet: any;
    enterpriseSearch: any;

    constructor(props: EditPlatformProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            platform: undefined,
        };

        this.platformGet = this.props.authorizationHelper.platformGet;
        this.platformUpdate = this.props.authorizationHelper.platformUpdate;
        this.enterpriseSearch = this.props.enterpriseHelper.enterpriseSearch;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.updatePlatform = this.updatePlatform.bind(this);
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

    searchEnterprise(text: string){
        this.enterpriseSearch({
            currentPage: 1,
            searchInfo: {
                name: text
            }
        })
    }

    onOpen(platformId: number){
        this.platformGet({
            platformId: platformId
        }).then(() => {
            this.enterpriseSearch({
                currentPage: 1,
                searchInfo: {
                }
            }).then(() => {
                let platform  = this.props.authorization.platformCurrent
                this.formRef.current.setFieldsValue(
                    platform
                )
                this.setState({
                    visible: true,
                    platform: platform
                })
            })
        })
    }

    updatePlatform(){
        let platformId = this.state.platform.id
        this.formRef.current.validateFields().then((values: any) => {
            this.platformUpdate({
                platformId: platformId,
                updateInfo: values,
            }).then(()=>{
                this.platformGet({
                    platformId: platformId
                }).then(()=>{
                    this.props.father.refreshPlatform()
                    this.onClose()
                })
            })
        })
    }

    render(){
        const options = this.props.enterprise.dataList.map(
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
                    title="编辑平台"
                    width={480}
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
                                    onClick={this.updatePlatform}
                                >
                                    提交
                                </antd.Button>
                            </antd.Space>
                        </div>
                    }
                >
                    <antd.Form 
                        ref={this.formRef}
                        labelCol={{span:5 }}
                        wrapperCol={{span:19 }}
                        colon={true}
                    >
                        <antd.Form.Item
                            name="name"
                            label="平台名称"
                            rules={[{ required: true, message: '请输入平台名称' }]}
                        >
                            <antd.Input 
                                placeholder="请输入平台名称" 
                            />
                        </antd.Form.Item>
                        <antd.Form.Item
                            name="appType"
                            label="平台类型"
                            rules={[{ required: true, message: '请输入平台类型' }]}
                        >
                            <antd.Radio.Group>
                                <antd.Space>
                                    <antd.Radio.Button value="position">公司</antd.Radio.Button>
                                    <antd.Radio.Button value="person">个人</antd.Radio.Button>
                                </antd.Space>
                            </antd.Radio.Group>
                        </antd.Form.Item>
                        <antd.Form.Item
                            label="公司"
                            name="companyId"
                            rules={[{ required: true, message: '请输入公司' }]}
                        >
                            <antd.Select
                                showSearch
                                placeholder="请输入公司"
                                defaultActiveFirstOption={true}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.searchEnterprise}
                                notFoundContent={null}
                            >
                                {options}
                            </antd.Select>
                        </antd.Form.Item>
                        <antd.Form.Item
                            name="remark"
                            label="备注"
                            rules={[{ required: false, message: '请输入备注' }]}
                        >
                            <antd.Input.TextArea 
                                placeholder="请输入备注" 
                            />
                        </antd.Form.Item>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
