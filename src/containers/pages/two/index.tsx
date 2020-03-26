'use strict'


import React from 'react';


export class Two extends React.PureComponent {

    render() {
        console.log(' two component --------------->>>>  props', this.props)
        return (
            <div>
                 第二个页面 
            </div>
        )
    }

}
