import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebardoctor.css';

const SidebarDoctor = ({ name, photo, specialization }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="profile">
        <img 
          src={photo || 'https://randomuser.me/api/portraits/men/45.jpg'} 
          alt="Doctor" 
          className="profile-img" 
        />
        <h3>Dr. {name}</h3>
        <p>{specialization}</p>
      </div>

      <div className="nav-menu">
        {/* Dashboard */}
        <div className="nav-item" onClick={() => navigate('/dashboard/doctor')}>
          <i className="fas fa-clipboard-list"></i>
          <span>Dashboard</span>
        </div>

        {/* Appointments */}
        <div className="nav-item" onClick={() => navigate('/dashboard/doctor/appointments')}>
          <i className="fas fa-calendar-check"></i>
          <span>My Appointments</span>
        </div>

        {/* Availability */}
        <div className="nav-item" onClick={() => navigate('/dashboard/doctor/availability')}>
          <i className="fas fa-clock"></i>
          <span>Set Availability</span>
        </div>

        {/* Patients */}
        <div className="nav-item" onClick={() => navigate('/dashboard/doctor/patients')}>
          <i className="fas fa-user-injured"></i>
          <span>My Patients</span>
        </div>

        {/* Profile Settings */}
        <div className="nav-item" onClick={() => navigate('/dashboard/doctor/profile')}>
          <i className="fas fa-user-cog"></i>
          <span>Profile Settings</span>
        </div>

        {/* Delete Account */}
        <div className="nav-item" onClick={() => navigate('/dashboard/doctor/delete')}>
          <i className="fas fa-user-slash"></i>
          <span>Delete Account</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarDoctor;