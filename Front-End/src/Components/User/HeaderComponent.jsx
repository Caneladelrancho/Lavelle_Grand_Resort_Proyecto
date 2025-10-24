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

                    <Link to="/" onClick={handleLinkClick} >
                        <h1 className='title'>Lavelle Grand Resort</h1>
                    </Link>

                    <div className={`nav-buttons-container ${mobileMenuOpen ? "menu-open" : ""}`}>
                        <ul className='header-buttons'>

                            <Link
                                to="/login"
                                className='user-buttons' 
                                onClick={handleLinkClick}                                
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className='user-buttons' 
                                onClick={handleLinkClick}                                
                            >
                                Sign up                            
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
