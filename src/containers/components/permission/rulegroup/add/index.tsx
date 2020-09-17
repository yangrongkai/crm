'use strict'


import React, {useState} from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    permissionRedux,
    PermissionState,
} from 'reduxes';
import * as config from '&/config.js';
import './index.less';


export interface AddRuleGroupProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface AddRuleGroupState {
    visible: boolean;
    ruleSelectKeys: string[];
}

export interface AddRuleGroupEvent{
    ruleGroupAdd: any;
    ruleAll: any;
}

@connect(
    (state: RootState, ownProps): Pick<AddRuleGroupProps, 'permission'> =>{
        return { 
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<AddRuleGroupProps, 'permissionHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class AddRuleGroupManager extends React.PureComponent<AddRuleGroupProps, AddRuleGroupState>  implements AddRuleGroupEvent{
    private formRef: any;
    ruleGroupAdd: any;
    ruleAll: any;

    constructor(props: AddRuleGroupProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            ruleSelectKeys: [],
        };

        this.ruleGroupAdd = this.props.permissionHelper.ruleGroupAdd;
        this.ruleAll = this.props.permissionHelper.ruleAll;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.addRuleGroup = this.addRuleGroup.bind(this);
        this.formRef = React.createRef();
        this.onCheck = this.onCheck.bind(this)
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    onClose(){
        this.setState({
            visible: false,
            ruleSelectKeys: []
        });
    };

    onOpen(platformId: number){
        this.ruleAll({
            appkey: config.permission.appkey
        }).then(
            () => {
                this.formRef.current.setFieldsValue({
                    name: "",
                    remark: "",
                    description: "",
                })
                this.setState({
                    visible: true,
                    ruleSelectKeys: []
                });
            }
        )
    }

    addRuleGroup(){
        this.formRef.current.validateFields().then((values: any) => {
            this.ruleGroupAdd({
                appkey: config.permission.appkey,
                ruleGroupInfo: Object.assign({}, values, {
                    content: this.state.ruleSelectKeys
                })
            }).then(()=>{
                this.props.father.refreshRuleGroup().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    onCheck(checkedKeys: any){
        this.setState({
            ruleSelectKeys: checkedKeys
        })
    }

    render(){
        let ruleTree = this.props.permission.ruleFilter
        return (
            <div>
                <antd.Drawer
                    title="添加权限组"
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
                                    onClick={this.addRuleGroup}
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
                        style={{padding: "20px 10px"}}
                    >
                        <antd.Form.Item
                            name="name"
                            label="名称"
                            rules={[{ required: true, message: '请输入名称' }]}
                        >
                            <antd.Input 
                                placeholder="请输入备注" 
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
                        <antd.Form.Item
                            label="权限"
                        >
                            <antd.Tree
                                checkable
                                height={480}
                                onCheck={this.onCheck}
                                treeData={ruleTree.dataList}
                                defaultExpandAll
                            />
                        </antd.Form.Item>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
