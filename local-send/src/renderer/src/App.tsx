// local-send/src/renderer/src/App.tsx
import { useState, useEffect } from 'react'

interface Dispositivo {
  id: string
  nombre: string
  tipo: string
  ip: string
}

export default function App() {
  const [miIp, setMiIp] = useState<string>('Buscando IP...')
  const [solicitudes, setSolicitudes] = useState<Dispositivo[]>([])

  useEffect(() => {
    // 1. Pedir la IP local al backend de Electron nativo al arrancar
    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.invoke('obtener-ip-local').then((ip: string) => {
        setMiIp(ip || '127.0.0.1')
      })

      // 2. Escuchar si entra una petición de conexión desde el celular
      const removerEscuchador = window.electron.ipcRenderer.on(
        'peticion-transferencia',
        (_evento, datos: Dispositivo) => {
          setSolicitudes((prev) => {
            if (prev.some((d) => d.id === datos.id)) return prev
            return [...prev, datos]
          })
        }
      )

      return () => {
        if (removerEscuchador) removerEscuchador()
      }
    }
  }, [])

  const responderSolicitud = (id: string, aceptar: boolean) => {
    // Avisar al backend si aceptamos o no al celular
    window.electron?.ipcRenderer.send('responder-transferencia', { id, aceptar })
    // Sacar al dispositivo de la lista visual
    setSolicitudes((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#121212',
        color: '#fff',
        minHeight: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px'
      }}
    >
      <h1 style={{ margin: '0 0 5px 0' }}>LocalSend Desktop</h1>
      <p style={{ color: '#aaa', margin: '0 0 25px 0' }}>Panel del Servidor</p>

      {/* Tarjeta informativa de tu IP */}
      <div
        style={{
          background: '#1e1e1e',
          padding: '15px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '450px',
          border: '1px solid #333',
          marginBottom: '25px'
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#4caf50' }}>🌐 Estado de Red</h3>
        <p style={{ margin: '5px 0' }}>
          <strong>Tu IP Local:</strong>{' '}
          <code
            style={{
              background: '#333',
              padding: '2px 6px',
              borderRadius: '4px',
              color: '#61dafb'
            }}
          >
            {miIp}
          </code>
        </p>
        <p style={{ margin: '5px 0', fontSize: '13px', color: '#888' }}>
          Escuchando transmisiones en el aula...
        </p>
      </div>

      {/* Listado interactivo de conexiones */}
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '8px', margin: '0 0 15px 0' }}>
          📥 Solicitudes de Conexión ({solicitudes.length})
        </h3>

        {solicitudes.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '10px' }}>
            No hay dispositivos intentando conectar...
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {solicitudes.map((disp) => (
              <div
                key={disp.id}
                style={{
                  background: '#222',
                  padding: '12px',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: '4px solid #2196f3'
                }}
              >
                <div>
                  <strong style={{ display: 'block' }}>{disp.nombre}</strong>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>
                    {disp.tipo} • IP: {disp.ip}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => responderSolicitud(disp.id, true)}
                    style={{
                      background: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => responderSolicitud(disp.id, false)}
                    style={{
                      background: '#f44336',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
