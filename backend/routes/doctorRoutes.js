import express from 'express';
import { getDoctors } from '../controllers/doctorController.js';

const router = express.Router();

// Get doctors (with optional filters: name, specialization)
router.get('/', getDoctors);

export default router;
