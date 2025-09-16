import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/searchpage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { apiClient } from '../utils/apiClient';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Searchpage = () => {
  const query = useQuery().get('q') || '';
  const [search, setSearch] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await apiClient('/auth/validate'); // Create this route in backend
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
        localStorage.removeItem('token'); // Clean up invalid token
        console.warn('Invalid or expired token');
      }
    };

    if (localStorage.getItem('token')) {
      validateToken();
    }
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await apiClient(`/doctors/search?q=${encodeURIComponent(query)}`);
        setResults(data);
      } catch (err) {
        console.error('Search fetch error:', err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?q=${encodeURIComponent(search.trim())}`);
  };

  const handleBook = (doctorId) => {
    if (!isLoggedIn) {
      alert('Please login to book an appointment.');
    } else {
      navigate(`/book-appointment/${doctorId}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Search Results</h1>
        <form className="search-container" onSubmit={handleSearchSubmit} autoComplete="off">
          <input
            type="text"
            className="search-input"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="doctor-cards">
            {results.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
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

export default Searchpage;
