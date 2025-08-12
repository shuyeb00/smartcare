import React from 'react';

const AppointmentList = ({ appointments, onAccept, onRemove, isDoctorView }) => {
  if (!appointments || appointments.length === 0) return <p>No appointments.</p>;
  return (
    <div className="appointments">
      {appointments.map(a => (
        <div key={a.id} className="appointment-card">
          <div>
            <strong>{isDoctorView ? a.patient_name : a.doctor_name}</strong>
            <div>{isDoctorView ? '' : a.specialization}</div>
            <br />
            <div> Appoinment Date: {a.date} <br />Time: {a.time}</div>
            <div>Fee: ${Number(a.fee).toFixed(2)}</div>
            <div>Status: {a.status}</div>
          </div>
          {isDoctorView && (
            <div className="actions">
              {a.status === 'Pending' && <button className="btn primary" onClick={() => onAccept(a.id)}>Accept</button>}
              <button className="btn" onClick={() => onRemove(a.id)}>Remove</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
