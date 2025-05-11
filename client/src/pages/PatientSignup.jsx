import React, { useState } from 'react';
import '../styles/signup.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SelectRoleModal from '../components/SelectRoleModal';
import LoginModal from './Login'; // corrected import
import { apiClient } from '../utils/apiClient';

const PatientSignup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showSelectRole, setShowSelectRole] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Use apiClient: no need to specify headers or stringify body manually
      const data = await apiClient('/users/register', 'POST', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'patient'
      });

      // apiClient throws on HTTP errors, so no need to check res.ok here
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      window.location.href = '/dashboard/patient';
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h1>Patient Registration</h1>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required value={form.name} onChange={handleChange} />
          </div>

          <div className="form-group full-width">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={form.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required value={form.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" required value={form.confirmPassword} onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn full-width">Register as Patient</button>
        </form>

        <p className="login-link">
          Already have an account?{' '}
          <button
            onClick={() => setShowLoginModal(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </p>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSelectRole={() => {
            setShowLoginModal(false);
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default PatientSignup;
