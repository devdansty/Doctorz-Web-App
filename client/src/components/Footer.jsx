import React from 'react';
import '../styles/home.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="footer-logo">doctorZ</div>
        <p>Book appointments with the best Doctors and Specialists across Pakistan.</p>
        <p>Find verified healthcare professionals near you for instant consultation.</p>
        <p>Available 24/7 with trusted services across all major cities.</p>
        <p>We bridge the gap between patients and expert medical care, both online and offline.</p>
      </div>

      <div className="footer-section">
        <h4>Services</h4>
        <p>General Checkup</p>
        <p>MRI / CT Scan</p>
        <p>Ultrasound & X-Ray</p>
        <p>Online Consultation</p>
        <p>Lab Test Booking</p>
      </div>

      <div className="footer-section">
        <h4>Policy</h4>
        <p>Primary Policy</p>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>Cookie Policy</p>
      </div>

      <div className="footer-section">
        <h4>Partner With Us</h4>
        <p>Partner Terms</p>
        <p>List Your Clinic</p>
        <p>Doctor Signup</p>
        <p>Support Us</p>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: support@doctorz.com</p>
        <p>Phone: 0307-1507354</p>
        <p> Street 1 ,Chairman Colony ,Wah,Cantt </p>
      </div>

      <div className="footer-section newsletter">
        <h4>Subscribe</h4>
        <p>Get updates and health tips delivered to your inbox.</p>
        <input type="email" placeholder="Enter your email" />
        <button className="subscribe-btn">Subscribe</button>
      </div>
    </footer>
  );
};

export default Footer;
