import React, { useEffect, useState } from 'react';
import { getPatientAppointments } from '../api';
import AppointmentList from '../components/AppointmentList';
import '../styles/dashboard.css';

const PatientDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'patient') return;
    (async () => {
      try {
        const res = await getPatientAppointments(user.id);
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load appointments.');
      }
    })();
  }, [user]);

  if (!user) return <p>Please login to view dashboard.</p>;
  if (user.role !== 'patient') return <p>This dashboard is for patients only.</p>;

  return (
    <div className="container dashboard">
      <h2>My Appointments</h2>
      <AppointmentList appointments={appointments} isDoctorView={false}/>
      
    </div>
  );
};

export default PatientDashboard;
