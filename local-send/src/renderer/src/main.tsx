import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Importamos los estilos globales si existen
import './assets/main.css'

/**
 * Punto de entrada real al DOM.
 * Sigue la Regla 8: Tipado y prevención de errores.
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
