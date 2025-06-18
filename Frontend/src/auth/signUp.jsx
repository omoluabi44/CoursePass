import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/newLogo.png';

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, type: '', title: '', message: '' });
  const navigate = useNavigate();

  const [inputs, setInput] = useState({
    email: '',
    Fname: '',
    Lname: '',
    password: '',
    whatsap_num: '',
    username: '',
  });
  const { email, Fname, Lname, password, whatsap_num, username } = inputs;

  const [errors, setIsError] = useState({});

  const validate = async () => {
    let valid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Please input email';
      valid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = 'Please input valid email';
      valid = false;
    }

    if (!whatsap_num) {
      newErrors.whatsap_num = 'Please input WhatsApp number';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Please input password';
      valid = false;
    } else if (!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)) {
      newErrors.password = 'Password must be 8+ characters with uppercase, lowercase, and number';
      valid = false;
    }

    if (!Fname) {
      newErrors.Fname = 'Please input first name';
      valid = false;
    }

    if (!Lname) {
      newErrors.Lname = 'Please input last name';
      valid = false;
    }

    if (!username) {
      newErrors.username = 'Please input username';
      valid = false;
    }

    setIsError(newErrors);

    if (valid) {
      try {
        setVisible(true);
        const res = await axios.post('https://api.coursepass.me/api/v1/auth/register', {
          email,
          Fname,
          Lname,
          password,
          whatsap_num,
          username,
        });

        if (res.status === 201) {
          setVisible(false);
          navigate(`/otp/${username}/${email}`);
        } else {
          setVisible(false);
          setToast({ visible: true, type: 'error', title: 'Error', message: res.data.message });
        }
      } catch (err) {
        setVisible(false);
        setToast({
          visible: true,
          type: 'error',
          title: 'Error',
          message: err.response?.data?.error || 'Registration failed',
        });
      }
    }
  };

  const handleOnChange = (value, field) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleError = (error, field) => {
    setIsError((prev) => ({ ...prev, [field]: error }));
  };

  const closeToast = () => setToast({ ...toast, visible: false });

  return (
    <>
      <style>
        {`
          .login-container {
            min-height: 100vh;
            background-color: #f5f5f5;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            font-family: Arial, sans-serif;
          }

          .logo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }

          .logo {
            width: 100px;
            height: 100px;
            margin-bottom: 1rem;
          }

          .brand-text {
            color: #007bff;
            font-size: 1.5rem;
            font-weight: bold;
          }

          .register-title {
            color: #007bff;
            font-size: 2.25rem;
            font-weight: bold;
            text-align: center;
            margin: 1.5rem 0;
          }

          .form-container {
            width: 100%;
            max-width: 500px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .input-container {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .input-label {
            font-size: 1rem;
            color: #333;
            margin-bottom: 0.25rem;
            font-weight: 500;
          }

          .input-field {
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            width: 100%;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
          }

          .input-field:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
          }

          .error-text {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }

          .submit-button {
            background-color: #007bff;
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 12px;
            font-size: 1.25rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            width: 100%;
            text-align: center;
          }

          .submit-button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }

          .login-link-container {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
          }

          .login-link {
            color: #007bff;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
          }

          .login-link:hover {
            text-decoration: underline;
          }

          .support-text {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.95rem;
            color: #555;
          }

          .support-text a {
            color: #007bff;
            font-weight: bold;
            text-decoration: none;
          }

          .support-text a:hover {
            text-decoration: underline;
          }

          .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #007bff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #dc3545;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
          }

          .toast.success {
            background-color: #28a745;
          }

          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>

      <div className="login-container">
        {visible && (
          <div className="loader-overlay">
            <div className="loader"></div>
            <p style={{ color: 'white', marginLeft: '1rem' }}>Sending code...</p>
          </div>
        )}

        {toast.visible && (
          <div className={`toast ${toast.type}`}>
            <h3>{toast.title}</h3>
            <p>{toast.message}</p>
            <button onClick={closeToast} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        )}

        <div className="logo-container">
          <img src={logo} alt="CoursePass Logo" className="logo" />
          <p className="brand-text">CoursePass</p>
        </div>

        <h1 className="register-title">REGISTER</h1>

        <div className="form-container">
          {['Fname', 'Lname', 'email', 'username', 'whatsap_num', 'password'].map((field, i) => (
            <div className="input-container" key={i}>
              <label className="input-label">
                {field === 'Fname' ? 'First Name' :
                 field === 'Lname' ? 'Last Name' :
                 field === 'whatsap_num' ? 'WhatsApp Number' :
                 field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'email' ? 'email' : field === 'password' ? 'password' : field === 'whatsap_num' ? 'tel' : 'text'}
                className="input-field"
                placeholder={`Enter your ${field === 'Fname' ? 'first name' : field === 'Lname' ? 'last name' : field.replace('_', ' ')}`}
                onChange={(e) => handleOnChange(e.target.value, field)}
                onFocus={() => handleError(null, field)}
              />
              {errors[field] && <span className="error-text">{errors[field]}</span>}
            </div>
          ))}

          <button className="submit-button" onClick={validate}>
            Confirm Email
          </button>

          <div className="login-link-container">
            <p>Already have an account?</p>
            <span className="login-link" onClick={() => navigate('/login')}>
              Login
            </span>
          </div>

          <div className="support-text">
            Having issues signing up?{' '}
            <a href="https://wa.link/pxjhlf" target="_blank" rel="noopener noreferrer">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
