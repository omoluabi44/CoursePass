import { ActionTypes } from "../actionCreators/action-types"
export const setProducts =(courses)=>{
    return {
        type: ActionTypes.SET_COURSES,
        payload: courses,
    }
}
export const selectedProduct =(course)=>{
    return {
        type: ActionTypes.SELECTED_COURSE,
        payload: course,
    }
}