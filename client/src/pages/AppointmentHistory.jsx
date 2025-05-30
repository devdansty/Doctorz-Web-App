import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SidebarPatient from '../components/SidebarPatient';
import Footer from '../components/Footer';
import '../styles/patient_dash.css';
import '../styles/home.css';
import { apiClient } from '../utils/apiClient';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState({ name: '', photo: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both appointments and user profile in parallel
        const [appointmentsData, profileData] = await Promise.all([
          apiClient('/appointments/mine'),
          apiClient('/patient/profile'),
        ]);

        console.log('Profile data:', profileData);

        setAppointments(appointmentsData);
        setUser({ name: profileData.name, photo: profileData.photo });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="loading">Loading appointment history...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <SidebarPatient name={user.name} photo={user.photo} />
        <main className="page-content">
          <h1>Appointment History</h1>
          <div className="card">
            {appointments.length > 0 ? (
              appointments.map((app, idx) => (
                <div key={idx} className="appointment-card">
                  <img
                    src={app.doctor?.photo || '/default-doctor.png'}
                    alt="Doctor"
                    className="doctor-img"
                  />
                  <div>
                    <h4>{app.doctor?.name || 'Dr. Unknown'}</h4>
                    <p>{app.doctor?.specialization || 'Specialization'}</p>
                  </div>
                  <div>
                    <p>{new Date(app.date).toLocaleDateString()}</p>
                    <p>{app.time}</p>
                  </div>
                  <span
                    className={`badge badge-${app.status === 'completed' ? 'success' : 'warning'}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            ) : (
              <p>No appointment history found.</p>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default AppointmentHistory;
