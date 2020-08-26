'use strict'

import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as config from '&/config.js';
import { RootState, PersonState, personRedux } from 'reduxes';
import './index.less';


export interface PositionProps {
    person: PersonState;
    personHelper: any;
    history: any;
}

export interface PositionState {
    visible: boolean;
}

export interface PositionPageEvent{
}

@connect(
    (state: RootState, ownProps): Pick<PositionProps, 'person' > =>{
        return { person: state.person };
    },
    (dispatch: Dispatch): Pick<PositionProps, 'personHelper' > => {
        return {
            personHelper: bindActionCreators(personRedux.actions(), dispatch),
        };
    }
)
export class PositionManager extends React.PureComponent<PositionProps, PositionState>  implements PositionPageEvent{

    constructor(props: PositionProps, context?: any) {
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
