import { useContext } from "react"
import { useAuth } from "../Authentication/AuthContext"
import '../../styles/User/profile.css'
import { useNavigate } from "react-router-dom"


const getInitials = (name, lastName) => {
  const first = name?.charAt(0) ?? ""
  const last = lastName?.charAt(0) ?? ""
  return (first + last).toUpperCase()
}

export const ProfileComponent = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout() //borra el token
    navigate('/') //redirige al login
  }


  return (
    <div className="profile-container">
      <div className="profile-banner">
        <h2 className="banner-title">Bienvenido a Lavelle One</h2>
      </div>

      <div className="pfr-content-container">
        <div className="profile-header">
          <div className="avatar">
            {getInitials(user?.name, user?.lastName)}
          </div>          

          <div className="user-info">
            <h2 className="user-name">
              {user?.name} {user?.lastName}
            </h2>
          </div>
        </div>
        <button className="pfr-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>

        <div className="cards-section">
          {/*Tarjeta izquierda*/}
          <div className="info-card">
            <h3 className="card-title">Puntos Lavelle</h3>
            <p className="card-text">0</p>
            <p className="card-text">Puntos disponibles</p>
          </div>

          {/*Tarjeta de la mitad*/}
          <div className="info-card">
            <h3 className="card-title">Tu próxima reserva</h3>
            <p className="card-text">Aún no tienes reservas próximas</p>
          </div>

          {/*Tarjeta derecha*/}
          <div className="info-card-right">
            <button className="action-buttons">
              Favoritos
            </button>
            <button className="action-buttons">
              Mis reservas
            </button>
          </div>
        </div>

        <div className="rewards">
          <h3 className="rws-title"> Mis recompensas</h3>
        </div>
      </div>
    </div>
  )
}
