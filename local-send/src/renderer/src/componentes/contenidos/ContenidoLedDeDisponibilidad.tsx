import React from 'react'

interface Props {
  activo: boolean
}

/**
 * Componente de presentación pura para el LED.
 * Sigue la Regla 1: Nombres con significado (Prefijo Contenido + Objetivo) [4, 5].
 */
export const ContenidoLedDeDisponibilidad: React.FC<Props> = ({ activo }) => {
  const colorLed = activo ? '#4caf50' : '#f44336' // Verde o Rojo
  const texto = activo ? 'Servidor Activo' : 'Servidor Inactivo'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: colorLed,
          boxShadow: `0 0 8px ${colorLed}`,
          transition: 'all 0.3s ease'
        }}
      />
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{texto}</span>
    </div>
  )
}
