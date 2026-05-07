import { AdminHeaderComponent } from "./AdminHeaderComponent";
import { AdminSidebarComponent } from "./AdminSidebarComponent";
import { AddProductComponent } from "./AddProductComponent";
import { Routes, Route } from "react-router-dom";
import '../../styles/Admin/adminLayout.css'
import { useEffect, useState } from "react";
import { ProductListComponent } from "./ProductListComponent";


export const AdminLayoutComponent = ({ children, adminName }) => {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    document.body.classList.add('admin-page');

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      document.body.classList.remove('admin-page');
      window.removeEventListener('resize', checkScreenSize)
    }
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-warning">
        <div className="mobile-warning-content">
          <h2>Panel no disponible</h2>
          <p>El panel de administración no está disponible en dispositivos móviles. Por favor, accede desde un computador.</p>
          <img src="/img/Computer.png" alt="computer logo" />
        </div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <AdminSidebarComponent />

      <div className="admin-content-wrapper">
        <AdminHeaderComponent adminName={adminName} />

        <main className="admin-content">
          <Routes>
            <Route path="agregar-producto" element={<AddProductComponent />} />
            <Route path="productos" element={<ProductListComponent />} />
            <Route path="" element={
              <div className="welcome-container">
                <div className="welcome-overlay">
                  <h2>El lujo comienza en los detalles. Bienvenido al centro de operaciones de Lavelle Grand Resort.</h2>
                  <p>Desde aquí nace la excelencia. Gestiona, controla y eleva cada aspecto del resort.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>

  )
}
