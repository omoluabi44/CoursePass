import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Session from './sessionConfiguration';
import { AiOutlineLeft, AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { FiBook } from 'react-icons/fi';
// import RewardedInterstitialAdButton from '../../../ads-folder/RewardedInterstitialAdButton';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [outline, setOutlineId] = useState('');
  const [courseID, setCourseid] = useState('');
  const [topic, setTopic] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ads, setAds] = useState(false);

  const [courseData, setCourseData] = useState([]);
  const [isCourseFetching, setIsCourseFetching] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsCourseFetching(true);
      try {
        const response = await axios.get(`https://api.coursepass.me/api/v1/course/${courseId}/outlines`);
        setCourseData(response.data);
        setFetchError(null);
      } catch (error) {
        console.error('Error fetching course:', error);
        setFetchError(error);
      } finally {
        setIsCourseFetching(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleNote = (outlineId) => {
    setOutlineId(outlineId.id);
    setTopic(outlineId.topic);
    setCourseid(courseId);
    setIsOpen(true);
  };

  const handleBack = () => navigate(-1);

  if (isCourseFetching) {
    return <div style={styles.loading}>Loading course outlines...</div>;
  }

  if (fetchError) {
    return (
      <div style={styles.errorContainer}>
        <button onClick={handleBack} style={styles.backButton}>
          <AiOutlineLeft size={24} />
        </button>
        <h2 style={styles.errorText}>Error fetching course outlines</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Session isOpen={isOpen} setIsOpen={setIsOpen} outline={outline} courseId={courseID} topic={topic} />

      <div style={styles.header}>
        <button onClick={handleBack} style={styles.backButton}>
          <AiOutlineLeft size={24} color='black' />
        </button>

        {/* {ads && <RewardedInterstitialAdButton />} */}

        <h1 style={styles.title}>Course Title: {courseId}</h1>
      </div>

      <div style={styles.courseList}>
        {courseData.map((course, id) => {
          const isExpanded = expandedIndex === course.orderID;

          return (
            <div key={id} style={styles.courseItem}>
              <div style={styles.courseHeader}>
                <h2 style={styles.courseTitle}>{course.topic}</h2>
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : course.orderID)}
                  style={styles.toggleButton}
                >
                  {isExpanded ? <AiOutlineUp size={24} color='black'/> : <AiOutlineDown color='black' size={24} />}
                </button>
              </div>

              {isExpanded && (
                <div style={styles.courseContent}>
                  <button onClick={() => handleNote(course)} style={styles.notesButton}>
                    <FiBook size={18} />
                    <span style={styles.notesText}>Notes</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Responsive styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  backButton: {
    padding: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007ACC',
    margin: 0,
    flex: 1,
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
  courseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  courseItem: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  courseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  courseTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    flex: 1,
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  courseContent: {
    marginTop: '1rem',
    paddingLeft: '1.5rem',
    '@media (max-width: 600px)': {
      paddingLeft: '1rem',
    },
  },
  notesButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: '1px solid #007ACC',
    borderRadius: '6px',
    backgroundColor: '#f0f8ff',
    color: '#000',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  notesText: {
    fontSize: '1rem',
    '@media (max-width: 600px)': {
      fontSize: '0.875rem',
    },
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    padding: '2rem',
    color: '#333',
  },
  errorContainer: {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
    fontFamily: 'Arial, sans-serif',
  },
  errorText: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: '#333',
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
};

export default CourseDetails;