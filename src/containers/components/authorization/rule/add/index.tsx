'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    authorizationPermissionRedux,
    AuthorizationPermissionState,
} from 'reduxes';
import './index.less';


export interface AddRuleProps {
    authorizationPermission: AuthorizationPermissionState;
    authorizationPermissionHelper: any;
}

export interface AddRuleState {
    visible: boolean;
    lastRule: any;
    platformId: number;
}

export interface AddRuleEvent{
    ruleAdd: any;
    ruleGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<AddRuleProps, 'authorizationPermission'> =>{
        return { 
            authorizationPermission: state.authorizationPermission,
        };
    },
    (dispatch: Dispatch): Pick<AddRuleProps, 'authorizationPermissionHelper'> => {
        return {
            authorizationPermissionHelper: bindActionCreators(authorizationPermissionRedux.actions(), dispatch),
        };
    }
)
export class AddRuleManager extends React.PureComponent<AddRuleProps, AddRuleState>  implements AddRuleEvent{
    private formRef: any;
    ruleAdd: any;
    ruleGet: any;

    constructor(props: AddRuleProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            lastRule: this.initialLastRule(),
            platformId: 0,
        };

        this.ruleAdd = this.props.authorizationPermissionHelper.ruleAdd;
        this.ruleGet = this.props.authorizationPermissionHelper.ruleGet;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.addRule = this.addRule.bind(this);
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

    initialLastRule(){
        return {
            id: 0,
            name: "根节点",
            remark: "最原始的节点",
            description: "最原始的节点",
            platformId: 0,
        }
    }

    initialComponentData(){
        return {
            name: "",
            remark: "",
            description: "",
            parentId: 0,
        }
    }

    onOpen(platformId: number, record: any){
        if(record !== undefined ){
            this.setState({
                visible: true,
                lastRule: record,
                platformId: platformId
            });
            this.formRef.current.setFieldsValue(
                Object.assign({}, this.initialComponentData(), {
                    platformId: platformId,
                    parentId: record.id,
                })
            );
        } else {
            this.formRef.current.setFieldsValue(
                this.initialComponentData()
            );
            this.setState({
                visible: true,
                platformId: platformId,
                lastRule: Object.assign({}, this.initialLastRule(), {
                    platformId: platformId,
                }),
            });
        }
    }

    addRule(){
        this.formRef.current.validateFields().then((values: any) => {
            this.ruleAdd({
                platformId: this.state.platformId,
                ruleInfo: Object.assign({}, values, {
                    parentId: this.state.lastRule.id
                })
            }).then(()=>{
                this.props.father.resetRule().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    render(){
        return (
            <div>
                <antd.Drawer
                    title="添加规则"
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
                                    onClick={this.addRule}
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
                        <antd.Form.Item label="父节点">
                            <span className="ant-form-text">
                                {this.state.lastRule.name}
                            </span> 
                        </antd.Form.Item>
                        <antd.Form.Item
                            name="name"
                            label="规则名称"
                            rules={[{ required: true, message: '请输入规则名称' }]}
                        >
                            <antd.Input 
                                placeholder="请输入规则名称" 
                            />
                        </antd.Form.Item>
                        <antd.Form.Item
                            name="description"
                            label="描述"
                            rules={[{ required: false, message: '请输入描述' }]}
                        >
                            <antd.Input.TextArea 
                                placeholder="请输入描述" 
                            />
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
