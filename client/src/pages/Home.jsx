import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Home;