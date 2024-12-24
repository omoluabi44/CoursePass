const initialState ={
    college: "",
    department: "",
    level: "",
    semester: ""

}
const filterReducer = (state=initialState, action) => { 
    switch(action.type){
        case "SET_COLLEGE":
            return {
                ...state,
                college: action.payload,
            }
        case "SET_DEPARTMENT":
            return {
                ...state,
                department: action.payload,
            }
        case "SET_LEVEL":
            return {
                ...state,
                level: action.payload,
            }
        case "SET_SEMESTER":
            return {
                ...state,
                semester: action.payload,
            }
        default:
            return state;
    }
}

export default filterReducer;