

import React, { useEffect, useState } from 'react';
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from '../../redux/slice';

const Courses = () => {
  const { courseID } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedCourse, status } = useSelector((state) => state.courses);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        dispatch(fetchCourseDetails(courseID)); 
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

  return (
    <>
      <div className="header_container">
        <div className="filter_container">
          <select 
            name="college" 
            id="college" 
            className="select" 
          >
            <option value="">Course Lists</option>
            {selectedCourse ? selectedCourse.courseOutline?.map((course) => (
              <option key={course.courseID || course.id} value={course.courseID || course.id}>
                {course.courseName || course.name}
              </option>
            )) : null}
          </select>
        </div>
      </div>

      <div className="container">
        <div className="content">
          <h2>{selectedCourse.courseName || selectedCourse.name}</h2>
          <h3></h3>
          {selectedCourse.courseOutline?.length > 0 ? (
            <ul>
              {selectedCourse.courseOutline.map((outline) => (
                <li key={outline.week}>
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