import React from 'react'

interface Props {
  alias: string
  tipo: 'PC' | 'Smartphone' | 'Laptop'
  ip?: string
  alHacerClick: () => void
}

/**
 * Presentación de un dispositivo individual en la red.
 * Sigue la Regla 6: Nivel de abstracción de composición [5].
 */
export const ContenidoTarjetaDispositivo: React.FC<Props> = ({ alias, tipo, ip, alHacerClick }) => {
  return (
    <div
      onClick={alHacerClick}
      style={{
        padding: '15px',
        border: '1px solid #eee',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ fontSize: '24px' }}>
        {tipo === 'PC' ? '🖥️' : tipo === 'Laptop' ? '💻' : '📱'}
      </div>
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>{alias}</div>
        {ip && <div style={{ fontSize: '12px', color: '#888' }}>{ip}</div>}
      </div>
    </div>
  )
}
