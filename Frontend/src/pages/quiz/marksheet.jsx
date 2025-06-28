// src/pages/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScoreMutation } from '../../redox/slice/apiSlice';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ResultPage({ questions = [], userID, courseID }) {
  const navigate = useNavigate();
  const [sendScore, { isSuccess: scoreSuccess, isError: scoreError }] = useScoreMutation();
  const [score, setScore] = useState(0);
  const [percent, setPercent] = useState(0);
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // compute score & send once on mount
  useEffect(() => {
    if (!questions.length) return;
    const correctCount = questions.filter(q => q.userAnswer === q.correct_answer).length;
    setScore(correctCount);
    const pct = Math.round((correctCount / questions.length) * 100);
    setPercent(pct);
    // send to backend
    sendScore({ userID, courseID, score: correctCount });
  }, [questions, sendScore, userID, courseID]);

  // optional: handle mutation result
  useEffect(() => {
    if (scoreError) {
      console.error('Score save error');
    }
  }, [scoreError]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: isDark ? '#000' : '#fafafa',
        color: isDark ? '#ddd' : '#333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Mark Sheet: {courseID}
      </h1>

      {/* Score & Progress */}
      <div
        style={{
          width: '90%',
          maxWidth: '500px',
          backgroundColor: isDark ? '#252231' : '#fff',
          border: `1px solid ${isDark ? '#444' : '#ddd'}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          SCORE: {score} / {questions.length}
        </p>
        <div style={{ width: '150px', height: '150px', margin: '0 auto' }}>
          <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: isDark ? '#d4d4d4' : '#007bff',
              textColor: isDark ? '#ddd' : '#333',
              trailColor: isDark ? '#444' : '#eee',
            })}
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => navigate('/quiz')}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#ff6600',
          color: '#fff',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '1.5rem',
        }}
      >
        Reset
      </button>

      {/* Detailed Breakdown */}
      <div
        style={{
          width: '100%',
          flex: 1,
          overflowY: 'auto',
          maxWidth: '600px',
        }}
      >
        {questions.map((q, idx) => {
          const gotIt = q.userAnswer === q.correct_answer;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: isDark ? '#252231' : '#fff',
                border: `1px solid ${isDark ? '#444' : '#ddd'}`,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '1rem',
              }}
            >
              <h2
                style={{
                  fontSize: '1.1rem',
                  marginBottom: '0.75rem',
                  textAlign: 'center',
                  color: isDark ? '#ddd' : '#222',
                }}
              >
                Q{idx + 1}: {q.questionText}
              </h2>

              {/* Correct Answer */}
              <div
                style={{
                  backgroundColor: '#e6f9e6',
                  padding: '8px',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              >
                <strong>✅ Correct:</strong> {q.correct_answer}
              </div>

              {/* Your Answer */}
              <div
                style={{
                  backgroundColor: gotIt ? '#eef9ee' : '#fdecea',
                  padding: '8px',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              >
                <strong>{gotIt ? '✔️ You got it!' : '❌ Your answer:'}</strong>{' '}
                {q.userAnswer || 'Not Answered'}
              </div>

              {/* Other Options */}
              <div
                style={{
                  backgroundColor: '#e8f1fd',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                <strong>Options:</strong> {q.incorrect_answers.join(', ')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
