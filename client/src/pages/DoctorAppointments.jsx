import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient'; // Make sure this handles auth headers
import '../styles/showpateintappointments.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiClient('/appointments/doctor');
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to fetch appointments:', err);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>⏳ Loading appointments...</p>;
  }

  return (
    <div className="page-content">
      <h2>📅 My Booked Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Photo</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td>{app.patient.name}</td>
                <td>
                  <img
                    src={app.patient.photo}
                    alt="Patient"
                    style={{ width: '40px', borderRadius: '50%' }}
                  />
                </td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>{app.status}</td>
                <td>{app.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorAppointments;
