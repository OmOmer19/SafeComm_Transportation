SafeComm 🚍 – Community-Based Public Transit Safety App
Introduction

SafeComm is a full-stack web application designed to improve public transportation safety. Users can view live transit vehicle locations, submit safety reports, rate routes, and admins can monitor and manage transit safety data in real time. The app provides an intuitive interface for both regular users and admins.

Project Type

Full-stack Web Application

Deployed App

Backend: [Add your deployed backend URL here]

Frontend: [Add your deployed frontend URL here]

Directory Structure
SafeComm/
├─ backend/
│  ├─ server.js
│  ├─ package.json
│  ├─ routes/
│  ├─ controllers/
│  ├─ models/
│  ├─ configs/
│  └─ .env
├─ frontend/
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ tailwind.config.js
│  ├─ src/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  └─ App.jsx
│  └─ public/
└─ README.md

Features

Real-time tracking of public transit vehicles using Google Maps

Role-based authentication (User/Admin)

Users can submit safety reports and rate routes

Admins can view all reports and monitor route safety

JWT-based authentication & secure password hashing

Responsive UI built with React, Tailwind CSS, and Ant Design

Technology Stack

Frontend: React.js, Vite, Tailwind CSS, Ant Design

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT, Bcrypt

APIs: Google Maps API

API Endpoints

Authentication:

POST /auth/register – Register new user

POST /auth/login – Login

Transit:

GET /transit/live – Live transit vehicles (user/admin)

GET /transit/arrival/:routeName – Estimated arrival (user/admin)

GET /transit/live-otd – Live vehicle data (user/admin)

Reports:

POST /transit/reports – Submit safety report (user)

GET /transit/reports/user – User reports (user)

GET /transit/reports – All reports (admin)

Ratings:

POST /ratings – Submit route rating (user/admin)

GET /ratings/:routeName – Get average route rating (user/admin)

Setup & Installation
Backend
cd SafeComm/backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start server:

npm run dev


Runs on http://localhost:5000

Frontend
cd SafeComm/frontend
npm install


Create a .env file:

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key


Start frontend:

npm run dev


Runs on http://localhost:5173

Usage

Register as a User or Admin

User Dashboard: View live vehicles, submit reports, rate routes

Admin Dashboard: View all reports, monitor ratings, manage transit safety data

Demo Credentials

Admin:

Email: admin@example.com

Password: admin123

User:

Email: user@example.com

Password: user123