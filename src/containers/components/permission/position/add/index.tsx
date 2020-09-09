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


export interface AddPositionProps {
    permission: PermissionState;
    permissionHelper: any;
}

export interface AddPositionState {
    visible: boolean;
    lastPosition: any;
}

export interface AddPositionEvent{
    positionGet: any;
    positionAdd: any;
    ruleGroupFilter: any;
}

@connect(
    (state: RootState, ownProps): Pick<AddPositionProps, 'permission'> =>{
        return { 
            permission: state.permission,
        };
    },
    (dispatch: Dispatch): Pick<AddPositionProps, 'permissionHelper'> => {
        return {
            permissionHelper: bindActionCreators(permissionRedux.actions(), dispatch),
        };
    }
)
export class AddPositionManager extends React.PureComponent<AddPositionProps, AddPositionState>  implements AddPositionEvent{
    private formRef: any;
    positionGet: any;
    positionAdd: any;
    ruleGroupFilter: any;

    constructor(props: AddPositionProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            lastPosition: this.initialPosition(),
        };

        this.positionGet = this.props.permissionHelper.positionGet;
        this.positionAdd = this.props.permissionHelper.positionAdd;
        this.ruleGroupFilter = this.props.permissionHelper.ruleGroupFilter;

        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.addPosition = this.addPosition.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    initialPosition(){
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

    onOpen(positionId: number){
        this.ruleGroupFilter({
            appkey: config.permission.appkey,
        }).then(() => {
            if( positionId !== 0 ){
                this.positionGet({
                    positionId: positionId
                }).then(()=>{
                    let lastPosition = this.props.permission.positionCurrent
                    this.setState({
                        visible: true,
                        lastPosition: lastPosition
                    })
                })
            } else {
                this.setState({
                    visible: true,
                    lastPosition: this.initialPosition()
                })
            }
            this.formRef.current.setFieldsValue({
                name: "",
                ruleGroupId: undefined ,
                description: "",
                remark: "",
            })
        })
    }

    addPosition(){
        this.formRef.current.validateFields().then((values: any) => {
            this.positionAdd({
                appkey: config.permission.appkey,
                positionInfo: Object.assign({}, values, {
                    parentId: this.state.lastPosition.id
                })
            }).then(()=>{
                this.props.father.refreshPosition().then(() =>{
                    this.onClose()
                })
            })
        })
    }

    render(){
        const options = this.props.permission.ruleGroupFilter.dataList.map(
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
                    title="添加职位"
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
                                    onClick={this.addPosition}
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
