import React from 'react';
import '../styles/home.css';

const ServiceTile = ({ icon, title, description }) => {
  return (
    <div className="tile">
      {icon}
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default ServiceTile;