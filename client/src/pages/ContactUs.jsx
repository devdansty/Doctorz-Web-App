import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/home.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    // Normally, you'd send data to the backend here.
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Contact Us</h1>
        {submitted ? (
          <p>Thank you for reaching out! We will get back to you soon.</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
              />
            </label>
            <button type="submit" className="submit-btn">Send</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
