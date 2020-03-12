'use strict'


import * as React from 'react';
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { paths } from 'routes/paths';


export namespace Router {
  export interface Props {
  }
}


export class RouterHelper extends React.Component<Router.Props> {
    
    static defaultProps: Partial<Router.Props> = {
    };

    render() {
        return (
            <BrowserRouter>
                {renderRoutes(paths)}
            </BrowserRouter>
        )
    }

} 
