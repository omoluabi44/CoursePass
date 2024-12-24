import  ActionTypes  from "../actionCreators/action-types";
const initialState = {
    courses: [ ]
}
export const  courseReducers = (state = initialState, action) => {
    switch(action.type){
        case "SET_COURSES":
            return {
                ...state,
                courses: action.payload,
            }
        // case ActionTypes.SELECTED_COURSE:
        //     return {
        //         ...state,
        //         course: action.payload
        //     }
        default:
            return state;
    }
}