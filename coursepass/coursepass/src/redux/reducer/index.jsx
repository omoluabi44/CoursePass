import {combineReducers} from 'redux';
import {courseReducers} from '../reducer/courseReducers';
import filterReducer from "./courseFilterReducers"

export const rootReducer = combineReducers({
    allCourses: courseReducers,
    filters: filterReducer,
})