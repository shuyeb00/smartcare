# SmartCare

A full‑stack appointment and healthcare management web application built with **React.js** (frontend), **Express.js** (backend), and **MySQL** (database).

## Objective

SmartCare provides a platform where patients can register, search for doctors, and book appointments, while doctors can manage their schedules and view patient bookings.

## Features

* **User Authentication**: Separate login/signup for patients and doctors.
* **Doctor Search**: Patients can browse and search for doctors based on speciality or name.
* **Appointment Booking**: Patients can request appointments and doctors can manage them.
* **Dashboards**: Dedicated dashboards for doctors and patients.
* **Database Integration**: Persistent storage of users, doctors, and appointments with MySQL.

## Tech Stack

* **Frontend:** React.js, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Development Tools:** `concurrently` (run frontend & backend together), `nodemon` (auto-reload backend), `dotenv` (environment variables)

## How the System Works

The **frontend** is a React single-page application organized into `components` and `Pages` directories. Components such as `Header.jsx`, `DoctorCard.jsx`, and `AppointmentList.jsx` handle reusable UI elements. Pages like `DoctorLogin.jsx`, `PatientSignup.jsx`, `DoctorDashboard.jsx`, and `Home.jsx` define distinct views. React Router manages page navigation, and API calls are made using `fetch` or `axios` to the backend endpoints.

The **backend** is an Express.js server (`server.js`) organized into:

* **config/db.js**: Establishes a MySQL connection using credentials from `.env`.
* **controllers/**: Business logic (e.g., `authController.js` handles login/signup, `doctorController.js` manages doctor data, `appointmentController.js` manages bookings).
* **routes/**: Defines endpoints (e.g., `authRoutes.js`, `doctorRoutes.js`, `appointmentRoutes.js`, `patientRoutes.js`) that map HTTP requests to controller functions.

The **database** uses `database.sql` for schema creation and `seeds.sql` for sample data. MySQL stores persistent data for patients, doctors, and appointments. Controllers send SQL queries through the MySQL connection from `db.js` and return results to the frontend via JSON.

The **package.json** at the project root defines scripts to run everything:

* `npm run install-all` installs dependencies for root, backend, and frontend.
* `npm run backend` runs the backend server with `nodemon` for live reload.
* `npm run frontend` runs the React development server.
* `npm run dev` uses `concurrently` to start both backend and frontend together with color-coded logs.

This setup allows real-time development where React code changes update instantly in the browser, and backend changes reload automatically.

## Video Demo Link

`[VIDEO_LINK_HERE](https://youtu.be/LNi-VNI71gk)`

## Contributors & Contributions

* **Toufiqur Rahman Tasin (231-115-345)** — Made the frontend functional with JavaScript, connected it to the backend using Express.js, implemented authentication, helped design the frontend UI, and contributed to bug fixing across the project.
* **Mahumudur Rashid (231-115-335)** — Worked on the Login, Signup, and Service pages using React.js and CSS, setting up the basic structure and functionality for user interaction.
* **Namira Ahmed Tanha (231-115-323)** — Created the Home, Header, and Contact Us pages, ensuring they were connected within the site flow.
* **Suheb Ahmed (231-115-322)** — Developed and integrated the MySQL database with the backend, ensured it worked with the frontend, and configured the project to run both frontend and backend from a single server setup.
