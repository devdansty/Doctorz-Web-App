import React from 'react';

const AppointmentCard = ({ app }) => {
  const date = new Date(app.date).toLocaleDateString();

  return (
    <div className="appointment-card">
      <img src={app.doctor.photo} alt="Doctor" className="doctor-img" />
      <div className="appointment-info">
        <h4>{app.doctor.name}</h4>
        <p>{app.doctor.specialization}</p>
      </div>
      <div>
        <p><strong>{date}</strong></p>
        <p>{app.time}</p>
      </div>
      <div>
        <span className={`badge badge-${app.status === 'confirmed' ? 'success' : 'warning'}`}>
          {app.status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;
