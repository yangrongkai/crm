'use strict'


import * as React from 'react';
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { paths } from 'routes/paths';


export interface RouterProps {
}

export class RouterHelper extends React.Component<RouterProps> {
    
    static defaultProps: Partial<RouterProps> = {
    };

    render() {
        return (
            <BrowserRouter>
                {renderRoutes(paths)}
            </BrowserRouter>
        )
    }

} 
