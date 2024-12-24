import {combineReducers} from 'redux';
import {courseReducer} from '../reducer/courseReducers';

export const rootReducer = combineReducers({
    allCourses: courseReducer,
})