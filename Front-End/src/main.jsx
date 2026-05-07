import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { BookingApp } from './BookingApp'
import { AuthProvider } from './Components/Authentication/AuthContext'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <StrictMode>
        <BookingApp/>
      </StrictMode>
    </BrowserRouter>
  </AuthProvider>
)
