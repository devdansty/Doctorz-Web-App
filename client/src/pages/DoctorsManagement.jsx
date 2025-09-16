import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import '../styles/admin.css';

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    const data = await apiClient('/admin/doctors');
    setDoctors(data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleApprove = async (id) => {
    await apiClient(`/admin/doctors/${id}/approve`, 'PUT');
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this doctor?')) {
      await apiClient(`/admin/users/${id}`, 'DELETE');
      fetchDoctors();
    }
  };

  const handleBlock = async (id) => {
    await apiClient(`/admin/users/${id}/block`, 'PUT');
    fetchDoctors();
  };

  const handleUnblock = async (id) => {
    await apiClient(`/admin/users/${id}/unblock`, 'PUT');
    fetchDoctors();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <div className="nav-menu">
          <div className="nav-item" onClick={() => navigate('/admin/dashboard')}>Dashboard</div>
          <div className="nav-item active" onClick={() => navigate('/admin/doctors')}>Manage Doctors</div>
          <div className="nav-item" onClick={() => navigate('/admin/patients')}>Manage Patients</div>
          <div className="nav-item logout" onClick={handleLogout}>Logout</div>
        </div>
      </div>

      <div className="main-content">
        <h2>Manage Doctors</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doc => (
              <tr key={doc._id}>
                <td>{doc.userId.name}</td>
                <td>{doc.userId.email}</td>
                <td>{doc.isApproved ? 'Approved' : 'Pending'} / {doc.userId.isBlocked ? 'Blocked' : 'Active'}</td>
                <td>
                  {!doc.isApproved && <button onClick={() => handleApprove(doc._id)}>Approve</button>}
                  <button onClick={() => handleDelete(doc.userId._id)}>Delete</button>
                  {!doc.userId.isBlocked
                    ? <button onClick={() => handleBlock(doc.userId._id)}>Block</button>
                    : <button onClick={() => handleUnblock(doc.userId._id)}>Unblock</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsManagement;
