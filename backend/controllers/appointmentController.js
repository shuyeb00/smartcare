import { db } from '../config/db.js';

export const bookAppointment = async (req, res) => {
    const { doctor_id, patient_id, date, time, fee } = req.body;
    try {
        await db.query(
            'INSERT INTO appointments (doctor_id, patient_id, date, time, fee) VALUES (?, ?, ?, ?, ?)',
            [doctor_id, patient_id, date, time, fee]
        );
        res.json({ message: 'Appointment booked' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPatientAppointments = async (req, res) => {
    const { patient_id } = req.params;
    try {
        const [rows] = await db.query(
  `SELECT a.id, d.name AS doctor_name, d.specialization, 
          DATE_FORMAT(a.date, '%d-%m-%Y') AS date, 
          TIME_FORMAT(a.time, '%H:%i') AS time,
          a.fee, a.status
   FROM appointments a
   JOIN doctors d ON a.doctor_id = d.id
   WHERE a.patient_id = ?`,
  [patient_id]
);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getDoctorAppointments = async (req, res) => {
    const { doctor_id } = req.params;
    try {
        const [rows] = await db.query(
            `SELECT a.id, p.name AS patient_name, 
             DATE_FORMAT(a.date, '%d-%m-%Y') AS date, 
            TIME_FORMAT(a.time, '%H:%i') AS time, 
             a.fee, a.status 
             FROM appointments a
             JOIN patients p ON a.patient_id = p.id
             WHERE a.doctor_id = ?`,
            [doctor_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
