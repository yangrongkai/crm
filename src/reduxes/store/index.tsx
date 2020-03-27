'use stict'


import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'reduxes/middleware';


import { RootState, rootReducer } from './reducer';


export function configureStore(initialState?: RootState): Store<RootState> {
    let middleware = applyMiddleware(thunk, promise, logger);
  
    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware);
    }
  
    const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
        RootState
    >;
  
    /*
    if (module.hot) {
        module.hot.accept('reduxes/reducer', () => {
            const nextReducer = require('reduxes/reducer');
            store.replaceReducer(nextReducer);
        });
    }
    */
  
    return store;
}
