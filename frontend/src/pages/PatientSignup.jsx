import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authSignup } from '../api';
import '../styles/patient-signup.css';

const PatientSignup = () => {
  const [signupState, setSignupState] = useState({ name: '', email: '', password: '' });

  const handlePatientSignup = async (e) => {
    e.preventDefault();
    try {
      await authSignup({ role: 'patient', ...signupState });
      alert('Signup successful. Please login.');
      window.location.href = '/';
      setSignupState({ name: '', email: '', password: '' });
      onOpenAuth('login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <section>
      

      <div className="signup-panel">
        <h3>Sign up as Patient</h3>
        <form onSubmit={handlePatientSignup} className="signup-form">
          <input value={signupState.name} onChange={e => setSignupState(s => ({...s, name: e.target.value}))} placeholder="Full name" required />
          <input value={signupState.email} onChange={e => setSignupState(s => ({...s, email: e.target.value}))} placeholder="Email" type="email" required />
          <input value={signupState.password} onChange={e => setSignupState(s => ({...s, password: e.target.value}))} placeholder="Password" type="password" required />
          <button className="btn primary" type="submit">Signup</button>
        </form>
      </div>

      
    </section>
  );
};

export default PatientSignup;
