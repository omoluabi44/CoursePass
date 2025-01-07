

import React, { useEffect, useState } from 'react';
import s from  "./Courses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetails, fetchDashboardCourses } from '../../redux/slice';
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { dashboardCourses, selectedCourse, status } = useSelector((state) => state.courses);

  const handleStartCourse = (courseId) => {
    navigate(`/courses/${courseId}`);

  };
  const handleTopicClick = (week, topic, content) =>{
    console.log('week:', week, 'topic:', topic, 'content:', content);
    
    navigate(`/courses/${courseID}/topics/${week}`, {state: {week,topic, content}});
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        
          await dispatch(fetchDashboardCourses()).unwrap();
          await dispatch(fetchCourseDetails(courseID)).unwrap();
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to fetch course data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, courseID]);

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load course details.</div>;
  }

  if (!selectedCourse) {
    return <div>No course found for this ID</div>;
  }
  const firstCourse = selectedCourse[0];
  console.log('First Course ID:', firstCourse.courseID);
  console.log('First Course Content:', firstCourse.content);
  return (
    console.log('selected courses:', selectedCourse[0].courseID),



    <>
      <div className={s.header_container}>
        <div className={s.filter_container}>
        <select 
                            name="college" 
                             id="college" 
                            className={s.select} 
                            onChange={(e)=>{
                              const courseId = e.target.value;
                              if(courseId){
                                handleStartCourse(courseId);
                              }
                            }}
                          >
                            <option value="">Course Lists</option>
                            {dashboardCourses.map((course) => (
                              
                                    <option key={course.courseID} value={course.courseID}>
                                  {course.name}
                                    </option>

                             
                               ))}
                         </select>
        </div>
      </div>

      <div className={s.container}>
        <div className={s.content}>
          <h2>{selectedCourse[0].courseID}</h2>
          <h3></h3>
          {selectedCourse?.length > 0 ? (
            <ul>
              {selectedCourse.map((outline) => (
                <li className={s.li} key={outline.week}
                onClick={() => handleTopicClick(outline.week, outline.topic, outline.content)}
                >
                  <strong>Week {outline.week}:</strong> {outline.topic}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Courses;

                   