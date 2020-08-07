'use strict'


import React from 'react';

export interface WrapperProps{
    component: any;
}

class Wrapper {

    // decorate(wrapper: WrapperProps): React.Component | React.PureComponent {
    decorate(wrapper: WrapperProps): any {
        class Intercept extends React.Component {

            constructor(props: any, context: any){
                super(props, context);
            }

            render(): any{
                return (
                    <wrapper.component {...this.props}/>
                )
            }

        }
        return Intercept;
    }


}

export const wrapper = (new Wrapper()).decorate;
