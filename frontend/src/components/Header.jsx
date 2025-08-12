import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = ({ user, onLogout, onOpenAuth }) => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/"><img src="../assets/react.svg" alt="SmartCare" style={{ height: 40 }} /></Link>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/doctors">Services</Link>
          <a href="/contact">Contact Us</a>
        </nav>

        <div className="header-actions">
          {!user && (
            <>
              <button className="btn" onClick={() => onOpenAuth('login')}>Login</button>
              <button className="btn primary" onClick={() => onOpenAuth('signup')}>Signup</button>
            </>
          )}

          {user && (
            <>
              <span className="user-badge">{user.name || 'User'}</span>
              {user.role === 'doctor' ? (
                <Link to="/doctor/dashboard" className="btn">Dashboard</Link>
              ) : (
                <Link to="/patient/dashboard" className="btn">Dashboard</Link>
              )}
              <button className="btn" onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
