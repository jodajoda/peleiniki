import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import AppRedesign from './AppRedesign.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRedesign />
  </StrictMode>,
)
