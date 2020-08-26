'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, PersonState, personRedux } from 'reduxes';
import './index.less';


export interface OrganizationProps {
    person: PersonState;
    personHelper: any;
    history: any;
}

export interface OrganizationState {
    visible: boolean;
}

export interface OrganizationPageEvent{
}

@connect(
    (state: RootState, ownProps): Pick<OrganizationProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<OrganizationProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class OrganizationManager extends React.PureComponent<OrganizationProps, OrganizationState>  implements OrganizationPageEvent{

    constructor(props: OrganizationProps, context?: any) {
        super(props, context);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
            组织管理
            </div>
        )
    }
};
