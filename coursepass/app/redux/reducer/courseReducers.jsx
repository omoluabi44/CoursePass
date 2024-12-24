import { ActionTypes } from "../actionCreators/action-types";
const initialState = {
    courses: [
        {
            id: 1,
            title: "PHY 101",
            department: "mechanical",
            college: "CET",
            semester: 1,
        },
        {
            id: 2,
            title: "PHY 103",
            department: "computer science ",
            college: "CBS",
            semester: 1,
        }

    ]
}
export const  courseReducers = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.SET_COURSES:
            return  state
                state
        case ActionTypes.SELECTED_COURSE:
            return {
                ...state,
                course: action.payload
            }
        default:
            return state;
    }
}