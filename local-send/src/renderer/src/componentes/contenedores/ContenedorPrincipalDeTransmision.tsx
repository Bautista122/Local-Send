import React from 'react'
import { TarjetaParaArchivoDeCola } from '../contenidos/TarjetaParaArchivoDeCola'
import { TarjetaParaDispositivoEnEspera } from '../contenidos/TarjetaParaDispositivoEnEspera'
import { BarraDeProgresoParaSubida } from '../contenidos/BarraDeProgresoParaSubida'

interface Dispositivo {
  id: string
  nombre: string
  ip: string
}
interface Archivo {
  id: string
  nombre: string
  tamanio: string
}

interface Props {
  miIp: string
  archivos: Archivo[]
  solicitudes: Dispositivo[]
  transfiriendo: boolean
  progreso: number
  mostrarExito: boolean
  cantidadEnviados: number
  onAnadirArchivos: () => void
  onEliminarArchivo: (id: string) => void
  onSimularAutoEnvio: () => void
  onResponderSolicitud: (id: string, aceptar: boolean) => void
}

export function ContenedorPrincipalDeTransmision({
  miIp,
  archivos,
  solicitudes,
  transfiriendo,
  progreso,
  mostrarExito,
  cantidadEnviados,
  onAnadirArchivos,
  onEliminarArchivo,
  onResponderSolicitud
}: Props) {
  return (
    <div style={estilos.contenedorPrincipal}>
      {/* 📊 BARRA LATERAL */}
      <aside style={estilos.barraLateral}>
        <div style={estilos.encabezadoApp}>
          <div style={estilos.iconoApp}>📦</div>
          <h1 style={estilos.tituloApp}>LocalSend</h1>
        </div>

        <div style={estilos.tarjetaEstado}>
          <div style={estilos.lineaEstado}>
            <span style={estilos.indicadorOnline}></span>
            <strong style={{ color: '#e0e0e0', fontSize: '13px' }}>Servidor Activo</strong>
          </div>
          <div style={estilos.grupoInfo}>
            <label style={estilos.etiqueta}>IP ACTUAL</label>
            <div style={estilos.bloqueIp}>
              <code>{miIp}</code>
            </div>
          </div>
        </div>

        {/* ❌ BOTÓN DE SIMULACIÓN ELIMINADO DEFINITIVAMENTE */}

        <div style={estilos.footer}>
          <small>© 2026 Escuela Técnica UBA</small>
        </div>
      </aside>

      {/* 🖥️ PANEL CONTENIDO CENTRAL */}
      <main style={estilos.panelContenido}>
        {/* Caja de Archivos */}
        <div style={estilos.cajaSeccion}>
          <div style={estilos.encabezadoSeccion}>
            <h3 style={estilos.tituloSeccion}>Archivos para Enviar</h3>
            <button onClick={onAnadirArchivos} style={estilos.botonAnadir}>
              ➕ Añadir
            </button>
          </div>

          {archivos.length === 0 ? (
            <p style={estilos.textoVacio}>No hay archivos cargados para la transmisión.</p>
          ) : (
            <div style={estilos.listaVertical}>
              {archivos.map((arc) => (
                <TarjetaParaArchivoDeCola
                  key={arc.id}
                  nombre={arc.nombre}
                  tamanio={arc.tamanio}
                  onEliminar={() => onEliminarArchivo(arc.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Caja de Dispositivos */}
        <div style={{ ...estilos.cajaSeccion, marginTop: '20px' }}>
          <div style={estilos.encabezadoSeccion}>
            <h3 style={estilos.tituloSeccion}>Dispositivos en Espera ({solicitudes.length})</h3>
          </div>

          {solicitudes.length === 0 ? (
            <p style={estilos.textoVacio}>Ningún dispositivo solicitó conexión todavía.</p>
          ) : (
            <div style={estilos.listaVertical}>
              {solicitudes.map((disp) => (
                <TarjetaParaDispositivoEnEspera
                  key={disp.id}
                  nombre={disp.nombre}
                  ip={disp.ip}
                  onRechazar={() => onResponderSolicitud(disp.id, false)}
                  onAceptar={() => onResponderSolicitud(disp.id, true)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Barra de progreso */}
        {transfiriendo && <BarraDeProgresoParaSubida progreso={progreso} />}

        {/* Cartel de Exito */}
        {mostrarExito && (
          <div
            style={{
              ...estilos.cajaSeccion,
              marginTop: '20px',
              borderColor: '#2e7d32',
              backgroundColor: '#122214',
              textAlign: 'center',
              padding: '15px'
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#81c784' }}>
              🚀 Transmisión completada: Los archivos se enviaron correctamente ({cantidadEnviados}{' '}
              en total).
            </span>
          </div>
        )}
      </main>
    </div>
  )
}

const estilos: Record<string, React.CSSProperties> = {
  contenedorPrincipal: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#111112',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0
  },
  barraLateral: {
    width: '260px',
    backgroundColor: '#16161a',
    borderRight: '1px solid #23232a',
    padding: '25px 20px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  encabezadoApp: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '30px',
    height: '35px'
  },
  iconoApp: {
    fontSize: '16px',
    backgroundColor: '#22222b',
    padding: '6px 9px',
    borderRadius: '8px',
    border: '1px solid #2d2d38',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tituloApp: { fontSize: '16px', fontWeight: 700, margin: 0 },
  tarjetaEstado: {
    backgroundColor: '#1c1c22',
    borderRadius: '10px',
    padding: '15px',
    border: '1px solid #252530'
  },
  lineaEstado: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' },
  indicadorOnline: {
    width: '7px',
    height: '7px',
    backgroundColor: '#00e676',
    borderRadius: '50%',
    boxShadow: '0 0 6px #00e676'
  },
  etiqueta: {
    fontSize: '10px',
    color: '#71717a',
    fontWeight: 600,
    display: 'block',
    marginBottom: '4px'
  },
  bloqueIp: {
    backgroundColor: '#111112',
    padding: '8px 10px',
    borderRadius: '5px',
    border: '1px solid #23232a',
    fontSize: '13px',
    color: '#00adb5',
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  footer: { color: '#3f3f46', fontSize: '10px', marginTop: 'auto' },
  panelContenido: {
    flex: 1,
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    boxSizing: 'border-box'
  },
  cajaSeccion: {
    backgroundColor: '#16161a',
    border: '1px solid #23232a',
    borderRadius: '10px',
    padding: '18px'
  },
  encabezadoSeccion: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  tituloSeccion: { fontSize: '14px', fontWeight: 600, margin: 0, color: '#e4e4e7' },
  botonAnadir: {
    backgroundColor: '#22222b',
    color: '#00adb5',
    border: '1px solid #2d2d38',
    padding: '4px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  textoVacio: { color: '#555', fontSize: '12px', fontStyle: 'italic', margin: '5px 0' },
  listaVertical: { display: 'flex', flexDirection: 'column', gap: '8px' }
}
