import React from 'react';

const StatCard = ({ icon, value, label }) => {
  return (
    <div className="card stat-card">
      <i className={`fas fa-${icon}`} />
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
};

export default StatCard;
