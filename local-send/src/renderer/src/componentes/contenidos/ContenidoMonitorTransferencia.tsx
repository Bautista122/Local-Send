import React from 'react'

interface Props {
  porcentaje: number
  velocidad: number
  tiempo: number
}

/**
 * Vista de progreso detallada.
 * Sigue la Regla 1: Nombre con prefijo 'Contenido' + objetivo.
 */
export const ContenidoMonitorTransferencia: React.FC<Props> = ({
  porcentaje,
  velocidad,
  tiempo
}) => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop: '10px',
        border: '1px solid #ddd'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontWeight: 'bold' }}>Transfiriendo archivo...</span>
        <span>{porcentaje}%</span>
      </div>

      {/* Barra de progreso real */}
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#eee',
          borderRadius: '5px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${porcentaje}%`,
            height: '100%',
            backgroundColor: '#4a90e2',
            transition: 'width 0.2s ease'
          }}
        />
      </div>

      <div
        style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '13px', color: '#666' }}
      >
        <span>
          Velocidad: <strong>{velocidad.toFixed(2)} MB/s</strong>
        </span>
        <span>
          Tiempo estimado: <strong>{tiempo}s</strong>
        </span>
      </div>
    </div>
  )
}
