import React, { useEffect, useState } from 'react';
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedCourse } from "../../redux/actions/courses";

const Courses = () => {
  const { courseID } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { courses, selectedCourse } = useSelector((state) => state.allCourses);
  
  const state = useSelector((state) => state);
  console.log("Entire Redux State:", state);
  console.log("Courses in Redux:", state.allCourses.courses);
  console.log("Selected Course:", state.allCourses.selectedCourse);



  useEffect(() => {
 
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
      
        let course = courses.find((course) => course.courseID === courseID);

        if (!course) {

          const response = await fetch('http://localhost:3000/courseOutline.json');
          const data = await response.json();
          course = data.find((course) => course.courseID === courseID);
        }

        if (course) {
          dispatch(setSelectedCourse(course)); 
        } else {
          setError("Course not found.");
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to fetch course data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, [dispatch, courseID, courses]); 

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedCourse) {
    return <div>No course found for this ID</div>;
  }


  return (
    <>
        <div className="header_container">


                  <div className="filter_container">
              
                        <select 
                            name="college" 
                            id="college" 
                            className="select" 
                            // onChange={handleCollegeChange}
                          >
                            <option value="">Course Lists</option>
                            {courses.map((course) => (
                              <option key={course.courseID} value={course.courseID}>
                              {course.courseName}
                            </option>
                              ))}
                        </select>
                          
                        
                          
                  </div>
            
            </div>
    
    
    <div className="container">
  
      
      <div className="content">
        <h2>{selectedCourse.courseName}</h2>
        <h3></h3>
        {selectedCourse.courseOutline?.length > 0 ? (
          <ul>
            {selectedCourse.courseOutline.map((outline) => (
              <li key={outline.week}>
                <strong>Week {outline.week}:</strong> {outline.topic}
              </li>
            ))}
          </ul>
        ) : (
         <></>
        )}
      </div>

      {/* Chat section */}
      {/* <div id="chatContainer">
        <div className="responConatiner">
          <div className="messageUser">
            <p>Hello, AI!</p>
          </div>

          <div className="messageAi">
            <p>Hi there! How can I assist you today?</p>
          </div>
        </div>

        <div id="inputContainer">
          <textarea id="userInput" placeholder="Type your message..."></textarea>
          <button id="sendButton">Send</button>
        </div>
      </div> */}
    </div>
    </>
  );
};

export default Courses;
