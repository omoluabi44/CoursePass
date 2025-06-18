import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function CourseNote() {
  const navigate = useNavigate();
  const { outline, selectedValue, courseId, topic } = useParams();
  console.log(outline, selectedValue, courseId, topic);

  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Initialize theme from localStorage

  const user = JSON.parse(localStorage.getItem('user')) || {};

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`https://api.coursepass.me/api/v1/note/${outline}/${selectedValue}`);
        setNote(res.data);
        setLoading(false);
        console.log('this is res:', res);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchNote();
  }, [outline, selectedValue]);

  useEffect(() => {
    if (!note?.id) return;

    const timer = setTimeout(async () => {
      try {
        await axios.post('/api/points', {
          userID: user.id,
          note_id: note.id,
        });
        console.log('point earned');
      } catch (err) {
        console.log(err);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [note]);

  // Theme-based styles
  const themes = {
    light: {
      background: '#f2f2f2',
      contentBackground: '#fff',
      textColor: '#333',
      errorBackground: '#252231',
      errorTextColor: '#fff',
      buttonColor: '#333',
      shadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    dark: {
      background: '#1a1a1a',
      contentBackground: '#2c2c2c',
      textColor: '#e0e0e0',
      errorBackground: '#121212',
      errorTextColor: '#e0e0e0',
      buttonColor: '#e0e0e0',
      shadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
  };

  const styles = {
    container: {
      backgroundColor: themes[theme].background,
      minHeight: '100vh',
      padding: '1rem',
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
      marginBottom: '1rem',
      flexWrap: 'wrap',
    },
    backButton: {
      fontSize: '1.2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      marginRight: '0.5rem',
      color: themes[theme].buttonColor,
    },
    themeButton: {
      background: 'none',
      border: '1px solid',
      borderColor: themes[theme].buttonColor,
      borderRadius: '5px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      color: themes[theme].buttonColor,
      marginLeft: 'auto',
      fontSize: '0.9rem',
    },
    title: {
      fontSize: '1.5rem',
      margin: 0,
      flex: 1,
      color: themes[theme].textColor,
      '@media (max-width: 600px)': {
        fontSize: '1.2rem',
      },
    },
    content: {
      backgroundColor: themes[theme].contentBackground,
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: themes[theme].shadow,
      flex: 1,
      overflowX: 'auto',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '5px',
      margin: '0.5rem 0',
      display: 'block',
      objectFit: 'contain',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.2rem',
      padding: '2rem',
      color: themes[theme].textColor,
    },
    errorContainer: {
      backgroundColor: themes[theme].errorBackground,
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: themes[theme].errorTextColor,
      width: '100%',
      boxSizing: 'border-box',
    },
    errorText: {
      fontSize: '1.5rem',
      textAlign: 'center',
      color: themes[theme].errorTextColor,
    },
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;

  if (error)
    return (
      <div style={styles.errorContainer}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>
        <h2 style={styles.errorText}>Note not found: 404 error</h2>
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>←</button>
        <h2 style={styles.title}>{topic}</h2>
        <button onClick={toggleTheme} style={styles.themeButton}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <div style={styles.content}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            img: ({ src, alt }) => (
              <img src={src} alt={alt} style={styles.image} loading="lazy" />
            ),
          }}
        >
          {note?.content || ''}
        </ReactMarkdown>
      </div>
    </div>
  );
}