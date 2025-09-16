import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SidebarPatient from '../components/SidebarPatient';
import Footer from '../components/Footer';
import { apiClient } from '../utils/apiClient'; // adjust path if needed
import '../styles/patient_dash.css';
import '../styles/home.css';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', city: '', photo: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiClient('/patient/profile');
        setProfile(data);
      } catch {
        setMessage('Failed to load profile.');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('phone', profile.phone);
    formData.append('city', profile.city);
    if (file) formData.append('photo', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/patient/update-profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type with FormData
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      const updatedProfile = await res.json();

      setProfile(updatedProfile);
      setMessage('Profile updated!');
    } catch {
      setMessage('Update failed.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <SidebarPatient name={profile.name} photo={profile.photo} />
        <main className="page-content">
          <div className="header">
            <h1>Update Profile</h1>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
              {message && <p className="message">{message}</p>}

              <label>Name:</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} required />

              <label>Email:</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} required />

              <label>Phone:</label>
              <input type="tel" name="phone" value={profile.phone} onChange={handleChange} required />

              <label>City:</label>
              <input type="text" name="city" value={profile.city} onChange={handleChange} />

              <label>Profile Photo:</label>
              <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />

              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default UpdateProfile;
