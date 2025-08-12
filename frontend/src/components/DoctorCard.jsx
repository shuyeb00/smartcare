import React from 'react';
import '../styles/doctor-card.css'; // optional per card styles

const DoctorCard = ({ doctor, onBook, user }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <h4>{doctor.name}</h4>
        <span className="spec">{doctor.specialization}</span>
      </div>
      <p className="desc">{doctor.description || 'No description provided.'}</p>
      <div className="doctor-footer">
        <div className="fee">Fee: ${Number(doctor.fee).toFixed(2)}</div>
        <div>
          {user && user.role === 'patient' ? (
            <button className="btn primary" onClick={() => onBook(doctor)}>Book</button>
          ) : (
            <button className="btn" onClick={() => alert('Please login as patient to book an appointment.')}>Book</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
