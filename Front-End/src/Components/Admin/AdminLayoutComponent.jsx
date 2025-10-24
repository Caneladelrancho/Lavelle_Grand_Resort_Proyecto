import { AdminHeaderComponent } from "./AdminHeaderComponent";
import { AdminSidebarComponent } from "./AdminSidebarComponent";
import { AddProductComponent } from "./AddProductComponent";
import { Routes, Route } from "react-router-dom";
import '../../styles/Admin/adminLayout.css'
import { useEffect } from "react";


export const AdminLayoutComponent = ({ children, adminName }) => {

  useEffect(() => {
    document.body.classList.add('admin-page');

    return () => {
      document.body.classList.remove('admin-page');
    }
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebarComponent />

      <div className="admin-content-wrapper">
        <AdminHeaderComponent adminName={adminName} />

        <main className="admin-content">
          <Routes>
            <Route path="agregar-producto" element={<AddProductComponent/>}/>
            <Route path="productos" element={<div>Aquí irá la lista de productos</div>} />
            <Route path="" element={<div>Bienvenido al panel de admin</div>} />
          </Routes>
        </main>
      </div>
    </div>

  )
}
