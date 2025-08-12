import React, { useEffect, useState } from 'react';
import { getDoctorAppointments, updateAppointmentStatus } from '../api';
import AppointmentList from '../components/AppointmentList';
import '../styles/dashboard.css';

const DoctorDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'doctor') return;
    (async () => {
      try {
        const res = await getDoctorAppointments(user.id);
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load appointments.');
      }
    })();
  }, [user]);

  const accept = async (id) => {
    try {
      await updateAppointmentStatus(id, 'Accepted');
      setAppointments(a => a.map(ap => ap.id === id ? { ...ap, status: 'Accepted' } : ap));
    } catch (err) {
      console.error(err);
      alert('Failed to accept.');
    }
  };

  const remove = async (id) => {
    try {
      await updateAppointmentStatus(id, 'Cancelled');
      setAppointments(a => a.filter(ap => ap.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to remove.');
    }
  };

  if (!user) return <p>Please login to view dashboard.</p>;
  if (user.role !== 'doctor') return <p>This dashboard is for doctors only.</p>;

  return (
    <div className="container dashboard">
      <h2>Appointment Requests</h2>
      <AppointmentList appointments={appointments} onAccept={accept} onRemove={remove} isDoctorView={true} />
    </div>
  );
};

export default DoctorDashboard;
