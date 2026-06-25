// local-send/src/renderer/src/componentes/contenidos/TarjetaParaDispositivoEnEspera.tsx
import React from 'react'

interface Props {
  nombre: string
  ip: string
  onRechazar: () => void
  onAceptar: () => void
}

export function TarjetaParaDispositivoEnEspera({ nombre, ip, onRechazar, onAceptar }: Props) {
  return (
    <div style={estilos.tarjetaDispositivo}>
      <div>
        <span style={estilos.nombreTexto}>{nombre}</span>
        <span style={estilos.metaTexto}>IP Destino: {ip}</span>
      </div>
      <div style={estilos.contenedorAcciones}>
        <button onClick={onRechazar} style={{ ...estilos.boton, ...estilos.botonRechazar }}>
          Cancelar
        </button>
        <button onClick={onAceptar} style={{ ...estilos.boton, ...estilos.botonAceptar }}>
          Confirmar Envío
        </button>
      </div>
    </div>
  )
}

const estilos: Record<string, React.CSSProperties> = {
  tarjetaDispositivo: {
    backgroundColor: '#1c1c22',
    border: '1px solid #252530',
    borderRadius: '6px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nombreTexto: { fontSize: '13px', fontWeight: 600, color: '#e4e4e7', display: 'block' },
  metaTexto: { fontSize: '11px', color: '#71717a', display: 'block' },
  contenedorAcciones: { display: 'flex', gap: '8px' },
  boton: {
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600
  },
  botonAceptar: { backgroundColor: '#00adb5', color: '#fff' },
  botonRechazar: { backgroundColor: '#22222b', color: '#ef5350', border: '1px solid #2d2d38' }
}
