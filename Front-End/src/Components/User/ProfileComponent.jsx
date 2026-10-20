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

        <div className="pfr-nav-container">
          <ul className="pfr-nav-list">
            <li>Historial de reservas</li>
            <li>Proximas reservas</li>
            <li>Mis favoritos</li>
          </ul>
        </div>

        <div className="pfr-img-container">

          <div className="pfr-card-img boat">
            <div className="img-wrapper">
              <img src="/img/boat.jpeg" alt="boat" />
            </div>
          </div>

          <div className="pfr-card-img villa">
            <div className="img-wrapper">
              <img src="/img/villa.jpeg" alt="villa" />
            </div>
          </div>

          <div className="pfr-card-img pool">
            <div className="img-wrapper">
              <img src="/img/pool.jpg" alt="piscina" />
            </div>
          </div>

        </div>        
      </div>
    </div>
  )
}
