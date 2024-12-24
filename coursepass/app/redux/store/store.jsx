
import { rootReducer } from "../reducer";
import { createStore } from "redux";


const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
export const store = createStore(rootReducers, compose(applyMiddleware(thunk), devToolsExtension))



