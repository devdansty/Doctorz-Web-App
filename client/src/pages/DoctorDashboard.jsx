import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SidebarDoctor from '../components/SidebarDoctor';
import Footer from '../components/Footer';
import { apiClient } from '../utils/apiClient';

const DoctorDashboard = () => {
  const [data, setData] = useState(null);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await apiClient('/doctors/dashboard');
        setData(dashboardData);

        // Fetch today's schedule
        const today = new Date().toISOString().split('T')[0]; // e.g., '2025-05-28'
        const scheduleData = await apiClient(`/doctors/today-schedule?date=${today}`);
        setAppointmentsToday(scheduleData || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!data) return <p className="text-center">No data available.</p>;

  return (
    <div className="dashboard">
      <SidebarDoctor />
      <main className="page-content">
        <Navbar />
        <div className="header">
          <h2>Welcome, Dr. {data.name}</h2>
          <button className="btn btn-primary" onClick={() => navigate('/doctor/availability')}>
            ➕ New Schedule
          </button>
        </div>

        <div className="profile-section">
          <img src={data.photo} alt="Doctor" className="doctor-profile-img" />
          <div className="stats-grid">
            <div>
              <h3>{data.specialization}</h3>
              <p>Specialization</p>
            </div>
            <div>
              <h3>{data.totalAppointments}</h3>
              <p>Total Appointments</p>
            </div>
            <div>
              <h3>{data.rating}/5</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        <div className="todays-schedule">
          <h3>Today's Schedule</h3>
          {appointmentsToday.length === 0 ? (
            <p>No schedule to display yet.</p>
          ) : (
            <ul>
              {appointmentsToday.map((appt) => (
                <li key={appt._id}>
                  <strong>{appt.time}</strong> - {appt.patientName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default DoctorDashboard;
