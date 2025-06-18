// src/components/toast.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const PopUp = ({ type = 'error', title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: 20, // Changed from bottom: 20 to top: 20
      right: 20,
      backgroundColor: type === 'error' ? '#dc3545' : '#28a745',
      color: 'white',
      padding: '1rem',
      borderRadius: 8,
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      maxWidth: 300,
      zIndex: 1000
    }}>
      <h3 style={{ margin: 0, fontSize: '1rem' }}>{title}</h3>
      <p style={{ margin: 0 }}>{message}</p>
    </div>,
    document.body
  );
};

export function useToast() {
  const [toast, setToast] = React.useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  const hideToast = () => setToast(null);

  return {
    showToast,
    Toast: toast ? <PopUp {...toast} onClose={hideToast} /> : null
  };
}
