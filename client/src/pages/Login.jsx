import React, { useState } from 'react';
import { apiClient } from '../utils/apiClient';
import '../styles/login.css';

const Login = ({ onClose, onSwitchToSelectRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // apiClient handles JSON body and headers
      const data = await apiClient('/users/login', 'POST', { email, password, role });

      localStorage.setItem('token', data.token);

      if (data.role === 'admin') window.location.href = '/admin/dashboard';
      else if (data.role === 'doctor') window.location.href = '/dashboard/doctor';
      else if (data.role === 'patient') window.location.href = '/dashboard/patient';
    } catch (err) {
      // apiClient throws on non-2xx so we catch here
      alert(err.message || 'Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="login-modal-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="input-group">
            <label>Login As</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="login-link">
          Don’t have an account?{' '}
          <button
            onClick={() => {
              onClose();
              onSwitchToSelectRole();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Join Us
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
