import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HeaderComponent } from "./Components/User/HeaderComponent"
import { MainComponent } from "./Components/User/MainComponent";
import { AdminLayoutComponent } from "./Components/Admin/AdminLayoutComponent";
import { ProductDetailComponent } from "./Components/User/ProductDetailComponent";
import { FooterComponent } from "./Components/User/FooterComponent";
import { LoginComponent } from "./Components/Authentication/LoginComponent";
import { ProtectedRoute } from "./Components/Authentication/ProtectedRoute";
import { RegisterComponent } from "./Components/Authentication/RegisterComponent";

export const BookingApp = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login'
  const isHomePage = location.pathname === '/'

  return (
    <>
      { }
      {!isAdminRoute && isHomePage && <HeaderComponent />}

      <Routes>
        {/*Rutas de usuario*/}
        <Route path="/" element={<MainComponent />} />
        <Route path="/product/:type/:id" element={<ProductDetailComponent />} />



        {/*Rutas de Administrador*/}
        <Route path="/admin/*" element={
          <ProtectedRoute>
          <AdminLayoutComponent />
          </ProtectedRoute>
        }
        />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        


        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/*Footer*/}
      {!isAdminRoute && <FooterComponent />}
    </>
  )
}
