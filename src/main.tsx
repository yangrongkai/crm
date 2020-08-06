'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from 'reduxes';
import { RouterHelper } from 'routes';

import 'assets/style/global.less';


// prepare store
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RouterHelper />
  </Provider>,
  document.getElementById('root')
);
