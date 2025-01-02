import React, { useState, useEffect } from "react";
import s from "./CourseList.module.css";
import axios from "axios";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    courseID: "",
    courseName: "",
  });
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  const API_URL = "http://localhost:5000/api/v1/courses";

  // Fetch all courses on component load
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        // Update course
        await axios.put(`${API_URL}/${editingCourse}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        setStatus({ success: true, message: "Course updated successfully!" });
      } else {
        // Create course
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "application/json" },
        });
        setStatus({ success: true, message: "Course created successfully!" });
      }
      setFormData({ courseID: "", courseName: "" });
      setEditingCourse(null);
      fetchCourses(); // Refresh the list of courses
    } catch (error) {
      setStatus({
        success: false,
        message: "Failed to save course. Please try again.",
      });
    }
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditingCourse(course.courseID);
  };

  const handleDelete = async (courseID) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${API_URL}/${courseID}`);
        setStatus({ success: true, message: "Course deleted successfully!" });
        fetchCourses();
      } catch (error) {
        setStatus({
          success: false,
          message: "Failed to delete course. Please try again.",
        });
      }
    }
  };

  return (
    <div className={s.form_container}>
      <h2>{editingCourse ? "Edit Course" : "Create Course"}</h2>
      {status && (
        <div className={`${s.status_message} ${status.success ? s.success : s.error}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={s.form_group}>
          <label htmlFor="courseID">Course ID:</label>
          <input
            type="text"
            id="courseID"
            name="courseID"
            value={formData.courseID}
            onChange={handleChange}
            required
          />
        </div>
        <div className={s.form_group}>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{editingCourse ? "Update Course" : "Create Course"}</button>
      </form>

      <h2>All Courses</h2>
      <ul className={s.course_list}>
        {courses.map((course) => (
          <li key={course.id} className={s.course_item}>
            <span>
              <strong>ID:</strong> {course.courseID}, <strong>Name:</strong> {course.courseName}
            </span>
            <button onClick={() => handleEdit(course)}>Edit</button>
            <button onClick={() => handleDelete(course.courseID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseForm;
