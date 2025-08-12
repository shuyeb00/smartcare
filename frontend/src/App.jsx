import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DoctorSearch from './pages/DoctorSearch';
import DoctorSignup from './pages/DoctorSignup';
import PatientSignup from './pages/PatientSignup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import Contact from './pages/Contact';
import { authLogin } from './api';
import './styles/header.css';
import './styles/auth.css';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('smartcare_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' }); // mode login/signup
  const [roleChoice, setRoleChoice] = useState('patient'); // default

  useEffect(() => {
    if (user) localStorage.setItem('smartcare_user', JSON.stringify(user));
    else localStorage.removeItem('smartcare_user');
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('smartcare_token');
    localStorage.removeItem('smartcare_user');
    setUser(null);
    navigate('/');
  };

  const openAuth = (mode) => {
    setAuthModal({ open: true, mode });
  };

  const closeAuth = () => setAuthModal({ open: false });

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const res = await authLogin({ role: roleChoice, email, password });
      const { token, user } = res.data;
      localStorage.setItem('smartcare_token', token);
      localStorage.setItem('smartcare_user', JSON.stringify({ ...user, role: roleChoice }));
      setUser({ ...user, role: roleChoice });
      closeAuth();
      // route to respective dashboard
      if (roleChoice === 'doctor') navigate('/doctor/dashboard');
      else navigate('/patient/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} onOpenAuth={openAuth} />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home onOpenAuth={openAuth} />} />
          <Route path="/doctors" element={<DoctorSearch user={user} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/patient/signup" element={<PatientSignup />} />
          <Route path="/patient/dashboard" element={<PatientDashboard user={user} />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard user={user} />} />
        </Routes>
      </main>

      {authModal.open && (
        <div className="auth-overlay">
          <div className="auth-card">
            <button className="close-btn" onClick={closeAuth}>✕</button>
            <h3>{authModal.mode === 'login' ? 'Login' : 'Signup'}</h3>

            {/* Role choice prompt */}
            <div className="role-choice">
              <label>
                <input type="radio" name="role" checked={roleChoice === 'doctor'} onChange={() => setRoleChoice('doctor')} />
                Doctor
              </label>
              <label>
                <input type="radio" name="role" checked={roleChoice === 'patient'} onChange={() => setRoleChoice('patient')} />
                Patient
              </label>
            </div>

            {authModal.mode === 'login' ? (
              <form onSubmit={handleLogin} className="auth-form">
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit" className="primary">Login</button>
                <div className="switch">
                  Don't have an account? <button type="button" onClick={() => setAuthModal({ open: true, mode: 'signup' })}>Signup</button>
                </div>
              </form>
            ) : (
              <div>
                {/* For signup we redirect to routes with forms */}
                <p>Sign up as a <strong>{roleChoice}</strong>.</p>
                <button className="primary" onClick={() => {
                  closeAuth();
                  if (roleChoice === 'doctor') window.location.href = '/doctor/signup';
                  else window.location.href = '/patient/signup';
                }}>
                  Continue to Signup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
