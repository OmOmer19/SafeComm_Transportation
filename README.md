# SafeComm_Transportation 🚍

![React](https://img.shields.io/badge/React-17.0.2-blue)
![Vite](https://img.shields.io/badge/Vite-4.0.0-green)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.2-blueviolet)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)


## Introduction 🛡️
SafeComm is a community-based safety app aimed at improving public transportation. The platform tracks real-time locations of public transit vehicles, allows users to submit safety reports, and provides route safety ratings. It helps commuters make informed decisions based on real-time data and community feedback.

## Project Goal 🎯
The goal of SafeComm is to build a backend system that manages real-time tracking of public transportation, user interactions for safety ratings, and data storage for transit and user safety reports.

## Deployed Links 🌐
- **Frontend:** [🚀 Live Demo](https://safe-comm-transportation.vercel.app)
- **Backend API:** [🔗 API Link](https://safecomm-transportation.onrender.com)

## Folder Structure 📁
SafeComm/
├─ backend/🖥️
│  ├─ server.js
│  ├─ package.json
│  ├─ routes/
│  ├─ controllers/
│  ├─ models/
│  ├─ configs/
│  └─ .env
├─ frontend/🌐
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ tailwind.config.js
│  ├─ src/💻
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  └─ App.jsx
│  └─ public/
└─ README.md 📄

## Minimum Expected Features 🛠️

### User Authentication 🔑
- JWT-based user registration and login system to authenticate users securely.

### Transit Tracking API 🚌
- API to track public transportation vehicles in real time, using data from third-party services such as Google Maps.

### Role-Based Access Control (RBAC)
- Regular users can rate routes and view transit information.
- Admins can manage transit data and monitor safety reports.

### Third-Party Location Integration 🧑‍💻
- Integration with a location API (e.g., Google Maps) to provide live updates on vehicle locations.

### Route Safety Rating Service⭐
- Users can rate the safety of public transit routes to help others make informed travel decisions.

### MongoDB Integration🗄️
- Store user profiles, transit data, route ratings, and reported safety issues in MongoDB.

## Technology Stack 🛠️

- **Frontend:** ⚛️ React.js, ⚡ Vite, 🎨 Tailwind CSS, 🖌️ Ant Design
- **Backend:** 🟢 Node.js, 🚂 Express.js
- **Database:** 🍃 MongoDB, Mongoose
- **Authentication:** 🔑 JWT, 🔒 Bcrypt
- **APIs:** 🌍 Google Maps API
- **Testing:** 🧪 Mocha or Jest


### API Testing 
- Unit and integration tests for all APIs using Mocha or Jest.

  ## API Endpoints📡

### Authentication🔑
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login

### Transit🚌
- `GET /transit/live` – Live transit vehicle locations (user/admin)
- `GET /transit/arrival/:routeName` – Estimated arrival times (user/admin)
- `GET /transit/live-otd` – Live vehicle data (user/admin)

### Reports📝
- `POST /transit/reports` – Submit a safety report (user)
- `GET /transit/reports/user` – Get user-submitted reports (user)
- `GET /transit/reports` – Get all reports (admin)

### Ratings⭐
- `POST /ratings` – Submit route rating (user/admin)
- `GET /ratings/:routeName` – Get average route rating (user/admin)

## Setup & Installation

### Backend

1. Navigate to the backend folder and install dependencies:
```bash
cd SafeComm/backend
npm install 

---
```
2. Create a `.env` file in the `backend` folder with the following content:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
---

```
3. Start the backend server:
```bash
npm run dev
---
```
### Frontend Setup


1. Navigate to the frontend folder and install dependencies:
```bash
cd SafeComm/frontend
npm install
---
```
2. Create a `.env` file in the `frontend` folder with your Google Maps API key:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
---
```
## Usage🖥️

1. Register as a **User** or **Admin**.
2. **User Dashboard:**  
   - View live transit vehicles  
   - Submit safety reports  
   - Rate routes
3. **Admin Dashboard:**  
   - View all reports  
   - Monitor route ratings  
   - Manage transit safety data

### Demo Credentials🔑

**Admin:**  
- Email: admin@example.com  
- Password: admin123

**User:**  
- Email: user@example.com  
- Password: user123
