import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        color: '#007BFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          backgroundColor: '#007BFF',
          color: '#fff',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
          No Past Questions Found
        </h1>
        <p style={{ marginBottom: '2rem', fontSize: '1rem' }}>
          There is no past question for the year selected, kindly try another year.
        </p>
        <button
          onClick={() => navigate("/quiz")}
          style={{
            backgroundColor: 'white',
            color: '#007BFF',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
