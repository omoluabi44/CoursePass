import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redox/actions/loginActionCreator';
import axios from 'axios';
import logo from '../assets/images/newLogo.png';
import { useToast } from './popUp';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', email: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Toast, showToast } = useToast();

  const handleSignUp = () => {
    navigate('/signUp');
  };

  const logIn = async () => {
    setErrors({ username: '', password: '', email: '' });
    try {
      setLoading(true);
      await new Promise((resolve, reject) => {
        dispatch(loginUser(username, password)).then(resolve).catch(reject);
      });
      setLoading(false);
      navigate('/CourseList', { replace: true });
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      setLoading(false);
      const message = error?.response?.data?.error || error.message;
      setErrors(prev => ({
        ...prev,
        username: message.includes('email') || message.includes('username') ? message : '',
        password: message.toLowerCase().includes('password') ? message : ''
      }));
      showToast('error', 'Login Failed', message);
    }
  };

  const handleChangepassword = async () => {
    setErrors({ username: '', password: '', email: '' });
    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.coursepass.me/api/v1/auth/change_password_request',
        { email }
      );
      setLoading(false);
      navigate(`/forgetpassword/${email}`);
    } catch (error) {
      setLoading(false);
      const message = error?.response?.data?.error || 'Request failed';
      setErrors(prev => ({ ...prev, email: message }));
      showToast('error', 'Password Reset Failed', message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      {Toast}

      {loading && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'white', marginLeft: '1rem' }}>Hold on...</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <img src={logo} alt="CoursePass Logo" style={{ width: 100, height: 100, marginBottom: '1rem' }} />
        <p style={{ color: '#007bff', fontSize: '1.5rem', fontWeight: 'bold' }}>CoursePass</p>
      </div>

      <h1 style={{ color: '#007bff', fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', margin: '1.5rem 0' }}>
        LOGIN
      </h1>

      {visible && (
        <div onClick={() => setVisible(false)} style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: 'white',
            width: '90%',
            maxWidth: 400,
            padding: '1.5rem',
            borderRadius: 12,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
              Change Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '0.9rem' }}>{errors.email}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button onClick={() => setVisible(false)} style={{
                flex: 1,
                backgroundColor: '#ccc',
                color: '#333',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                cursor: 'pointer'
              }}>
                Cancel
              </button>
              <button onClick={() => {
                setVisible(false);
                handleChangepassword();
              }} style={{
                flex: 1,
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                cursor: 'pointer'
              }}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        width: '100%',
        maxWidth: 400,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: '1rem',
            borderRadius: 12,
            border: '1px solid transparent',
            fontSize: '1rem',
            color: '#333',
            boxSizing: 'border-box'
          }}
        />
        {errors.username && <p style={{ color: 'red', fontSize: '0.9rem' }}>{errors.username}</p>}

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: '1rem',
              borderRadius: 12,
              border: '1px solid transparent',
              fontSize: '1rem',
              color: '#333',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 15,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#007bff',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        {errors.password && <p style={{ color: 'red', fontSize: '0.9rem' }}>{errors.password}</p>}

        <button onClick={logIn} style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.75rem',
          border: 'none',
          borderRadius: 12,
          fontSize: '1.25rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Login
        </button>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <p>Don't have an account?</p>
            <span onClick={handleSignUp} style={{ color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }}>
              Register
            </span>
          </div>
          <span onClick={() => setVisible(true)} style={{ color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }}>
            Forgot password?
          </span>
        </div>

        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.95rem',
          color: '#555',
        }}>
          Having issues logging in?{' '}
          <a
            href="https://wa.link/pxjhlf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
