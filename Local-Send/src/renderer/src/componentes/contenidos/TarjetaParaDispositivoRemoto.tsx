type Dispositivo = {
  id: string
  alias: string
  ip: string
  deviceType: 'mobile' | 'desktop'
}

type PropsTarjeta = {
  dispositivo: Dispositivo
}

export function TarjetaParaDispositivoRemoto({ dispositivo }: PropsTarjeta) {
  const iconoDeDispositivo = dispositivo.deviceType === 'mobile' ? '📱' : '💻'

  return (
    <li
      style={{
        listStyle: 'none',
        padding: '12px',
        marginBottom: '8px',
        backgroundColor: '#2a2d3d',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid #3f445b'
      }}
    >
      <span style={{ fontSize: '24px' }}>{iconoDeDispositivo}</span>
      <div>
        <strong style={{ display: 'block', color: '#f3f4f6' }}>{dispositivo.alias}</strong>
        <small style={{ color: '#9ca3af' }}>IP: {dispositivo.ip}</small>
      </div>
    </li>
  )
}
