'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    authorizationPermissionRedux,
    AuthorizationPermissionState,
    EnterpriseState,
    enterpriseRedux
} from 'reduxes';
import './index.less';


export interface AddCompanyProps {
    authorizationPermission: AuthorizationPermissionState;
    authorizationPermissionHelper: any;
    enterprise: EnterpriseState,
    enterpriseHelper: any,
}

export interface AddCompanyState {
    visible: boolean;
    platform: any;
}

export interface AddCompanyEvent{
    platformGet: any;
    authorizationAdd: any;
    enterpriseSearch: any;
}

@connect(
    (state: RootState, ownProps): Pick<AddCompanyProps, 'authorizationPermission' | "enterprise" > =>{
        return { 
            authorizationPermission: state.authorizationPermission,
            enterprise: state.enterprise,
        };
    },
    (dispatch: Dispatch): Pick<AddCompanyProps, 'authorizationPermissionHelper'| "enterpriseHelper" > => {
        return {
            authorizationPermissionHelper: bindActionCreators(authorizationPermissionRedux.actions(), dispatch),
            enterpriseHelper: bindActionCreators(enterpriseRedux.actions(), dispatch),
        };
    }
)
export class AddCompanyManager extends React.PureComponent<AddCompanyProps, AddCompanyState>  implements AddCompanyEvent{
    private formRef: any;
    platformGet: any;
    authorizationAdd: any;
    enterpriseSearch: any;

    constructor(props: AddCompanyProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            platform: {
                id: -1,
                name: "",
            },
        };

        this.platformGet = this.props.authorizationPermissionHelper.platformGet;
        this.authorizationAdd = this.props.authorizationPermissionHelper.authorizationAdd;
        this.enterpriseSearch = this.props.enterpriseHelper.enterpriseSearch;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.addCompany = this.addCompany.bind(this);
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
            this.enterpriseSearch({
                currentPage: 1,
                searchInfo: {}
            }).then(() => {
                this.setState({
                    visible: true,
                    platform: this.props.authorizationPermission.platformCurrent
                });
                this.formRef.current.setFieldsValue(
                    {
                        remark: "",
                        companyName: "",
                        companyId: "",
                    }
                );
            })
        })
    }

    searchEnterprise(text: string){
        this.enterpriseSearch({
            currentPage: 1,
            searchInfo: {
                name: text
            }
        })
    }

    addCompany(){
        this.formRef.current.validateFields().then((values: any) => {
            this.authorizationAdd({
                platformId: this.state.platform.id,
                authorizationInfo: Object.assign({}, values, {
                })
            }).then(()=>{
                this.props.father.resetCompany().then(() =>{
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
                    title="添加授权"
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
                                    onClick={this.addCompany}
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
                        <antd.Form.Item label="平台">
                            <span className="ant-form-text">
                                {this.state.platform.name}
                            </span> 
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
