import {combineReducers} from 'redux';
import filterReducer from "./courseFilterReducers"
import  reducer from "../../redux/slice"
import questionReducer from "../questionSlice"

export const rootReducer = combineReducers({
    courses: reducer,
    filters: filterReducer,
    questions: questionReducer
})