import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './responsive.css';
import App from './App.jsx'

console.log(
  "%cOnly%cLinks%c\n- By SIDDHESHUMESHSARANG",
  "color: white; background: #121212; font-size: 3rem; padding: 10px 0 10px 20px; font-family: 'Poppins', sans-serif; font-weight: bold;  margin-top: 10px; border: 2px solid #000; border-right: none;",
  "color: #c0c0c0; background: #121212; font-size: 3rem; padding: 10px 20px 10px 0; font-family: 'Poppins', sans-serif; font-weight: bold; border: 2px solid #000; border-left: none; margin-top: 10px",
  "color: #c0c0c0; background: transparent; font-size: 10px; font-family: 'Poppins', sans-serif; font-weight: normal; border: none; border-radius: 5px; margin-top: 10px; margin-left: 2px;"
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
