import {combineReducers} from 'redux';
import {courseReducers} from '../reducer/courseReducers';

export const rootReducer = combineReducers({
    allCourses: courseReducers,
})