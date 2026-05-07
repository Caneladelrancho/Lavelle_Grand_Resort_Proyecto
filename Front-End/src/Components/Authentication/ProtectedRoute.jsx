import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"


export const ProtectedRoute = ({children}) => {

    const {token} = useAuth()

  //Si no hay token, redirige al login
  //si hay tojen, muestra el contenido que se evolvio en el protectedRoute  
  return token ? children : <Navigate to="/login" replace />
}
