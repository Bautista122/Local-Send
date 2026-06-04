import React from 'react'

interface PropiedadesContenedor {
  titulo: string
  children: React.ReactNode
}

export function ContenedorDeDispositivosDisponibles({ titulo, children }: PropiedadesContenedor) {
  // Simulamos que el servidor nativo está escuchando el puerto UDP
  const servidorActivo = true 

  return (
    <fieldset style={estilos.caja}>
      <legend style={estilos.leyenda}>
        <div style={estilos.flexEncabezado}>
          <span style={estilos.titulo}>{titulo}</span>
          <div style={estilos.contenedorLed}>
            <span style={{
              ...estilos.led,
              backgroundColor: servidorActivo ? '#42b883' : '#ff4a4a'
            }} />
            <span style={estilos.textoLed}>
              {servidorActivo ? 'Servidor UDP Activo' : 'Servidor Inactivo'}
            </span>
          </div>
        </div>
      </legend>
      <div style={{ marginTop: '10px' }}>
        {children}
      </div>
    </fieldset>
  )
}

const estilos = {
  caja: {
    border: '2px solid #007acc',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    marginBottom: '20px'
  },
  leyenda: {
    padding: '0 10px',
    color: '#007acc',
    fontWeight: 'bold' as const
  },
  flexEncabezado: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  titulo: {
    fontSize: '16px'
  },
  contenedorLed: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#2d2d2d',
    padding: '4px 8px',
    borderRadius: '20px'
  },
  led: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'inline-block',
    boxShadow: '0 0 6px rgba(0,0,0,0.5)'
  },
  textoLed: {
    fontSize: '11px',
    color: '#ccc',
    fontWeight: 'normal' as const
  }
}