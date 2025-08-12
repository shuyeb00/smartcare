import express from 'express';
import { getPatientAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

// Get all appointments for a patient
router.get('/:patient_id/appointments', getPatientAppointments);

export default router;
