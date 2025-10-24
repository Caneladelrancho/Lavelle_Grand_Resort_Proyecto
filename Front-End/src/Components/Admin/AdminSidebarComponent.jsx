import { Link, useLocation } from 'react-router-dom'
import '../../styles/Admin/adminSidebar.css'


export const AdminSidebarComponent = () => {
    const location = useLocation()

    return(
        <aside className='admin-sidebar'>
            <div className='hotel-branding'>
                <h1>Lavelle Grand Resort</h1>
            </div>

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

                {/*-----AGREGAR MAS NAVEGACION AQUI-----*/}
            </nav>

            <div className='admin-logout'>
                <button className='logout-btn' onClick={() => {
                    //manejar la logica del logout-redireccionar al login-clearauthtoken

                    console.log('Cerrando sesion');
                }}>
                    Log out
                </button>
            </div>
        </aside>
    )
  
}
