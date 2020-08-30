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


export interface AddStaffProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
    enterprise: EnterpriseState,
    enterpriseHelper: any,
}

export interface AddStaffState {
    visible: boolean;
    platform: any;
}

export interface AddStaffEvent{
    platformGet: any;
    authorizationAdd: any;
    enterpriseSearch: any;
}

@connect(
    (state: RootState, ownProps): Pick<AddStaffProps, 'authorization' | "enterprise" > =>{
        return { 
            authorization: state.authorization,
            enterprise: state.enterprise,
        };
    },
    (dispatch: Dispatch): Pick<AddStaffProps, 'authorizationHelper'| "enterpriseHelper" > => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
            enterpriseHelper: bindActionCreators(enterpriseRedux.actions(), dispatch),
        };
    }
)
export class AddStaffManager extends React.PureComponent<AddStaffProps, AddStaffState>  implements AddStaffEvent{
    private formRef: any;
    platformGet: any;
    authorizationAdd: any;
    enterpriseSearch: any;

    constructor(props: AddStaffProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            platform: {
                id: -1,
                name: "",
            },
        };

        this.platformGet = this.props.authorizationHelper.platformGet;
        this.authorizationAdd = this.props.authorizationHelper.authorizationAdd;
        this.enterpriseSearch = this.props.enterpriseHelper.enterpriseSearch;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.addStaff = this.addStaff.bind(this);
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
                    platform: this.props.authorization.platformCurrent
                });
                this.formRef.current.setFieldsValue(
                    {
                        remark: "",
                        staffName: "",
                        staffId: "",
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

    addStaff(){
        this.formRef.current.validateFields().then((values: any) => {
            this.authorizationAdd({
                platformId: this.state.platform.id,
                authorizationInfo: Object.assign({}, values, {
                })
            }).then(()=>{
                this.props.father.resetStaff().then(() =>{
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
                    title="添加员工"
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
                                    onClick={this.addStaff}
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
                            name="staffId"
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
