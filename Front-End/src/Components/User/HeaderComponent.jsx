import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/User/header.css'

export const HeaderComponent = () => {

    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const handleLinkClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <div>          
            
            <header className={`header ${scrolled ? "scrolled" : ""}`}>
                <nav className='nav-menu'>

                    <Link to="/" onClick={handleLinkClick} className='header-logo'>
                        <img className='img-header' src="/img/logo_lavelle_blue.png" alt="logo" />
                        <img className='img-header-ligth' src="/img/logo_lavelle.png" alt="logo" />

                        <h1 className='header-title'>Lavelle Grand Resort</h1>
                    </Link>

                    <div className={`nav-buttons-container ${mobileMenuOpen ? "menu-open" : ""}`}>
                        <ul className='header-buttons'>

                            <Link
                                to="/register"
                                className='user-buttons' 
                                onClick={handleLinkClick}                                
                            >
                                Crear cuenta
                            </Link>

                            <Link
                                to="/login"
                                className='user-buttons' 
                                onClick={handleLinkClick}                                
                            >
                                Iniciar sesión                            
                            </Link>
                        </ul>
                    </div>

                    <div className='hamburger-menu' onClick={toggleMobileMenu}>
                        <img src='/img/hambur-menu.png' alt="Menu" className='menu-icon' />
                    </div>

                </nav>
            </header>
        </div>
    )
}
