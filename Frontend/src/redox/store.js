// import {createStore, applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import {loginReducer} from  './reducers/loginReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { api } from './slice/apiSlice';


export const store = configureStore( {
  reducer: {
    login: loginReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});