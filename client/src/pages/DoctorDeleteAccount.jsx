import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/delete_doc_account.css';
import { apiClient } from '../utils/apiClient';

const DeleteDoctor = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const warning1 = window.confirm(
      '⚠️ WARNING: This action is PERMANENT and IRREVERSIBLE!\n\n' +
      'Deleting your account will result in:\n' +
      '• Loss of all patient records\n' +
      '• Deletion of availability schedule\n' +
      '• Removal from search listings\n\n' +
      'Are you ABSOLUTELY sure you want to proceed?'
    );

    if (warning1) {
      const warning2 = window.confirm(
        '🚨 FINAL CONFIRMATION 🚨\n\nThis is your LAST CHANCE to cancel.\n' +
        'After this, your doctor profile, all appointments, and user access will be wiped from our system.\n\n' +
        'Do you REALLY want to delete your account?'
      );

      if (warning2) {
        try {
          await apiClient('/doctors/deleteaccount', 'DELETE');
          localStorage.removeItem('token');
          alert('✅ Account deleted permanently.');
          navigate('/');
        } catch (err) {
          console.error('Error deleting account:', err);
          alert('❌ Failed to delete account: ' + err.message);
        }
      }
    }
  };

  return (
    <div className="page-content">
      <h2 style={{ color: '#dc3545' }}>🛑 Permanently Delete Account</h2>
      <div className="warning-box">
        <p style={{ fontWeight: 'bold', color: '#b30000' }}>
          ⚠️ This action is irreversible. Once deleted:
        </p>
        <ul>
          <li>🗑️ Your entire doctor profile will be erased</li>
          <li>👥 All patient relationships and data will be lost</li>
          <li>📅 Availability and appointments will be removed</li>
          <li>🔐 You will no longer be able to access the system</li>
        </ul>
        <p style={{ color: '#a94442', marginTop: '10px' }}>
          Please proceed only if you're 100% certain.
        </p>
        <button onClick={handleDelete} className="delete-button">
          🔥 YES, DELETE MY ACCOUNT FOREVER
        </button>
      </div>
    </div>
  );
};

export default DeleteDoctor;
