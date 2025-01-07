import React, { useState } from "react";
import axios from "axios";
import s from "./CourseForm.module.css"; // For styling

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
    <div className={s.form_container}>
      <h2>Add a New Course</h2>
      {status && (
        <div className={`${s.status_message} ${status.success ? s.success : s.error}`}>
          {status.message}
        </div>
      )}
      <form className={s.form} onSubmit={handleSubmit}>
   
        <div className={s.form_group}>
          <label htmlFor="name">Course Name:</label>
       
          <select
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          >
             <option value="" key="">Select Course Name</option>
            <option value="CHM 307" key="">CHM 307</option>
            <option value="GST 303" key="">GST 303</option>
            <option value="CHM 303" key="">CHM 303</option>
            <option value="PHY 301" key="">PHY 301</option>
            <option value="MAT 301" key="">MAT 301</option>
            <option value="GST 203" key="">GST 203</option>
            <option value="CHM 207" key="">CHM 207</option>
            <option value="CHM 203" key="">CHM 203</option>
            <option value="MAT 201" key="">MAT 201</option>
            <option value="GST 103" key="">GST 103</option>
            <option value="CHM 107" >CHM 107</option>
            <option value="CHM 103" >CHM 103</option>
            <option value="PHY 101">PHY 101</option>
            <option value="MAT 101" >MAT 101</option>
          </select>
        </div>
        <div className={s.form_group}>
          <label htmlFor="courseID">Course ID:</label>
          <select
            id="courseID"
            name="courseID"
            value={formData.courseID}
            onChange={handleChange}
            required
          >
             <option value="" key="">Select Course ID</option>
            <option value="CHM307" key="">CHM307</option>
            <option value="GST303" key="">GST303</option>
            <option value="CHM303" key="">CHM303</option>
            <option value="PHY301" key="">PHY301</option>
            <option value="MAT301" key="">MAT301</option>
            <option value="GST203" key="">GST203</option>
            <option value="CHM207" key="">CHM207</option>
            <option value="CHM203" key="">CHM203</option>
            <option value="MAT201" key="">MAT201</option>
            <option value="GST103" key="">GST103</option>
            <option value="CHM107" key="">CHM107</option>
            <option value="CHM103" key="">CHM103</option>
            <option value="PHY101" key="">PHY101</option>
            <option value="MAT101" key="">MAT101</option>
          </select>
        </div>
        <div className={s.form_group}>
          <label htmlFor="semester">Semester:</label>
          <select 
          name="semester" 
          id="semester"
          value={formData.semester}
           onChange={handleChange}>
            <option value="">Select Semester</option>
            <option value="First Semester">First Semester</option>
            <option value="Second Semester">Second Semester</option>
          </select>
        </div>
        <div className={s.form_group}>
          <label htmlFor="department">Department:</label>
          <select 
          name="department" 
          id="department" 
          required
          value={formData.department}
          onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="Mechatronics Engineering">Mechatronics</option>
            <option value="Mechanical Engineering">Mechanical</option>
            <option value="Civil Engineering">Civil</option>
            <option value="Electrical Engineering">Elect/Elect</option>
            <option value="Chemical Engineering">Chemical</option>
            <option value="Agricultural Engineering">Agric</option>
            <option value="Computer Science">Computer</option>
          </select>
        </div>
        <div className={s.form_group}>
          <label htmlFor="college">College:</label>
       
           <select 
           name="college" 
           value={formData.college}
           id="college"
           required
           onChange={handleChange}>
              <option value="">Select College</option>
              <option value="College of Engineering">College of Engineering</option>
              <option value="College of Basic Science">College of Basic Science</option>
              <option value="College of Social Science">College of Social Science</option>
              <option value="College of Arts">College of Arts</option>
              <option value="College of Environmenal">College of Environmenal</option>
            </select>
        </div>
        <div className={s.form_group}>
          <label htmlFor="level">Level:</label>
       
            <select
             name="level" 
             id="level" 
             value={formData.level}
             onChange={handleChange}
             required>
              <option value="">Select Level</option>
              <option value="100 Level">100lv</option>
              <option value="200 Level">200lv</option>
              <option value="300 Level">300lv</option>
              <option value="400 Level">400lv</option>
              <option value="500 Level">500lv</option>
            </select>
        </div>
        <button type="submit">Add Course</button>
    
      </form>
    </div>
  );
};

export default CourseForm;
