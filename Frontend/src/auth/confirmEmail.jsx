import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPInput = () => {
  const {  email,username } = useParams(); // Get params from URL (e.g., /otp/:username/:email)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ visible: false, type: '', title: '', message: '' });
  const [id, setId] = useState('');
  const [user_name, setUsername] = useState('');
  const inputs = useRef([]);
  const navigate = useNavigate();

  console.log( email,username);
  

  const handleChange = (text, index) => {
    // Handle paste or multi-digit input
    if (text.length > 1) {
      const newOtp = text
        .replace(/\D/g, '') // Remove non-digits
        .split('')
        .slice(0, 6)
        .concat(['', '', '', '', '', ''])
        .slice(0, 6);
      setOtp(newOtp);
      inputs.current[5]?.focus();
      setError('');
      return;
    }

    // Handle single-digit input
    const newOtp = [...otp];
    newOtp[index] = text.replace(/\D/g, ''); // Ensure only digits
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    setError('');
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!otp.every((digit) => digit !== '')) {
      setError('Please enter all 6 digits');
      setToast({
        visible: true,
        type: 'error',
        title: 'Error',
        message: 'Please enter all 6 digits',
      });
      return;
    }

    const otpString = otp.join('');
    if (isNaN(otpString)) {
      setError('Invalid OTP format');
      setToast({
        visible: true,
        type: 'error',
        title: 'Error',
        message: 'Invalid OTP format',
      });
      return;
    }
console.log(otpString);

    try {
      const response = await axios.post("https://api.coursepass.me/api/v1/auth/verify", {
        code: otpString,
         email,
        username
      });
      console.log(response);
      
      if (response.status === 200) {
        setToast({
          visible: true,
          type: 'success',
          title: 'Success',
          message: 'Verification successful!',
        });
        setId(response.data.id);
        setUsername(response.data.username);
        setError('');
        setOtp(['', '', '', '', '', '']);
        navigate("/login");
      }
    } catch (err) {
      console.log("thisi",err);
      
      const errorMessage = err.response?.data?.error || 'Verification failed';
      setError(errorMessage);
      setToast({
        visible: true,
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  };

  const handleBack = () => {
    setError('');
    setOtp(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
    navigate('/signUp');
  };

  // Close toast after 3 seconds
  React.useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast({ ...toast, visible: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  return (
    <>
      <style>
        {`
          /* Base styles */
          .otp-container {
            min-height: 100vh;
            background-color: #f5f5f5; /* bg-base */
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            font-family: Arial, sans-serif;
          }

          .instruction-text {
            font-size: 1.25rem;
            text-align: center;
            margin: 2.5rem 0 1.75rem;
            color: #333;
            padding: 0.5rem;
          }

          .error-text {
            color: #dc3545;
            font-size: 1rem;
            text-align: center;
            margin-bottom: 1rem;
          }

          .otp-input-container {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .otp-input {
            width: 40px;
            height: 50px;
            border: 1px solid #000;
            border-radius: 5px;
            text-align: center;
            font-size: 1.25rem;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
          }

          .otp-input.error {
            border-color: #dc3545;
          }

          .otp-input:focus {
            outline: none;
            border-color: #007bff; /* text-accent */
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
          }

          .button-container {
            display: flex;
            justify-content: space-around;
            width: 100%;
            max-width: 400px;
            margin-top: 1.25rem;
            gap: 1rem;
          }

          .otp-button {
            padding: 1rem;
            border-radius: 12px;
            font-size: 1.25rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            flex: 1;
            text-align: center;
          }

          .back-button {
            background-color: #f5f5f5; /* bg-base */
            border: 1px solid #007bff; /* border-accent */
            color: #007bff; /* text-accent */
          }

          .back-button:hover {
            background-color: #e9ecef;
            transform: translateY(-2px);
          }

          .confirm-button {
            background-color: #007bff; /* bg-accent */
            border: 1px solid #007bff;
            color: #ffffff; /* text-base */
          }

          .confirm-button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }

          /* Toast styles */
          .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #dc3545; /* Error */
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
          }

          .toast.success {
            background-color: #28a745; /* Success */
          }

          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .otp-container {
              padding: 1.5rem;
            }

            .instruction-text {
              font-size: 1.1rem;
            }

            .otp-input {
              width: 35px;
              height: 45px;
              font-size: 1.1rem;
            }

            .otp-button {
              font-size: 1.1rem;
              padding: 0.75rem;
            }
          }

          @media (max-width: 480px) {
            .otp-container {
              padding: 1rem;
            }

            .instruction-text {
              font-size: 1rem;
            }

            .otp-input {
              width: 30px;
              height: 40px;
              font-size: 1rem;
            }

            .otp-button {
              font-size: 1rem;
              padding: 0.6rem;
            }

            .button-container {
              flex-direction: column;
            }

            .toast {
              bottom: 10px;
              right: 10px;
              max-width: 90%;
            }
          }
        `}
      </style>

      <div className="otp-container">
        <p className="instruction-text">Enter the verification code sent to your email (check your inbox or spam folder)</p>
        {error && <p className="error-text">{error}</p>}
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              className={`otp-input ${error ? 'error' : ''}`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>
        <div className="button-container">
          <button className="otp-button back-button" onClick={handleBack}>
            Go Back
          </button>
          <button className="otp-button confirm-button" onClick={handleSubmit}>
            Confirm
          </button>
        </div>

        {/* Toast */}
        {toast.visible && (
          <div className={`toast ${toast.type}`}>
            <h3>{toast.title}</h3>
            <p>{toast.message}</p>
            <button
              onClick={() => setToast({ ...toast, visible: false })}
              style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OTPInput;