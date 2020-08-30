'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';
import { 
    RootState,
    permissionRedux,
    PermissionState,
} from 'reduxes';
import * as config from '&/config.js';
import './index.less';


export interface AddOrganizationProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface AddOrganizationState {
    visible: boolean;
    lastOrganization: any;
}

export interface AddOrganizationEvent{
    organizationGet: any;
    organizationAdd: any;
    positionFilter: any;
}

@connect(
    (state: RootState, ownProps): Pick<AddOrganizationProps, 'permission'> =>{
        return { 
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<AddOrganizationProps, 'permissionHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class AddOrganizationManager extends React.PureComponent<AddOrganizationProps, AddOrganizationState>  implements AddOrganizationEvent{
    private formRef: any;
    organizationGet: any;
    organizationAdd: any;
    positionFilter: any;

    constructor(props: AddOrganizationProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            lastOrganization: this.initialOrganization(),
        };

        this.organizationGet = this.props.permissionHelper.organizationGet;
        this.organizationAdd = this.props.permissionHelper.organizationAdd;
        this.positionFilter = this.props.permissionHelper.positionFilter;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.addOrganization = this.addOrganization.bind(this);
        this.searchPosition = this.searchPosition.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    initialOrganization(){
        return {
            id: 0,
            name: "根节点",
            parentId: -1,
            ruleGroupId: -1,
            ruleGroupName: "",
            remark: "",
            description: "",
            updateTime: moment('1970-01-01', "YYYY-MM_DD"),
            createTime: moment('1970-01-01', "YYYY-MM_DD"),
        }
    }

    onClose(){
        this.setState({
            visible: false,
        });
    };

    onOpen(organizationId: number){
        this.searchPosition("").then(() => {
            if( organizationId !== 0 ){
                this.organizationGet({
                    organizationId: organizationId
                }).then(()=>{
                    let lastOrganization = this.props.permission.organizationCurrent
                    this.setState({
                        visible: true,
                        lastOrganization: lastOrganization
                    })
                })
            } else {
                this.setState({
                    visible: true,
                    lastOrganization: this.initialOrganization()
                })
            }
            this.formRef.current.setFieldsValue({
                name: "",
                description: "",
                positionIdList: undefined,
                remark: "",
            })
        })
    }

    searchPosition(text: string){
        return this.positionFilter({
            appkey: config.permission.appkey,
            currentPage: 1,
            searchInfo:{
                name: text
            }
        })
    }

    addOrganization(){
        this.formRef.current.validateFields().then((values: any) => {
            this.organizationAdd({
                appkey: config.permission.appkey,
                organizationInfo: Object.assign({}, values, {
                    parentId: this.state.lastOrganization.id
                })
            }).then(()=>{
                this.props.father.refreshOrganization().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    render(){
        const options = this.props.permission.positionFilter.dataList.map(
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
                    title="添加组织结构"
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
                                    onClick={this.addOrganization}
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
                            label="组织名称"
                            rules={[{ required: true, message: '请输入职位' }]}
                        >
                            <antd.Input 
                                placeholder="请输入职位" 
                            />
                        </antd.Form.Item>
                        <antd.Form.Item
                            label="职位列表"
                            name="positionIdList"
                            rules={[{ required: true, message: '请选择职位' }]}
                        >
                            <antd.Select
                                showSearch
                                mode="multiple"
                                placeholder="请输选择职位"
                                defaultActiveFirstOption={true}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.searchPosition}
                                notFoundContent={null}
                            >
                                {options}
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
