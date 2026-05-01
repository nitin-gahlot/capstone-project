import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './index.css'

// Pehle hi theme set karo
const savedTheme = localStorage.getItem('streamify_darkmode')
document.documentElement.setAttribute(
  'data-theme',
  savedTheme === 'false' ? 'light' : 'dark'
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)