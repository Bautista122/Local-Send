// local-send/src/renderer/src/componentes/contenidos/TarjetaParaArchivoDeCola.tsx
import React from 'react'

interface Props {
  nombre: string
  tamanio: string
  onEliminar: () => void
}

export function TarjetaParaArchivoDeCola({ nombre, tamanio, onEliminar }: Props) {
  return (
    <div style={estilos.filaItem}>
      <div>
        <span style={estilos.nombreTexto}>{nombre}</span>
        <span style={estilos.metaTexto}>{tamanio}</span>
      </div>
      <button onClick={onEliminar} style={estilos.botonEliminar}>
        🗑️
      </button>
    </div>
  )
}

const estilos: Record<string, React.CSSProperties> = {
  filaItem: {
    backgroundColor: '#1c1c22',
    border: '1px solid #252530',
    borderRadius: '6px',
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nombreTexto: { fontSize: '13px', fontWeight: 600, color: '#e4e4e7', display: 'block' },
  metaTexto: { fontSize: '11px', color: '#71717a', display: 'block' },
  botonEliminar: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12px' }
}
