
export const setCourses =(courses)=>{
    return {
        type: "SET_COURSES",
        payload: courses,
    }
}
export const setSelectedCourse =(course)=>{
    return {
        type: "SET_SELECTED_COURSE",
        payload: course,
    }
}
 


