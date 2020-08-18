'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, PersonState, personRedux } from 'reduxes';
import './index.less';


export interface PermissionPlatformProps {
    person: PersonState;
    personHelper: any;
    history: any;
}

export interface PermissionPlatformState {
    visible: boolean;
}

export interface PermissionPlatformPageEvent{
}

@connect(
    (state: RootState, ownProps): Pick<PermissionPlatformProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<PermissionPlatformProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class PermissionPlatformManager extends React.PureComponent<PermissionPlatformProps, PermissionPlatformState>  implements PermissionPlatformPageEvent{

    constructor(props: PermissionPlatformProps, context?: any) {
        super(props, context);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                授权平台管理
            </div>
        )
    }
};
