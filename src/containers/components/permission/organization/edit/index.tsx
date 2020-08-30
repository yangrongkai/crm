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


export interface EditOrganizationProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface EditOrganizationState {
    visible: boolean;
    currentOrganization: any;
    lastOrganization: any;
}

export interface EditOrganizationEvent{
    organizationFilter: any;
    organizationGet: any;
    organizationUpdate: any;
    positionFilter: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditOrganizationProps, 'permission'> =>{
        return { 
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<EditOrganizationProps, 'permissionHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class EditOrganizationManager extends React.PureComponent<EditOrganizationProps, EditOrganizationState>  implements EditOrganizationEvent{
    private formRef: any;
    organizationFilter: any;
    organizationUpdate: any;
    organizationGet: any;
    positionFilter: any;

    constructor(props: EditOrganizationProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            currentOrganization: this.initialComponentData(),
            lastOrganization: this.initialComponentData(),
        };

        this.organizationGet = this.props.permissionHelper.organizationGet;
        this.organizationFilter = this.props.permissionHelper.organizationFilter;
        this.organizationUpdate = this.props.permissionHelper.organizationUpdate;
        this.positionFilter = this.props.permissionHelper.positionFilter;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.editOrganization = this.editOrganization.bind(this);
        this.searchOrganization = this.searchOrganization.bind(this);
        this.searchPosition = this.searchPosition.bind(this);
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
            id: undefined,
            name: "根节点",
            parentId: -1,
            positionList: [],
            remark: "",
            updateTime: moment('1970-01-01', "YYYY-MM_DD"),
            createTime: moment('1970-01-01', "YYYY-MM_DD"),
        }
    }

    onOpen(organizationId: any){
        this.organizationGet({
            organizationId: organizationId
        }).then(()=>{
            let currentOrganization = this.props.permission.organizationCurrent
            this.searchOrganization(
                currentOrganization.name
            ).then(() => {
                if( currentOrganization.parentId > 0 ){
                    this.organizationGet({
                        organizationId: currentOrganization.parentId
                    }).then(() => {
                        let lastOrganization = this.props.permission.organizationCurrent
                        this.setState({
                            visible: true,
                            lastOrganization: lastOrganization,
                            currentOrganization: currentOrganization,
                        })
                        let positionIdList = currentOrganization.positionList.map(
                            (obj) => obj.id
                        )
                        this.formRef.current.setFieldsValue(
                            Object.assign({}, currentOrganization, {
                                parentId: lastOrganization.id,
                                parentName: lastOrganization.name,
                                positionIdList: positionIdList
                            })
                        )
                        this.searchOrganization(
                            currentOrganization.name
                        )

                    })
                } else {
                    let lastOrganization = this.initialComponentData() 
                    this.setState({
                        visible: true,
                        lastOrganization: lastOrganization,
                        currentOrganization: currentOrganization,
                    })

                    this.formRef.current.setFieldsValue(
                        Object.assign({}, currentOrganization, {
                            parentId: lastOrganization.id,
                            parentName: lastOrganization.name,
                        })
                    )
                }
            })
        })
    }

    searchOrganization(text: string){
        return this.organizationFilter({
            appkey: config.permission.appkey,
            currentPage: 1,
            searchInfo:{
                name: text
            }
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

    editOrganization(){
        this.formRef.current.validateFields().then((values: any) => {
            this.organizationUpdate({
                organizationId: this.state.currentOrganization.id,
                updateInfo: Object.assign({}, values, {
                })
            }).then(()=>{
                this.props.father.refreshOrganization().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    render(){
        const organizationList = [
            ...this.props.permission.organizationFilter.dataList,
        ]
        const organizationOptions = organizationList.map(
            (record: any) => {
                return (
                    <antd.Select.Option key={record.id} value={record.id}>
                        {record.name}
                    </antd.Select.Option>
                )
        });
        const positionList = [
            ...this.props.permission.organizationCurrent.positionList,
            ...this.props.permission.positionFilter.dataList,
        ]
        const positionOptions = positionList.map(
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
                    title="编辑组织结构"
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
                                    onClick={this.editOrganization}
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
                            label="上级组织"
                            name="parentId"
                            rules={[{ required: true, message: '请选择上级组织' }]}
                        >
                            <antd.Select
                                showSearch
                                placeholder="请输上级组织"
                                defaultActiveFirstOption={true}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.searchOrganization}
                                notFoundContent={null}
                            >
                                {organizationOptions}
                            </antd.Select>
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
                                {positionOptions}
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
