import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Authentication/AuthContext'
import '../../styles/Admin/adminSidebar.css'


export const AdminSidebarComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout() //borra el token
        navigate('/login') //redirige al login
    }

    return (
        <aside className='admin-sidebar'>
            <Link to="/admin" style={{ textDecoration: 'none' }}>
                <div className='hotel-branding'>
                    <h1>Lavelle Grand Resort</h1>
                </div>
            </Link>

            <nav className='admin-navigation'>
                <Link to="/admin/agregar-producto"
                    className={`nav-item ${location.pathname === '/admin/agregar-producto' ? 'active' : ''}`}
                >
                    Agregar producto
                </Link>

                <Link to='/admin/productos'
                    className={`nav-item ${location.pathname === '/admin/productos' ? 'active' : ''}`}
                >
                    Listar productos
                </Link>

                <Link to='/admin/usuarios'
                    className={`nav-item ${location.pathname === '/admin/usuarios' ? 'active' : ''}`}
                >
                    Listar usuarios
                </Link>

                {/*-----AGREGAR MAS NAVEGACION AQUI-----*/}
            </nav>

            <div className='admin-logout'>
                <button className='logout-btn' onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    )

}
