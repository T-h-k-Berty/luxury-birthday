import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // <-- මේ පේළිය අනිවාර්යයෙන්ම තියෙන්න ඕනි!
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)