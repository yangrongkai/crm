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
    lastPosition: any;
}

export interface EditPositionEvent{
    positionFilter: any;
    positionGet: any;
    positionUpdate: any;
    ruleGroupSearch: any;
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
    ruleGroupSearch: any;

    constructor(props: EditPositionProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            currentPosition: this.initialComponentData(),
            lastPosition: this.initialComponentData(),
        };

        this.positionGet = this.props.permissionHelper.positionGet;
        this.positionFilter = this.props.permissionHelper.positionFilter;
        this.positionUpdate = this.props.permissionHelper.positionUpdate;
        this.ruleGroupSearch = this.props.permissionHelper.ruleGroupSearch;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.editPosition = this.editPosition.bind(this);
        this.searchPosition = this.searchPosition.bind(this);
        this.searchRuleGroup = this.searchRuleGroup.bind(this);
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

    searchPosition(text: string){
        return this.positionFilter({
            appkey: config.permission.appkey,
            currentPage: 1,
            searchInfo:{
                name: text
            }
        })
    }

    searchRuleGroup(text: string){
        return this.ruleGroupSearch({
            appkey: config.permission.appkey,
            currentPage: 1,
            searchInfo:{
                name: text
            }
        })
    }

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
        this.positionGet({
            positionId: positionId
        }).then(()=>{
            let currentPosition = this.props.permission.positionCurrent
            this.searchRuleGroup(
                currentPosition.ruleGroupName
            ).then(() => {
                if( currentPosition.parentId > 0 ){
                    this.positionGet({
                        positionId: currentPosition.parentId
                    }).then(() => {
                        let lastPosition = this.props.permission.positionCurrent
                        this.searchPosition(
                            lastPosition.name
                        ).then(() => {
                            this.setState({
                                visible: true,
                                lastPosition: lastPosition,
                                currentPosition: currentPosition,
                            })
                            this.formRef.current.setFieldsValue(
                                Object.assign({}, currentPosition, {
                                    parentId: lastPosition.id,
                                    parentName: lastPosition.name,
                                })
                            )
                        })
                    })
                } else {
                    let lastPosition = this.initialComponentData() 
                    this.setState({
                        visible: true,
                        lastPosition: lastPosition,
                        currentPosition: currentPosition,
                    })
                    this.formRef.current.setFieldsValue(
                        Object.assign({}, currentPosition, {
                            parentId: lastPosition.id,
                            parentName: lastPosition.name,
                        })
                    )
                }
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
        const ruleGroupOptions = this.props.permission.ruleGroupSearch.dataList.map(
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
                            rules={[{ required: true, message: '请输入上级身份' }]}
                        >
                            <antd.Select
                                showSearch
                                placeholder="请输入上级身份"
                                defaultActiveFirstOption={true}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.searchPosition}
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
                                filterOption={false}
                                onSearch={this.searchRuleGroup}
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
