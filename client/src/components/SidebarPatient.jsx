import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebarpatient.css'; 

const SidebarPatient = ({ name, photo }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="profile">
        <img src={photo || 'https://randomuser.me/api/portraits/women/65.jpg'} alt="Profile" className="profile-img" />
        <h3>{name}</h3>
        <p>Patient</p>
      </div>

      <div className="nav-menu">
        <div className="nav-item" onClick={() => navigate('/dashboard/patient')}>
          <i className="fas fa-home" />
          <span>Dashboard</span>
        </div>

        <div className="nav-item" onClick={() => navigate('/dashboard/patient/appointments')}>
          <i className="fas fa-calendar-check" />
          <span>My Appointments</span>
        </div>

        <div className="nav-item" onClick={() => navigate('/dashboard/patient/book')}>
          <i className="fas fa-user-md" />
          <span>Book a Doctor</span>
        </div>

        <div className="nav-item" onClick={() => navigate('/dashboard/patient/profile')}>
        <i className="fas fa-user-cog" />
         <span>Update Profile</span>
        </div>

        <div className="nav-item" onClick={() => navigate('/dashboard/patient/delete')}>
        <i className="fas fa-user-slash" />
        <span>Delete Account</span>
        </div>
        
      </div>
    </div>
  );
};

export default SidebarPatient;
