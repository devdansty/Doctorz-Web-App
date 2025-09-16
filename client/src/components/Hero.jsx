import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/apiClient'; // Assuming you have this utility to make API calls

const Hero = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = await apiClient(`/doctors/search?q=${encodeURIComponent(query)}`);
        setResults(data);
      } catch (err) {
        setResults([]);
        console.error('Search error:', err);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/results?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="hero">
      <form className="search-container" onSubmit={handleSearch} autoComplete="off">
        <div className="search-box-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search doctors by name, specialization, or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.map(doctor => (
                <li key={doctor._id} className="search-result-item">
                  <strong>{doctor.userId.name}</strong> — {doctor.specialization} — {doctor.city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="search-btn">Search</button>
      </form>
    </section>
  );
};

export default Hero;
