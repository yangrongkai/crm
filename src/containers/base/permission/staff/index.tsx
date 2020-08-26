'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, PersonState, personRedux } from 'reduxes';
import './index.less';


export interface StaffProps {
    person: PersonState;
    personHelper: any;
    history: any;
}

export interface StaffState {
    visible: boolean;
}

export interface StaffPageEvent{
}

@connect(
    (state: RootState, ownProps): Pick<StaffProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<StaffProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class StaffManager extends React.PureComponent<StaffProps, StaffState>  implements StaffPageEvent{

    constructor(props: StaffProps, context?: any) {
        super(props, context);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                职位管理
            </div>
        )
    }
};
