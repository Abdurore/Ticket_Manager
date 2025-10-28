import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('ticketapp_session')
  if (!token) {
    return <Navigate to="/auth/login" />
  }
  return children
}

export default ProtectedRoute