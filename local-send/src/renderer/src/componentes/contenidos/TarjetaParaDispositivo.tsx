import React from 'react'

interface PropiedadesTarjeta {
  nombre: string
  tipo: string
  direccionIp: string
  botonDeAccion: React.ReactNode
}

export function TarjetaParaDispositivo({
  nombre,
  tipo,
  direccionIp,
  botonDeAccion
}: PropiedadesTarjeta) {
  // Selector dinámico de íconos representativos
  const obtenerIcono = (tipoDispositivo: string) => {
    const t = tipoDispositivo.toUpperCase()
    if (t === 'PC' || t === 'DESKTOP') return '💻'
    if (t === 'LAPTOP' || t === 'NOTEBOOK') return '📟'
    return '📱'
  }

  return (
    <div style={estilos.tarjeta}>
      <div style={estilos.infoSeccion}>
        <span style={estilos.icono}>{obtenerIcono(tipo)}</span>
        <div>
          <div style={estilos.nombre}>{nombre}</div>
          <div style={estilos.subtitulo}>IP Local: {direccionIp}</div>
        </div>
      </div>
      <div>{botonDeAccion}</div>
    </div>
  )
}

const estilos = {
  tarjeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#252526',
    border: '1px solid #3c3c3c',
    borderRadius: '6px',
    marginBottom: '8px'
  },
  infoSeccion: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  icono: {
    fontSize: '22px'
  },
  nombre: {
    fontWeight: 'bold' as const,
    color: '#e0e0e0',
    fontSize: '14px'
  },
  subtitulo: {
    fontSize: '12px',
    color: '#858585',
    marginTop: '2px'
  }
}
