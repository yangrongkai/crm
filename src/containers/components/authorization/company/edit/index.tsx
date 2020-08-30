'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    authorizationRedux,
    AuthorizationState,
} from 'reduxes';
import './index.less';


export interface EditCompanyProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
}

export interface EditCompanyState {
    visible: boolean;
    currentCompany: any;
}

export interface EditCompanyEvent{
    authorizationUpdate: any;
    authorizationGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditCompanyProps, 'authorization'> =>{
        return { 
            authorization: state.authorization,
        };
    },
    (dispatch: Dispatch): Pick<EditCompanyProps, 'authorizationHelper'> => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
        };
    }
)
export class EditCompanyManager extends React.PureComponent<EditCompanyProps, EditCompanyState>  implements EditCompanyEvent{
    private formRef: any;
    authorizationUpdate: any;
    authorizationGet: any;

    constructor(props: EditCompanyProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            currentCompany: this.initialComponentData(),
        };

        this.authorizationUpdate = this.props.authorizationHelper.authorizationUpdate;
        this.authorizationGet = this.props.authorizationHelper.authorizationGet;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.editCompany = this.editCompany.bind(this);
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

    initialComponentData(){
        return {
            appkey: "",
            companyId: -1,
            companyName: "",
            useStatus: "",
            remark: "",
            updateTime: moment('1970-01-01', "YYYY-MM_DD"),
            createTime: moment('1970-01-01', "YYYY-MM_DD"),
        }
    }

    onOpen(authorizationId: any){
        this.authorizationGet({
            authorizationId:authorizationId
        }).then(() => {
            let currentCompany = this.props.authorization.authorizationCurrent
            this.formRef.current.setFieldsValue(Object.assign({}, currentCompany, {
                useStatus: currentCompany.useStatus == "enable" ? true: false
            })
            )
            this.setState({
                visible: true,
                currentCompany: currentCompany
            });
        })
    }

    editCompany(){
        this.formRef.current.validateFields().then((values: any) => {
            this.authorizationUpdate({
                authorizationId: this.state.currentCompany.id,
                updateInfo: Object.assign({}, values, {
                    useStatus: values.useStatus? "enable" : "forbidden"
                })
            }).then(()=>{
                this.props.father.resetCompany().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    render(){
        return (
            <div>
                <antd.Drawer
                    title="编辑规则"
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
                                    onClick={this.editCompany}
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
                        <antd.Form.Item label="公司">
                            <span className="ant-form-text">
                                {this.state.currentCompany.companyName}
                            </span> 
                        </antd.Form.Item>
                        <antd.Form.Item label="appkey">
                            <span className="ant-form-text">
                                {this.state.currentCompany.appkey}
                            </span> 
                        </antd.Form.Item>
                        <antd.Form.Item name="useStatus" label="开启" valuePropName="checked">
                            <antd.Switch />
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
