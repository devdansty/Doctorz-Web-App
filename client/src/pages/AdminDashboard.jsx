import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <div className="nav-menu">
          <div className="nav-item active" onClick={() => navigate('/admin/dashboard')}>Dashboard</div>
          <div className="nav-item" onClick={() => navigate('/admin/doctors')}>Manage Doctors</div>
          <div className="nav-item" onClick={() => navigate('/admin/patients')}>Manage Patients</div>
          <div className="nav-item logout" onClick={handleLogout}>Logout</div>
        </div>
      </div>

      <div className="main-content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Here you can manage doctors, patients, and view system statistics.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
