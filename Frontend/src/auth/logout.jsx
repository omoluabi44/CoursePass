import React from 'react';

const DeleteUserButton = () => {
  const handleDeleteUser = () => {
    localStorage.removeItem('user');
    alert('User has been removed from localStorage');
  };

  return (
    <button onClick={handleDeleteUser} style={buttonStyle}>
      Delete User from Storage
    </button>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default DeleteUserButton;
