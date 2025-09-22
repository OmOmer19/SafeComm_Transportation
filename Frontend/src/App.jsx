import React,{useContext} from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import './App.css'
import Register from './pages/RegisterPage'
import Login from './pages/LoginPage'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'


//creating private route component for protecting pages
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext)
  // redirecting to login if not logged in
  return token ? children : <Navigate to="/login" />
}

function App() {

  return (
    <Routes>

      {/*default to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path='/register' element={<Register/>} />

      <Route path='/login' element={<Login/>} />

      {/*protected routes */}

      <Route path='/user-dashboard' element={
        <PrivateRoute>
          <UserDashboard/>
        </PrivateRoute>} />
      
      <Route path='/admin-dashboard' element={
        <PrivateRoute>
          <AdminDashboard/>
        </PrivateRoute>} />

        {/* for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
