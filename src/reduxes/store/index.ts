'use stict'


import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'reduxes/middleware';
import { RootState, rootReducer } from 'reduxes/reducers';


export function configureStore(initialState?: RootState): Store<RootState> {
    let middleware = applyMiddleware(thunk, logger);
  
    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware);
    }
  
    const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
        RootState
    >;
  
    if (module.hot) {
        module.hot.accept('reduxes/reducers', () => {
            const nextReducer = require('reduxes/reducers');
            store.replaceReducer(nextReducer);
        });
    }
  
    return store;
}
