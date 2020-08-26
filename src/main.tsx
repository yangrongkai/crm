'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import * as config from '&/config.js';
import { configureStore } from 'reduxes';
import { RouterHelper } from 'routes';

import 'assets/style/global.less';


// prepare store
const store = configureStore();
const style = config.globalStyle

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider
            {...style}
        >
            <RouterHelper />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
