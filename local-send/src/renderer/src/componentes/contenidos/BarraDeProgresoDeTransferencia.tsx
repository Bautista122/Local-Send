interface PropiedadesProgreso {
  nombreArchivo: string
  progreso: number
  velocidad: number
  tiempoEstimado: string
}

export function BarraDeProgresoDeTransferencia({
  nombreArchivo,
  progreso,
  velocidad,
  tiempoEstimado
}: PropiedadesProgreso) {
  return (
    <section style={{ padding: '16px', backgroundColor: '#1e1e1e', borderRadius: '8px' }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>Enviando: {nombreArchivo}</h4>
      <div style={{ width: '100%', backgroundColor: '#333', borderRadius: '4px', height: '8px' }}>
        <div
          style={{
            width: `${progreso}%`,
            backgroundColor: '#007acc',
            height: '100%',
            borderRadius: '4px',
            transition: 'width 0.2s ease'
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          fontSize: '12px',
          color: '#aaa'
        }}
      >
        <span>{progreso}% completado</span>
        <span>{velocidad.toFixed(2)} MB/s</span>
        <span>Restante: {tiempoEstimado}</span>
      </div>
    </section>
  )
}
