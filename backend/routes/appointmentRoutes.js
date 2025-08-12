import express from 'express';
import { bookAppointment, getDoctorAppointments, updateAppointmentStatus } from '../controllers/appointmentController.js';

const router = express.Router();

// Book an appointment
router.post('/', bookAppointment);

// Get all appointments for a doctor
router.get('/doctor/:doctor_id', getDoctorAppointments);

// Update appointment status (Accept / Cancel)
router.put('/:id', updateAppointmentStatus);

export default router;
