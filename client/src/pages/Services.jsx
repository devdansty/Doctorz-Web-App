import React from 'react';
import '../styles/home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceTile from '../components/ServiceTile';

const servicesList = [
  'General Consultation',
  'Pediatrics',
  'Dermatology',
  'Cardiology',
  'Orthopedics',
  'Mental Health Counseling',
];

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Our Services</h1>
        <div className="services-list">
          {servicesList.map((service, index) => (
            <ServiceTile key={index} service={service} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
