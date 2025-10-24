import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { BookingApp } from './BookingApp'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <BookingApp />
    </StrictMode>,
  </BrowserRouter>
)
