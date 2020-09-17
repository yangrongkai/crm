'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { 
    RootState,
    permissionRedux,
    PermissionState,
} from 'reduxes';
import './index.less';


export interface EditPositionProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface EditPositionState {
    visible: boolean;
    currentPosition: any;
}

export interface EditPositionEvent{
    positionFilter: any;
    positionGet: any;
    positionUpdate: any;
    ruleGroupFilter: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditPositionProps, 'permission'> =>{
        return { 
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<EditPositionProps, 'permissionHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class EditPositionManager extends React.PureComponent<EditPositionProps, EditPositionState>  implements EditPositionEvent{
    private formRef: any;
    positionFilter: any;
    positionUpdate: any;
    positionGet: any;
    ruleGroupFilter: any;

    constructor(props: EditPositionProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            currentPosition: this.initialComponentData(),
        };

        this.positionGet = this.props.permissionHelper.positionGet;
        this.positionFilter = this.props.permissionHelper.positionFilter;
        this.positionUpdate = this.props.permissionHelper.positionUpdate;
        this.ruleGroupFilter = this.props.permissionHelper.ruleGroupFilter;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.editPosition = this.editPosition.bind(this);
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
            id: 0,
            name: "根节点",
            parentId: -1,
            ruleGroupId: "",
            ruleGroupName: "",
            remark: "",
            updateTime: moment('1970-01-01', "YYYY-MM_DD"),
            createTime: moment('1970-01-01', "YYYY-MM_DD"),
        }
    }

    onOpen(positionId: any){
        this.positionFilter({
        }).then(() => {
            this.ruleGroupFilter({
            }).then(() => {
                this.positionGet({
                    positionId: positionId
                }).then(()=>{
                    let currentPosition = this.props.permission.positionCurrent
                    this.setState({
                        visible: true,
                        currentPosition: currentPosition,
                    })
                    this.formRef.current.setFieldsValue(
                        Object.assign({}, currentPosition, {
                        })
                    )
                })
                
            })
        })
    }

    editPosition(){
        this.formRef.current.validateFields().then((values: any) => {
            this.positionUpdate({
                positionId: this.state.currentPosition.id,
                updateInfo: Object.assign({}, values, {
                })
            }).then(()=>{
                this.props.father.refreshPosition().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    render(){
        const positionOptions = this.props.permission.positionFilter.dataList.map(
            (record: any) => {
                return (
                    <antd.Select.Option key={record.id} value={record.id}>
                        {record.name}
                    </antd.Select.Option>
                )
        });
        const ruleGroupOptions = this.props.permission.ruleGroupFilter.dataList.map(
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
                    title="编辑身份"
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
                                    onClick={this.editPosition}
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
                            label="职位"
                            rules={[{ required: true, message: '请输入职位' }]}
                        >
                            <antd.Input 
                                placeholder="请输入职位" 
                            />
                        </antd.Form.Item>
                        <antd.Form.Item
                            label="上级身份"
                            name="parentId"
                            style={
                                this.state.currentPosition.parentId == 0?
                                {display: "none"} : {}
                            }
                            rules={[{ required: true, message: '请输入上级身份' }]}
                        >
                            <antd.Select
                                showSearch
                                placeholder="请输入上级身份"
                                defaultActiveFirstOption={true}
                                showArrow={false}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={null}
                            >
                                {positionOptions}
                            </antd.Select>
                        </antd.Form.Item>
                        <antd.Form.Item
                            label="权限组"
                            name="ruleGroupId"
                            rules={[{ required: true, message: '请输入权限组' }]}
                        >
                            <antd.Select
                                showSearch
                                placeholder="请输入权限组"
                                defaultActiveFirstOption={true}
                                showArrow={false}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={null}
                            >
                                {ruleGroupOptions}
                            </antd.Select>
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
