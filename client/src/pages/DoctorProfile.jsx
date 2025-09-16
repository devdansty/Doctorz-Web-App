import React, { useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';
import '../styles/doctor_dash.css';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    specialization: '',
    city: '',
    profilePic: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiClient('/doctors/profile');
        setProfile({
          name: data.name || '',
          specialization: data.specialization || '',
          city: data.city || '',
          profilePic: data.profilePic || ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient('/doctors/profileupdate', 'PUT', profile);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="page-content">
      <h2>👨‍⚕️ Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={profile.specialization}
          onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={profile.city}
          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
        />
        <input
          type="url"
          placeholder="Profile Picture URL"
          value={profile.profilePic}
          onChange={(e) => setProfile({ ...profile, profilePic: e.target.value })}
        />
        <button type="submit">💾 Save Changes</button>
      </form>
    </div>
  );
};

export default DoctorProfile;
