import { InterfazDispositivo } from '../../hooks/useDescubrimiento'

interface PropiedadesTarjeta {
  dispositivo: InterfazDispositivo
  pieDeTarjeta: React.ReactNode
}

export function TarjetaDeDispositivoRemoto({ dispositivo, pieDeTarjeta }: PropiedadesTarjeta) {
  const obtenerIconoVisual = (tipoDispositivo: string) => {
    if (tipoDispositivo === 'celular') return '📱'
    if (tipoDispositivo === 'laptop') return '💻'
    return '🖥️'
  }

  return (
    <article
      style={{
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#2a2a2a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #3a3a3a'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '24px' }}>{obtenerIconoVisual(dispositivo.tipo)}</span>
        <div>
          <h3 style={{ margin: 0, color: '#fff' }}>{dispositivo.alias}</h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{dispositivo.direccionIp}</p>
        </div>
      </div>
      <div>{pieDeTarjeta}</div>
    </article>
  )
}
