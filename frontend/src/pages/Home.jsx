import React from 'react';
import '../styles/home.css';
import doctorImg from '../assets/doctor.png'; // Make sure to add your PNG in src/assets/

const Home = ({ onOpenAuth }) => {
  return (
    <section className="home container">

      {/* Intro section with doctor image */}
      <div className="intro-section">
    <img src={doctorImg} alt="Doctor" className="doctor-img" />
        <div className="intro-text">
          <h2> <strong> Welcome to SmartCare</strong></h2>
          <p>Your health, our priority — connect with experienced doctors today.</p>
        </div>
      </div>

      {/* Hero section */}
      <div className="hero">
        <h1>SmartCare — Hospital Management</h1>
        <p>Find trusted doctors & book appointments easily.</p>
        <div className="cta">
          <button
            className="btn primary"
            onClick={() => (window.location.href = '/doctors')}
          >
            Find Doctors
          </button>
        </div>
      </div>

    </section>
  );
};

export default Home;
