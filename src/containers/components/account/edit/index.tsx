'use strict'


import React from 'react';
import * as antd from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { 
    RootState,
    FileState,
    PersonState,
    personRedux,
    fileRedux
} from 'reduxes';
import './index.less';


export interface EditAccountProps {
    file: FileState;
    person: PersonState;
    personHelper: any;
    fileHelper: any;
}

export interface EditAccountState {
    visible: boolean;
}

export interface EditAccountEvent{
    accountUpdate: any;
    updateAccount: any;
    fileUpload: any;
}

@connect(
    (state: RootState, ownProps): Pick<EditAccountProps, 'person' | 'file' > =>{
        return { person: state.person, file: state.file};
    },
    (dispatch: Dispatch): Pick<EditAccountProps, 'personHelper' | 'fileHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
            fileHelper: bindActionCreators(fileRedux.actions(), dispatch),
        };
    }
)
export class EditAccount extends React.PureComponent<EditAccountProps, EditAccountState>  implements EditAccountEvent{
    private formRef: any;
    accountUpdate: any;
    accountGet: any;
    fileUpload: any;

    constructor(props: EditAccountProps, context?: any) {
        super(props, context);
        this.state = { 
            visible: false 
        };

        this.accountUpdate = this.props.personHelper.accountUpdate;
        this.accountGet = this.props.personHelper.personGet;
        this.fileUpload = this.props.fileHelper.fileUpload;

        this.onClose = this.onClose.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.formRef = React.createRef();
        this.customRequest = this.customRequest.bind(this);
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    onClose(){
        this.setState({
            visible: false,
        });
    };

    editAccount(){
        this.setState({
            visible: true,
        });
        const { person } = this.props
        this.formRef.current.setFieldsValue(
            Object.assign({}, person.account, {
            })
        );
    };

    updateAccount(){
        let fields = this.formRef.current.getFieldsValue()
        this.accountUpdate(
            {
                updateInfo: fields 
            }
        ).then(() => {
            this.accountGet().then(
                (req: any) => {
                    this.onClose();
                }
            )
        });
    }

    customRequest(e:any){
        const file = e.file
        let fileName = file.name
        this.fileUpload({
            role: "file",
            storeType: "person",
        },{
            [fileName]: file
        })
    }

    render(){
        let fileList = [this.props.person.account.headUrl]
        return (
            <div>
                <antd.Drawer
                    title="修改账号信息"
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
                            <antd.Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </antd.Button>
                            <antd.Button type="primary" onClick={this.updateAccount}>
                                Submit
                            </antd.Button>
                        </div>
                    }
                >
                    <antd.Form 
                        ref={this.formRef}
                        layout="horizontal"
                        labelCol={{span:4 }}
                        wrapperCol={{span:12 }}
                        colon={true}
                    >
                        <antd.Upload
            customRequest={this.customRequest}
                            listType="picture-card"
                          >
        {fileList.length < 5 && '+ Upload'}
      </antd.Upload>
                        <antd.Row >
                            <antd.Form.Item
                                name="headUrl"
                                label="头像"
                                rules={[{ required: false, message: '请输入头像地址' }]}
                            >
                                <antd.Input 
                                    style={{width:"360px"}}
                                    placeholder="请输入头像地址" 
                                />
                            </antd.Form.Item>
                        </antd.Row>
                        <antd.Row >
                            <antd.Form.Item
                                name="nick"
                                label="昵称"
                                rules={[{ required: true, message: '请输入昵称' }]}
                            >
                                <antd.Input 
                                    style={{width:"360px"}}
                                    placeholder="请输入昵称" 
                                />
                            </antd.Form.Item>
                        </antd.Row>
                    </antd.Form>
                </antd.Drawer>
            </div>
        )
    }
};
