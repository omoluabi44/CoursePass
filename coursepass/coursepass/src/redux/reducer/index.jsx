import {combineReducers} from 'redux';
import {courseReducers} from '../reducer/courseReducers';
import filterReducer from "./courseFilterReducers"
import  reducer from "../../redux/slice"

export const rootReducer = combineReducers({
    courses: reducer,
    filters: filterReducer,
})