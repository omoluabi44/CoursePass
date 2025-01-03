import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions,fetchCourses,   } from '../../redux/questionSlice';
import s from './selectionPage.module.css'

export const CourseSelection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courses, status } = useSelector((state) => state.questions);
    useEffect(() => {
        dispatch(fetchCourses());
      }, [dispatch]);


    const handleCourseClick = (courseID) => {
        
             dispatch(fetchQuestions(courseID));
            navigate(`/past-questions/${courseID}`);
}
  return (
    <>
    <div className="course-selection-container">
      <h2>Select a Course to Start the Quiz</h2>
      
      {/* Check if courses are being loaded */}
      {status === 'loading' ? (
        <p>Loading courses...</p>
      ) : (
        <ul className="course-list">
          {courses.length === 0 ? (
            <p>No courses available</p>
          ) : (
            courses.map((course) => (
              <li
                key={course}
                className="course-item"
                onClick={() => handleCourseClick(course)}
              >
                {course}
              </li>
            ))
          )}
        </ul>
      )}
    </div>

    </>
  )
}
