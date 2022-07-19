# Thunk
- Thunk is the middleware than allowed dispatching asynchronous actions
```
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Middleware for dispatching async actions

import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
```