import React from 'react';
import SidebarPatient from '../components/SidebarPatient';
import '../styles/delete_account.css';
import { apiClient } from '../utils/apiClient'; // adjust path if needed

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirmed) return;

    try {
      await apiClient('/patient/delete-account', 'DELETE');
      alert('Your account has been deleted.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      alert('Error deleting account: ' + err.message);
    }
  };

  return (
    <div className="dashboard">
      <SidebarPatient
        name="Patient"
        photo="https://randomuser.me/api/portraits/women/65.jpg"
      />
      <div className="main-content">
        <div className="header">
          <h1>Delete Account</h1>
        </div>

        <div className="card">
          <p>
            Deleting your account is permanent and will remove all your data from our system.
          </p>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
