import { ActionTypes } from "../actionCreators/action-types"
export const setCourses =(courses)=>{
    return {
        type: ActionTypes.SET_COURSES,
        payload: courses,
    }
}
export const selectedCourse =(course)=>{
    return {
        type: ActionTypes.SELECTED_COURSE,
        payload: course,
    }
}