'use strict'


import React from 'react';
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


export interface EditRuleGroupProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface EditRuleGroupState {
    visible: boolean;
    ruleGroup: any;
    ruleSelectKeys: string[];
}

export interface EditRuleGroupEvent{
    ruleAll: any;
    ruleGroupGet: any;
    ruleGroupUpdate: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditRuleGroupProps, 'permission'> =>{
        return { 
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<EditRuleGroupProps, 'permissionHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class EditRuleGroupManager extends React.PureComponent<EditRuleGroupProps, EditRuleGroupState>  implements EditRuleGroupEvent{
    private formRef: any;
    ruleAll: any;
    ruleGroupGet: any;
    ruleGroupUpdate: any;

    constructor(props: EditRuleGroupProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            ruleGroup: undefined,
            ruleSelectKeys: []
        };

        this.ruleAll = this.props.permissionHelper.ruleAll;
        this.ruleGroupGet = this.props.permissionHelper.ruleGroupGet;
        this.ruleGroupUpdate = this.props.permissionHelper.ruleGroupUpdate;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onCheck = this.onCheck.bind(this)
        this.editRuleGroup = this.editRuleGroup.bind(this);
        this.formRef = React.createRef();
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

    onOpen(ruleGroupId: number){
        this.ruleAll({
        }).then(
            () => {
                this.ruleGroupGet({
                    ruleGroupId: ruleGroupId,
                }).then(() => {
                    let ruleGroup = this.props.permission.ruleGroupCurrent
                    this.formRef.current.setFieldsValue(
                        ruleGroup
                    )
                    console.log('~~~~~~~~~~>>>> ', ruleGroup.content)
                    this.setState({
                        visible: true,
                        ruleGroup: ruleGroup,
                        ruleSelectKeys: ruleGroup.content
                    })
                })
            }
        )
    }

    editRuleGroup(){
        this.formRef.current.validateFields().then((values: any) => {
            this.ruleGroupUpdate({
                ruleGroupId: this.state.ruleGroup.id,
                updateInfo: Object.assign({}, values, {
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
                    title="修改权限组"
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
                                    onClick={this.editRuleGroup}
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
                                checkedKeys={this.state.ruleSelectKeys}
                                defaultExpandAll
                            />
                        </antd.Form.Item>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
