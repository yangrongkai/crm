'use strict'


import React from 'react';
import  * as antd from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    staffRedux,
    StaffState,
} from 'reduxes';
import './index.less';


export interface EditStaffProps {
    staff: StaffState;
    staffHelper: any;
}

export interface EditStaffState {
    visible: boolean;
    currentStaff: any;
}

export interface EditStaffEvent{
    staffUpdate: any;
    staffGet: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditStaffProps, 'staff'> =>{
        return { 
            staff: state.staff,
        };
    },
    (dispatch: Dispatch): Pick<EditStaffProps, 'staffHelper'> => {
        return {
            staffHelper: bindActionCreators(staffRedux.actions(), dispatch),
        };
    }
)
export class EditStaffManager extends React.PureComponent<EditStaffProps, EditStaffState>  implements EditStaffEvent{
    private formRef: any;
    staffUpdate: any;
    staffGet: any;

    constructor(props: EditStaffProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false,
            currentStaff: this.initialComponentData(),
        };

        this.staffUpdate = this.props.staffHelper.staffUpdate;
        this.staffGet = this.props.staffHelper.staffGet;

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

    onOpen(staffId: number){
        this.staffGet({
            staffId: staffId
        }).then(() => {
            let currentStaff = this.props.staff.staffCurrent
            this.formRef.current.setFieldsValue(
                Object.assign({}, currentStaff, {

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
            this.staffUpdate({
                staffId: this.state.currentStaff.id,
                updateInfo: Object.assign({}, values, {
                })
            }).then(()=>{
                this.props.father.refreshStaff().then(() =>{
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
                    width={720}
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
                        layout="vertical"
                        colon={true}
                        hideRequiredMark
                    >
                        <antd.Row gutter={16}>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="name"
                                    label="姓名"
                                    rules={[{ required: true, message: '请输入姓名' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入姓名" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                            <antd.Col span={12}>
                                <antd.Row>
                                    <antd.Col span={8}>
                                        <antd.Form.Item name="gender" label="性别">
                                            <antd.Radio.Group>
                                                <antd.Radio.Button value="man">男</antd.Radio.Button>
                                                <antd.Radio.Button value="woman">女</antd.Radio.Button>
                                            </antd.Radio.Group>
                                         </antd.Form.Item>
                                    </antd.Col>
                                    <antd.Col span={16}>
                                            <antd.Form.Item
                                                name="birthday"
                                                label="生日"
                                                rules={[{ required: false, message: '请输入生日' }]}
                                            >
                                                <antd.DatePicker
                                                    format="YYYY-MM-DD"
                                                />
                                            </antd.Form.Item>
                                    </antd.Col>
                                </antd.Row>
                            </antd.Col>
                        </antd.Row>
                        <antd.Row gutter={16}>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="email"
                                    label="邮箱"
                                    rules={[{ required: false, message: '请输入邮件' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入邮箱" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="phone"
                                    label="手机号"
                                    rules={[{ required: true, message: '请输入手机号' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入手机号" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                        </antd.Row>
                        <antd.Row gutter={16}>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="qq"
                                    label="QQ"
                                    rules={[{ required: false, message: '请输入QQ' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入手机号" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                            <antd.Col span={12}>
                                <antd.Form.Item
                                    name="wechat"
                                    label="微信"
                                    rules={[{ required: false, message: '请输入微信' }]}
                                >
                                    <antd.Input 
                                        placeholder="请输入微信" 
                                    />
                                </antd.Form.Item>
                            </antd.Col>
                        </antd.Row>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
