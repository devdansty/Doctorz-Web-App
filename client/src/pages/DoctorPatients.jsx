import React, { useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';
import '../styles/doctorpateints.css';

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await apiClient('/doctors/patients');
        setPatients(data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="page-content">
      <h2>👨‍⚕️ My Patients</h2>
      <div className="patients-grid">
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          patients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <img src={patient.photo} alt={patient.name} />
              <h4>{patient.name}</h4>
              <p>📅 Last Appointment: {new Date(patient.lastAppointment).toLocaleDateString()}</p>
              <p>👁️ Total Visits: {patient.totalVisits}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;
