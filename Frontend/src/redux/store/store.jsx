import { rootReducer } from "../reducer";
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';


const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
const store = createStore(rootReducer, compose(applyMiddleware(thunk), devToolsExtension))

export default store;