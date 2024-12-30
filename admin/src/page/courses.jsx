import React, { useState } from "react";
import axios from "axios";
import "./CourseForm.css"; // For styling

const CourseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    courseID: "",
    semester: "",
    department: "",
    college: "",
    level: "",
  });

  const [status, setStatus] = useState(null); // For showing success or error messages

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
      const response = await axios.post("http://localhost:5000/api/v1/all_courses", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatus({ success: true, message: "Course added successfully!" });
      setFormData({
        name: "",
        courseID: "",
        semester: "",
        department: "",
        college: "",
        level: "",
      });
    } catch (error) {
      setStatus({ success: false, message: "Failed to add course. Please try again." });
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Course</h2>
      {status && (
        <div className={`status-message ${status.success ? "success" : "error"}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseID">Course ID:</label>
          <input
            type="text"
            form-row
            id="courseID"
            name="courseID"
            value={formData.courseID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <input
            type="text"
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="college">College:</label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="level">Level:</label>
          <input
            type="text"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
