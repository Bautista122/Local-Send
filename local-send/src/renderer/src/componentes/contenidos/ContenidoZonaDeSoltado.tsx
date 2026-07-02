import React from 'react'

interface Props {
  estaActivo: boolean
  children: React.ReactNode
}

/**
 * Componente de presentación para la zona de Drag & Drop.
 * Sigue la Regla 1: Nombre con tipo (Contenido) + objetivo [2, 3].
 */
export const ContenidoZonaDeSoltado: React.FC<Props> = ({ estaActivo, children }) => {
  return (
    <div
      style={{
        border: estaActivo ? '2px dashed #4a90e2' : '2px solid transparent',
        backgroundColor: estaActivo ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
        transition: 'all 0.3s ease',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {estaActivo && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '20px',
            color: '#4a90e2',
            pointerEvents: 'none'
          }}
        >
          ¡Suelta los archivos aquí!
        </div>
      )}
      {children}
    </div>
  )
}
