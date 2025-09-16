import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/searchresult.css';
import { apiClient } from '../utils/apiClient';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const query = useQuery().get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        await apiClient('/auth/validate');
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        console.warn('Invalid or expired token');
      }
    };

    if (localStorage.getItem('token')) {
      validateToken();
    }
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await apiClient(`/doctors/search?q=${encodeURIComponent(query)}`);
        setResults(data);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleBook = (doctorId) => {
    if (!isLoggedIn) {
      alert('Please login to book an appointment.');
      navigate('/');
    } else {
      navigate(`/dashboard/patient/book/${doctorId}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Search Results for "{query}"</h1>

        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <div className="doctor-cards">
            {results.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <img
                  src={doctor.userId?.profileImage || '/profilepic.jpg'}
                  alt="Doctor"
                  className="doctor-avatar"
                 />
                <h3>{doctor.userId?.name}</h3>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>City:</strong> {doctor.city}</p>
                <p><strong>Email:</strong> {doctor.userId?.email}</p>
                <button
                  className="appointment-btn"
                  onClick={() => handleBook(doctor._id)}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
