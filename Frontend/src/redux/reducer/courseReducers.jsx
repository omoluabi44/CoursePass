import  ActionTypes  from "../actionCreators/action-types";

const initialState = {
    courses: [ ],
    selectedCourse: null,
}
export const  courseReducers = (state = initialState, action) => {
    switch(action.type){
        case "SET_COURSES":
            return {
                ...state,
                courses: action.payload,
            }
        case "SET_SELECTED_COURSE":
            return {
                ...state,
                selectedCourse: action.payload
            }
        default:
            return state;
    }
}