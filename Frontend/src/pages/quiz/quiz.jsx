import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const DropdownComponent = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [uni, setUni] = useState(null);
  const [year, setYear] = useState(null);
  const [disabled, setDisabled] = useState(false);
 const [data, setData] = useState();
 const [isSuccess, setIsSuccess] = useState(false);
  const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coursepass.me/api/v1/quiz/filter');
        setData(response.data);
        setIsSuccess(true);
      } catch (err) {
        console.error('Error fetching quiz metadata:', err);
      }
    };
    fetchData();
    console.log(data);

  }, []);

  
  useEffect(() => {
    handleButtonVis();
  }, [course, uni, year]);

  useEffect(() => {
    const reset = () => {
      setCourse(null);
      setUni(null);
      setYear(null);
    };
    reset();
    return reset;
  }, []);



  let courses = [],
    universities = [],
    years = [];
  if (isSuccess) {
    courses = data.courseID?.map(course => ({ label: course, value: course })) || [];
    universities = data.university_code?.map(uni => ({ label: uni, value: uni })) || [];
    years = data.year?.map(year => ({ label: year, value: year })) || [];
  }

  const handleQuiz = () => {
    navigate(`/quizes/${course}/${uni}/${year}`);
  };

  const handleButtonVis = () => {
    if (course && uni && year) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const containerStyle = {
    padding: 20,
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#252231' : '#F9FAFB',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const headingStyle = {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: theme === 'dark' ? '#d4d4d4' : '#111827',
    marginBottom: 8,
  };

  const subheadingStyle = {
    fontSize: 16,
    textAlign: 'center',
    color: theme === 'dark' ? '#d4d4d4' : '#6B7280',
    marginBottom: 20,
  };

  const dropdownStyle = {
    height: 50,
    width: '100%',
    padding: '0 12px',
    fontSize: 16,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: theme === 'dark' ? '#252231' : '#ffffff',
    color: theme === 'dark' ? '#d4d4d4' : '#111827',
    border: '1px solid #D1D5DB',
  };

  const buttonStyle = {
    backgroundColor: '#3B82F6',
    padding: '14px',
    borderRadius: 8,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Select Past Question Preferences</h1>
      <p style={subheadingStyle}>Filter questions to start practice</p>

      <select
        style={dropdownStyle}
        value={course || ''}
        onChange={e => setCourse(e.target.value || null)}
      >
        <option value="">Select course</option>
        {courses.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <select
        style={dropdownStyle}
        value={uni || ''}
        onChange={e => setUni(e.target.value || null)}
      >
        <option value="">Select university</option>
        {universities.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <select
        style={dropdownStyle}
        value={year || ''}
        onChange={e => setYear(e.target.value || null)}
      >
        <option value="">Select year</option>
        {years.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <div
        style={buttonStyle}
        onClick={!disabled ? handleQuiz : undefined}
      >
        Start Quiz
      </div>
    </div>
  );
};

export default DropdownComponent;
