'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, PersonState, personRedux } from 'reduxes';
import './index.less';


export interface PermissionRuleGroupProps {
    person: PersonState;
    personHelper: any;
    history: any;
}

export interface PermissionRuleGroupState {
    visible: boolean;
}

export interface PermissionRuleGroupPageEvent{
}

@connect(
    (state: RootState, ownProps): Pick<PermissionRuleGroupProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<PermissionRuleGroupProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class PermissionRuleGroupManager extends React.PureComponent<PermissionRuleGroupProps, PermissionRuleGroupState>  implements PermissionRuleGroupPageEvent{

    constructor(props: PermissionRuleGroupProps, context?: any) {
        super(props, context);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                权限组管理
            </div>
        )
    }
};
