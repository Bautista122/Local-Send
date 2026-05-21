type PropsIndicador = {
  estado: string
}

export function IndicadorDeEstadoServidor({ estado }: PropsIndicador) {
  const estaActivo = estado === 'online'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: estaActivo ? '#22c55e' : '#ef4444',
          display: 'inline-block',
          boxShadow: estaActivo ? '0 0 8px #22c55e' : '0 0 8px #ef4444'
        }}
      />
      <p style={{ margin: 0, fontWeight: 'bold' }}>
        Servidor de Escucha:{' '}
        <span style={{ color: estaActivo ? '#22c55e' : '#ef4444' }}>{estado.toUpperCase()}</span>
      </p>
    </div>
  )
}
