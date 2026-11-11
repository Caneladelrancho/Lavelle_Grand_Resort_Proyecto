import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { replace } from "react-router-dom"


export const ProtectedRoute = ({children, requiredRole}) => {

    const {token, user} = useAuth()
 
  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to= "/" replace />    
  }

  return children
}
