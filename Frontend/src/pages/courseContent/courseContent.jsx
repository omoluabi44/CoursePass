import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetails, fetchDashboardCourses } from '../../redux/slice';
import { useNavigate } from "react-router-dom";
import CourseNavigation from '../../Logic/navNextPrev';
import "./courseContent.css";

export const CourseContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { courseID } = useParams();
    const { week, topic, content } = location.state || {};

    // Fetch course details and dashboard courses
    const { dashboardCourses, selectedCourse, status } = useSelector((state) => state.courses);

    // Function to handle course start navigation
    const handleStartCourse = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    // Function to handle topic click (navigate to detailed topic page)
    const handleTopicClick = (week, topic, content) => {
        navigate(`/courses/${courseID}/topics/${week}`, { state: { week, topic, content } });
    };

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

    // If the course data is still loading or the course is not found
    if (loading) {
        return <div>Loading course details...</div>;
    }

    if (!selectedCourse || !selectedCourse.courseOutline) {
        return <div>Course data is unavailable.</div>;
    }

    if (!topic || !content) {
        return <div>No topic found</div>;
    }

    // Render course content
    return (
        <>
            <div className="header_container">
                <div className="filter_container">
                    <select
                        name="college"
                        id="college"
                        className="select"
                        onChange={(e) => {
                            const courseId = e.target.value;
                            if (courseId) {
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
                    <select
                        name="college"
                        id="college"
                        className="select"
                        onChange={(e) => {
                            console.log("invoke");
                            
                            const week = parseInt(e.target.value);
                            if (week) {
                                const selectedTopic = selectedCourse.courseOutline.find(topic => topic.week === week);
                                if (selectedTopic) {
                                    handleTopicClick(week, selectedTopic.topic, selectedTopic.content);
                                }
                            }
                        }}
                    >
                        <option value="">{selectedCourse.courseName} Outline</option>
                        {selectedCourse.courseOutline.map((course) => (
                            <option key={course.week} value={course.week}>
                                {course.topic}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='course_content'>
                <h1><strong>Week</strong> {week}: {topic}</h1>
                <p>{content}</p>
                <CourseNavigation
                courseId={courseID}
                currentWeek={week}
                courseOutline={selectedCourse.courseOutline}
                />
            </div>
        </>
    );
};
