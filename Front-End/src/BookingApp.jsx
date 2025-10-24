import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HeaderComponent } from "./Components/User/HeaderComponent"
import { MainComponent } from "./Components/User/MainComponent";
 import { AdminLayoutComponent } from "./Components/Admin/AdminLayoutComponent";

export const BookingApp = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      { }
      {!isAdminRoute  && <HeaderComponent />}

      <Routes>
        {/*Rutas de usuario*/}
        <Route path="/" element={<MainComponent />} />


        {/*Rutas de Administrador*/}
        <Route path="/admin/*" element={<AdminLayoutComponent />} />



        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
