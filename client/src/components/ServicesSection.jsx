import React from 'react';
import '../styles/home.css';
import ServiceTile from './ServiceTile';

const ServicesSection = () => {
  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="#007bff">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: "Gynecologists",
      description: "Specialist care"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="#007bff">
          <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"/>
        </svg>
      ),
      title: "MRI",
      description: "Arial test services"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="#007bff">
          <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
        </svg>
      ),
      title: "Video Consultation",
      description: "Online doctors"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="#007bff">
          <path d="M18 9h-2V7h2m0 6h-2v-2h2m0 6h-2v-2h2M8 9H6V7h2m0 6H6v-2h2m0 6H6v-2h2M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2z"/>
        </svg>
      ),
      title: "Child Specialists",
      description: "Pediatric care"
    }
  ];

  // Add alert function
  const handleAppointmentClick = () => {
    alert("Login to book appointments");
  };

  return (
    <section className="services">
      <button className="appointment-btn" onClick={handleAppointmentClick}>
        Book Appointment
      </button>
      <div className="tiles-grid">
        {services.map((service, index) => (
          <ServiceTile 
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
