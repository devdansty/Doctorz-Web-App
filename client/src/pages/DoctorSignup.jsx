import React, { useState } from 'react';
import { apiClient } from '../utils/apiClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from './Login';
import '../styles/signup.css';

const DoctorSignup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    license: '',
    qualifications: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setProfilePic(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const fullName = `${form.firstName} ${form.lastName}`;

    try {
      const data = await apiClient('/users/register', 'POST', {
        name: fullName,
        email: form.email,
        password: form.password,
        role: 'doctor',
        specialization: form.specialization,
        phone: form.phone,
        license: form.license,
        qualifications: form.qualifications,
        profilePic,
        city: form.city
      });

      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard/doctor';
    } catch (err) {
      alert(err.message || 'Something went wrong');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h1>Doctor Registration</h1>

        <div className="profile-upload">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <input
            type="file"
            id="doctorProfileUpload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="doctorProfileUpload" className="upload-btn">Upload Profile Picture</label>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group"><label>First Name</label><input type="text" id="firstName" required onChange={handleChange} /></div>
          <div className="form-group"><label>Last Name</label><input type="text" id="lastName" required onChange={handleChange} /></div>
          <div className="form-group"><label>Email</label><input type="email" id="email" required onChange={handleChange} /></div>
          <div className="form-group"><label>Phone</label><input type="tel" id="phone" required onChange={handleChange} /></div>
          <div className="form-group">
            <label>Specialization</label>
            <select id="specialization" required onChange={handleChange}>
              <option value="">Select Specialization</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
            </select>
          </div>
          <div className="form-group"><label>License Number</label><input type="text" id="license" required onChange={handleChange} /></div>
          <div className="form-group full-width"><label>Qualifications</label><textarea id="qualifications" rows="3" onChange={handleChange}></textarea></div>
          <div className="form-group"><label>Password</label><input type="password" id="password" required onChange={handleChange} /></div>
          <div className="form-group"><label>Confirm Password</label><input type="password" id="confirmPassword" required onChange={handleChange} /></div>
          <div className="form-group"><label>City</label><input type="text" id="city" onChange={handleChange} /></div>

          <button type="submit" className="submit-btn">Complete Registration</button>
        </form>

        <p className="login-link">
          Already have an account?{' '}
          <button
            onClick={() => setShowLoginModal(true)}
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login here
          </button>
        </p>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSelectRole={() => {
            setShowLoginModal(false);
            window.location.href = '/select-role';
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default DoctorSignup;