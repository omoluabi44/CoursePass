import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const { email } = useParams();

  const navigate = useNavigate();

  

  console.log(code, password, email);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        'https://api.coursepass.me/api/v1/auth/reset_password',
        { email, code, password }
      );

      console.log(response.data);
      //PopUp({ type: 'success', title: 'Successful', message: 'success' });
      navigate('/login');
    } catch (error) {
      console.log(error);
     // PopUp({ type: 'error', title: 'Error', message: `${error.response.data.error}` });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
     
    >
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>CHANGE PASSWORD</h1>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5rem',
          gap: '1rem',
        }}
      >
        <input
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            padding: '1rem',
            borderRadius: '1rem',
            border: 'none',
            width: '90%',
            maxWidth: '400px',
            fontSize: '1rem',
          }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification code"
        />

        <input
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            padding: '1rem',
            borderRadius: '1rem',
            border: 'none',
            width: '90%',
            maxWidth: '400px',
            fontSize: '1rem',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
        />

        <button
          onClick={handleChangePassword}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '1rem',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          Change Password
        </button>

        <button
          onClick={() => navigate('/login')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '1rem',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            cursor: 'pointer',
          }}
        >
          Testing
        </button>
      </div>
    </div>
  );
}
