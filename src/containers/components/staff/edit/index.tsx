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


export interface EditStaffProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
}

export interface EditStaffState {
    visible: boolean;
    currentStaff: any;
}

export interface EditStaffEvent{
    authorizationUpdate: any;
    authorizationGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditStaffProps, 'authorization'> =>{
        return { 
            authorization: state.authorization,
        };
    },
    (dispatch: Dispatch): Pick<EditStaffProps, 'authorizationHelper'> => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
        };
    }
)
export class EditStaffManager extends React.PureComponent<EditStaffProps, EditStaffState>  implements EditStaffEvent{
    private formRef: any;
    authorizationUpdate: any;
    authorizationGet: any;

    constructor(props: EditStaffProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            currentStaff: this.initialComponentData(),
        };

        this.authorizationUpdate = this.props.authorizationHelper.authorizationUpdate;
        this.authorizationGet = this.props.authorizationHelper.authorizationGet;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.editStaff = this.editStaff.bind(this);
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
            let currentStaff = this.props.authorization.authorizationCurrent
            this.formRef.current.setFieldsValue(Object.assign({}, currentStaff, {
                useStatus: currentStaff.useStatus == "enable" ? true: false
            })
            )
            this.setState({
                visible: true,
                currentStaff: currentStaff
            });
        })
    }

    editStaff(){
        this.formRef.current.validateFields().then((values: any) => {
            this.authorizationUpdate({
                authorizationId: this.state.currentStaff.id,
                updateInfo: Object.assign({}, values, {
                    useStatus: values.useStatus? "enable" : "forbidden"
                })
            }).then(()=>{
                this.props.father.resetStaff().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    render(){
        return (
            <div>
                <antd.Drawer
                    title="编辑员工"
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
                                    onClick={this.editStaff}
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
                                {this.state.currentStaff.companyName}
                            </span> 
                        </antd.Form.Item>
                        <antd.Form.Item label="appkey">
                            <span className="ant-form-text">
                                {this.state.currentStaff.appkey}
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
