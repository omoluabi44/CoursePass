import { useDispatch, useSelector } from "react-redux";
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
 

 export  async function fetchCourses(dispatch) {
 
      try {
        const response = await fetch("http://localhost:3000/api.json");
        const data = await response.json();
        
        if (data ) {
          dispatch(setCourses(data));
          console.log(courses.courseID);
          
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
