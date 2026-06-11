interface PropiedadesIndicador {
  estaActivo: boolean
}

export function IndicadorDeDisponibilidad({ estaActivo }: PropiedadesIndicador) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: estaActivo ? '#4CAF50' : '#F44336',
          boxShadow: estaActivo ? '0 0 8px #4CAF50' : '0 0 8px #F44336'
        }}
      />
      <span style={{ fontSize: '14px', color: '#ccc' }}>
        {estaActivo ? 'Servidor Activo (Escuchando)' : 'Servidor Desconectado'}
      </span>
    </div>
  )
}
