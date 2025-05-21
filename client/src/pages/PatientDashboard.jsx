import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SidebarPatient from '../components/SidebarPatient';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import AppointmentCard from '../components/AppointmentCard';
import '../styles/patient_dash.css';
import '../styles/home.css';
import { apiClient } from '../utils/apiClient';

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    name: '',
    photo: '',
    totalAppointments: 0,
    completedAppointments: 0,
    upcomingAppointments: 0,
    upcoming: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await apiClient('/patient/dashboard'); 
        console.log('Dashboard stats:', data);
        setStats(data);
      } catch (err) {
        console.error('Dashboard fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <SidebarPatient name={stats.name} photo={stats.photo} />
        <main className="page-content">
          <div className="header">
            <h1>Patient Dashboard</h1>
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = '/dashboard/patient/book')}
            >
              <i className="fas fa-plus" /> Book Appointment
            </button>
          </div>

          <div className="stats-cards">
            <StatCard icon="calendar" label="Total Appointments" value={stats.totalAppointments} />
            <StatCard icon="check-circle" label="Completed" value={stats.completedAppointments} />
            <StatCard icon="clock" label="Upcoming" value={stats.upcomingAppointments} />
          </div>

          <div className="card upcoming-appointments">
            <h2>Upcoming Appointments</h2>
            <div id="appointmentsList">
              {stats.upcoming.length > 0 ? (
                stats.upcoming.map((app, idx) => <AppointmentCard key={idx} app={app} />)
              ) : (
                <p>No upcoming appointments.</p>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default PatientDashboard;
