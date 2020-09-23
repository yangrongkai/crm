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
    fileList: any[];
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
            visible: false,
            fileList: [],
        };

        this.accountUpdate = this.props.personHelper.accountUpdate;
        this.accountGet = this.props.personHelper.personGet;
        this.fileUpload = this.props.fileHelper.fileUpload;

        this.onClose = this.onClose.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.formRef = React.createRef();
        this.customRequest = this.customRequest.bind(this);
        this.uploadChange = this.uploadChange.bind(this);
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
        const { person } = this.props
        this.setState({
            visible: true,
            fileList: [],
        });
        if(person.account.headUrl != undefined && person.account.headUrl != ""){
            this.setState({
                fileList: [{
                    uid: person.account.headUrl,
                    name: "",
                    status: "done",
                    url: person.account.headUrl,
                }],
            });
        }
        this.formRef.current.setFieldsValue(
            Object.assign({}, person.account, {
            })
        );
    };

    updateAccount(){
        let fields = this.formRef.current.getFieldsValue()
        let params = Object.assign({}, fields, {
            headUrl: this.state.fileList.length > 0 ? this.state.fileList[0].url : ""
        })
        this.accountUpdate(
            {
                updateInfo: params 
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
        }).then(() => {
            let fileList = []
            for(let index in this.props.file.filePaths){
                let cur = this.props.file.filePaths[index]
                fileList.push({
                    uid: cur,
                    name: "",
                    status: "done",
                    url: cur
                })
            }
            this.setState({
                fileList:  [
                    ...this.state.fileList,
                    ...fileList
                ]
            })
        })
    }

    uploadChange(e: any){
        let fileList = this.state.fileList.filter((obj) => obj.uid !== e.uid)
        this.setState({ fileList: fileList })
    };

    render(){
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
                        <antd.Row style={{textAlign: "center"}}>
                            <antd.Upload
                                customRequest={this.customRequest}
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onRemove={this.uploadChange}
                            >
                                {this.state.fileList.length < 1 && '+ 头像'}
                            </antd.Upload>
                        </antd.Row >
                        <antd.Row >
                            <antd.Form.Item
                                name="nick"
                                label="昵称"
                                rules={[{ required: false, message: '请输入昵称' }]}
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
