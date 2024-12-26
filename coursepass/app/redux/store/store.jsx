import { rootReducer } from "../reducer";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const devToolsExtension = 
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION__() 
    : (f) => f;

// const enhancer = compose(
//   applyMiddleware(thunk),  // Add middleware (thunk) 
//   devToolsExtension        // Add Redux DevTools Extension
// );

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),      
);
