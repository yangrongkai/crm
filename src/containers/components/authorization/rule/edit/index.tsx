'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    authorizationRedux,
    AuthorizationState,
} from 'reduxes';
import './index.less';


export interface EditRuleProps {
    authorization: AuthorizationState;
    authorizationHelper: any;
}

export interface EditRuleState {
    visible: boolean;
    lastRule: any;
    currentRule: any;
}

export interface EditRuleEvent{
    ruleUpdate: any;
    ruleGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditRuleProps, 'authorization'> =>{
        return { 
            authorization: state.authorization,
        };
    },
    (dispatch: Dispatch): Pick<EditRuleProps, 'authorizationHelper'> => {
        return {
            authorizationHelper: bindActionCreators(authorizationRedux.actions(), dispatch),
        };
    }
)
export class EditRuleManager extends React.PureComponent<EditRuleProps, EditRuleState>  implements EditRuleEvent{
    private formRef: any;
    ruleUpdate: any;
    ruleGet: any;

    constructor(props: EditRuleProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            lastRule: this.initialLastRule(),
            currentRule: this.initialLastRule(),
        };

        this.ruleUpdate = this.props.authorizationHelper.ruleUpdate;
        this.ruleGet = this.props.authorizationHelper.ruleGet;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.editRule = this.editRule.bind(this);
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

    onOpen(record: any){
        if(record.parentId == 0){
            this.ruleGet({
                ruleId: record.id
            }).then(() => {
                let currentRule = this.props.authorization.ruleCurrent
                this.formRef.current.setFieldsValue(
                    currentRule
                )
                this.setState({
                    visible: true,
                    currentRule: currentRule
                });
            })
        } else {
            this.ruleGet({
                ruleId: record.parentId,
            }).then(()=>{
                let lastRule = this.props.authorization.ruleCurrent
                this.setState({ lastRule: lastRule })
                this.ruleGet({
                    ruleId: record.id
                }).then(() => {
                    let currentRule = this.props.authorization.ruleCurrent
                    this.formRef.current.setFieldsValue(
                        currentRule
                    )
                    this.setState({
                        visible: true,
                        currentRule: currentRule
                    });
                })
            })
        }
    }

    editRule(){
        this.formRef.current.validateFields().then((values: any) => {
            this.ruleUpdate({
                ruleId: this.state.currentRule.id,
                updateInfo: Object.assign({}, values, {
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
                                    onClick={this.editRule}
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
