import React, { useEffect, useState } from 'react';
import { getDoctors, bookAppointment } from '../api';
import DoctorCard from '../components/DoctorCard';
import '../styles/doctor-search.css';

const DoctorSearch = ({ user }) => {
  const [filters, setFilters] = useState({ name: '', specialization: '' });
  const [doctors, setDoctors] = useState([]);
  const [booking, setBooking] = useState({ doctor: null, date: '', time: '' });

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors(filters);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load doctors.');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []); // initial

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchDoctors();
  };

  const openBookModal = (doctor) => {
    setBooking({ doctor, date: '', time: '' });
    const modal = document.getElementById('bookModal');
    if (modal) modal.style.display = 'block';
  };

  const closeBookModal = () => {
    setBooking({ doctor: null, date: '', time: '' });
    const modal = document.getElementById('bookModal');
    if (modal) modal.style.display = 'none';
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'patient') {
      alert('You must be logged in as a patient to book an appointment.');
      return;
    }
    try {
      await bookAppointment({
        doctor_id: booking.doctor.id,
        patient_id: user.id,
        date: booking.date,
        time: booking.time,
        fee: booking.doctor.fee
      });
      alert('Appointment requested.');
      closeBookModal();
    } catch (err) {
      console.error(err);
      alert('Booking failed.');
    }
  };

  return (
    <div className="container doctor-search">
      <h2>Find a Doctor</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input placeholder="Name" value={filters.name} onChange={e => setFilters(f => ({...f, name: e.target.value}))} />
        <input placeholder="Specialization" value={filters.specialization} onChange={e => setFilters(f => ({...f, specialization: e.target.value}))} />
        <button className="btn">Search</button>
      </form>

      <div className="doctors-grid">
        {doctors.map(d => (
          <DoctorCard key={d.id} doctor={d} user={user} onBook={openBookModal} />
        ))}
      </div>

      {/* Booking modal */}
      <div id="bookModal" className="modal">
        <div className="modal-content">
          <button className="close-btn" onClick={closeBookModal}>✕</button>
          {booking.doctor && (
            <>
              <h3>Book with Dr. {booking.doctor.name}</h3>
              <form onSubmit={handleBook}>
                <label>Date</label>
                <input type="date" value={booking.date} onChange={e => setBooking(b => ({...b, date: e.target.value}))} required />
                <label>Time</label>
                <input type="time" value={booking.time} onChange={e => setBooking(b => ({...b, time: e.target.value}))} required />
                <div>Fee: ${Number(booking.doctor.fee).toFixed(2)}</div>
                <button className="btn primary" type="submit">Request Appointment</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
