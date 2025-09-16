import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import '../styles/admin.css';

const PatientsManagement = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    const data = await apiClient('/admin/patients');
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this patient?')) {
      await apiClient(`/admin/users/${id}`, 'DELETE');
      fetchPatients();
    }
  };

  const handleBlock = async (id) => {
    await apiClient(`/admin/users/${id}/block`, 'PUT');
    fetchPatients();
  };

  const handleUnblock = async (id) => {
    await apiClient(`/admin/users/${id}/unblock`, 'PUT');
    fetchPatients();
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
          <div className="nav-item" onClick={() => navigate('/admin/doctors')}>Manage Doctors</div>
          <div className="nav-item active" onClick={() => navigate('/admin/patients')}>Manage Patients</div>
          <div className="nav-item logout" onClick={handleLogout}>Logout</div>
        </div>
      </div>

      <div className="main-content">
        <h2>Manage Patients</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.isBlocked ? 'Blocked' : 'Active'}</td>
                <td>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                  {!p.isBlocked
                    ? <button onClick={() => handleBlock(p._id)}>Block</button>
                    : <button onClick={() => handleUnblock(p._id)}>Unblock</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsManagement;
