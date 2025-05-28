import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SidebarPatient from '../components/SidebarPatient';
import Footer from '../components/Footer';
import '../styles/patient_dash.css';
import '../styles/home.css';
import { apiClient } from '../utils/apiClient'; // adjust path if needed

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: '', date: '', time: '' });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({ name: '', photo: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using apiClient without /api prefix
        const [doctorsData, profileData] = await Promise.all([
          apiClient('/doctors'),
          apiClient('/patient/profile'),
        ]);

        setDoctors(doctorsData);
        setUser({ name: profileData.name, photo: profileData.photo });
      } catch {
        setMessage('Error loading data.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient('/appointments', 'POST', form);
      setMessage('Appointment booked!');
      setForm({ doctorId: '', date: '', time: '' });
    } catch {
      setMessage('Booking failed.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <SidebarPatient name={user.name} photo={user.photo} />
        <main className="page-content">
          <div className="header">
            <h1>Book Appointment</h1>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="form">
              {message && <p className="message">{message}</p>}

              <label>Doctor:</label>
              <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} ({doc.specialization})
                  </option>
                ))}
              </select>

              <label>Date:</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required />

              <label>Time:</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} required />

              <button type="submit" className="btn btn-primary">Book Now</button>
            </form>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default BookAppointment;
