import React from 'react'

interface Props {
  mensaje: string
  tipo: 'exito' | 'error' | 'info'
  alCerrar: () => void
}

/**
 * Componente de presentación para alertas.
 * Sigue la Regla 1: Nombre con significado (Contenido + Objetivo).
 */
export const ContenidoAlertaTransferencia: React.FC<Props> = ({ mensaje, tipo, alCerrar }) => {
  const colores = {
    exito: '#e8f5e9',
    error: '#ffebee',
    info: '#e3f2fd'
  }

  return (
    <div
      style={{
        padding: '12px 20px',
        backgroundColor: colores[tipo],
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '300px'
      }}
    >
      <span style={{ fontSize: '14px', color: '#333' }}>{mensaje}</span>
      <button
        onClick={alCerrar}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
      >
        ×
      </button>
    </div>
  )
}
