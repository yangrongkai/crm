'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from 'reduxes/store';
import { RouterHelper } from 'routes';

import 'antd/dist/antd.css';

// prepare store
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RouterHelper />
  </Provider>,
  document.getElementById('root')
);
