// src/components/SelectRoleModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/role.css';

const SelectRoleModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-backdrop">
      <div className="modal-popup">
        <h2>Select Your Role</h2>
        <div className="role-buttons">
          <button onClick={() => navigate('/signup/doctor')} className="role-btn doctor">
            I am a Doctor
          </button>
          <button onClick={() => navigate('/signup/patient')} className="role-btn patient">
            I am a Patient
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SelectRoleModal;
