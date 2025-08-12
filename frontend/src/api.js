import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('smartcare_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authSignup = (data) => client.post('/auth/signup', data);
export const authLogin = (data) => client.post('/auth/login', data);

export const getDoctors = (params) => client.get('/doctors', { params });
export const doctorSignup = (data) => client.post('/auth/signup', data); // role doctor

export const bookAppointment = (data) => client.post('/appointments', data);
export const getPatientAppointments = (patient_id) => client.get(`/patients/${patient_id}/appointments`);
export const getDoctorAppointments = (doctor_id) => client.get(`/appointments/doctor/${doctor_id}`);
export const updateAppointmentStatus = (id, status) => client.put(`/appointments/${id}`, { status });

export default client;
