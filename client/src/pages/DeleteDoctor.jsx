import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/doctor_dash.css';
import { apiClient } from '../utils/apiClient'; // adjust path if needed

const DeleteDoctor = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure? This cannot be undone!')) {
      try {
        await apiClient('/doctors/delete', 'DELETE');
        localStorage.removeItem('token');
        navigate('/');
      } catch (err) {
        console.error('Error deleting account:', err);
        alert('Failed to delete account: ' + err.message);
      }
    }
  };

  return (
    <div className="page-content">
      <h2>Delete Account</h2>
      <div className="warning-box">
        <p>⚠️ This will permanently delete your account and all associated data.</p>
        <button onClick={handleDelete} className="delete-button">
          Confirm Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteDoctor;
