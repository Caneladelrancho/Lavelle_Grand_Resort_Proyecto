import '../../styles/User/footer.css';


export const FooterComponent = () => {

  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className='footer-container'>

        <div className='section-one-ftr'>
          <div className='footer-logo'>
            <img
              src="/img/logo_lavelle.png"
              alt="Lavelle Grand Resort"
              className='logo-img'
            />

            <img
              src="/img/logo_lavelle_blue.png"
              alt="Lavelle Grand Resort"
              className='logo-img-blue'
            />
          </div>

          <div>
            <ul className='ftr-list'>
              <li>Acerca de Lavelle Grand Resort</li>
              <li>Preguntas frecuentes</li>
              <li>Carreras</li>
              <li>Desarrollo hotelero</li>
              <li>Política de privacidad</li>
            </ul>
          </div>
        </div>

        <div className='section-two-ftr'>
          <div className='footer-contact'>
            <h3>Mantengámonos en contacto</h3>
            <button className='btn-contact'>Inscripción</button>
          </div>

          <div className='footer-social'>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tiktok"
            >
              <i className="fab fa-tiktok"></i>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p className='copyright'>
          &copy; {currentYear} Lavelle Grand Resort.
        </p>
      </div>
    </footer>
  )
}


