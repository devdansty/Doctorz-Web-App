
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../pages/Login';
import SelectRoleModal from './SelectRoleModal';
import '../styles/home.css';
import ContactUs from '../pages/ContactUs';
import Searchpage from '../pages/Searchpage';
import Services from '../pages/Services';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSelectRole, setShowSelectRole] = useState(false);

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-logo">doctorZ</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Searchpage">Doctors</Link>
          <Link to="/Services">Services</Link>
          <Link to="/ContactUs">Contact Us</Link>
          <button className="join-btn" onClick={() => setShowLogin(true)}>Sign In</button>
          <button className="join-btn" onClick={() => setShowSelectRole(true)}>Join Us</button>
        </div>
      </nav>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToSelectRole={() => {
            setShowLogin(false);
            setShowSelectRole(true);
          }}
        />
      )}

      {showSelectRole && (
        <SelectRoleModal onClose={() => setShowSelectRole(false)} />
      )}
    </>
  );
};

export default Navbar;
