import React, { useState } from 'react';
import { authSignup } from '../api';
import '../styles/doctor-signup.css';

const DoctorSignup = () => {
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    description: '',
    fee: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authSignup({ role: 'doctor', ...form });
      alert('Doctor signed up. Please login.');
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container doctor-signup">
      <h2>Doctor Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input required placeholder="Full name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        <input required placeholder="Specialization" value={form.specialization} onChange={e => setForm(f => ({...f, specialization: e.target.value}))} />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
        <input required type="number" step="0.01" placeholder="Fee" value={form.fee} onChange={e => setForm(f => ({...f, fee: e.target.value}))} />
        <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        <input required type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} />
        <button className="btn primary" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default DoctorSignup;
