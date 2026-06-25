// local-send/src/renderer/src/componentes/controladores/ControladorDeTransmision.tsx
import { useState, useEffect, useRef } from 'react'
import { ContenedorPrincipalDeTransmision } from '../contenedores/ContenedorPrincipalDeTransmision'

interface Dispositivo {
  id: string
  nombre: string
  tipo: string
  ip: string
}
interface ArchivoLocal {
  id: string
  nombre: string
  tamanio: string
  tipo: string
}

export function ControladorDeTransmision() {
  const [miIp, setMiIp] = useState<string>('Buscando IP...')
  const [solicitudes, setSolicitudes] = useState<Dispositivo[]>([])
  const [archivosAEnviar, setArchivosAEnviar] = useState<ArchivoLocal[]>([])
  const [cantidadEnviadosSimulados, setCantidadEnviadosSimulados] = useState<number>(0)
  const [mostrarCartelExito, setMostrarCartelExito] = useState<boolean>(false)

  const [transfiriendo, setTransfiriendo] = useState<boolean>(false)
  const [progreso, setProgreso] = useState<number>(0)

  const refEntradaArchivo = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let removerEscuchador: (() => void) | undefined = undefined

    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.invoke('obtener-ip-local').then((ip: string) => {
        setMiIp(ip || '127.0.0.1')
      })

      removerEscuchador = window.electron.ipcRenderer.on(
        'peticion-transferencia',
        (_evento, datos: Dispositivo) => {
          setSolicitudes((prev) => {
            if (prev.some((d) => d.id === datos.id)) return prev
            return [...prev, datos]
          })
        }
      )
    }

    return () => {
      if (removerEscuchador) removerEscuchador()
    }
  }, [])

  const simularAutoConexion = () => {
    const autoMock: Dispositivo = {
      id: 'loopback-pc',
      nombre: '💻 Mi PC Local (Auto-Envío)',
      tipo: 'Desktop Server',
      ip: miIp === 'Buscando IP...' ? '127.0.0.1' : miIp
    }

    setSolicitudes((prev) => {
      if (prev.some((d) => d.id === autoMock.id)) return prev
      return [...prev, autoMock]
    })
  }

  const ejecutarClickDeArchivo = () => {
    if (refEntradaArchivo.current) refEntradaArchivo.current.click()
  }

  const alSeleccionarArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const listaNuevos: ArchivoLocal[] = Array.from(e.target.files).map((file) => {
      const pesoBytes = file.size
      const pesoFormateado =
        pesoBytes > 1024 * 1024
          ? `${(pesoBytes / (1024 * 1024)).toFixed(1)} MB`
          : `${(pesoBytes / 1024).toFixed(1)} KB`

      return {
        id: Math.random().toString(36).substring(2, 9),
        nombre: file.name,
        tamanio: pesoFormateado,
        tipo: file.type || 'Desconocido'
      }
    })

    setArchivosAEnviar((prev) => [...prev, ...listaNuevos])
    setMostrarCartelExito(false)
  }

  const eliminarArchivoDeCola = (id: string) => {
    setArchivosAEnviar((prev) => prev.filter((f) => f.id !== id))
  }

  const responderSolicitud = (id: string, aceptar: boolean) => {
    if (aceptar) {
      if (archivosAEnviar.length === 0) {
        alert('⚠️ Cargá al menos un archivo arriba antes de aceptar.')
        return
      }

      setMostrarCartelExito(false)
      setTransfiriendo(true)
      setProgreso(0)

      const totalArchivos = archivosAEnviar.length
      let porcentajeActual = 0

      const intervalo = setInterval(() => {
        porcentajeActual += 10
        setProgreso(porcentajeActual)

        if (porcentajeActual >= 100) {
          clearInterval(intervalo)
          setTransfiriendo(false)
          setCantidadEnviadosSimulados(totalArchivos)
          setMostrarCartelExito(true)
          setArchivosAEnviar([])
        }
      }, 200)
    }

    window.electron?.ipcRenderer.send('responder-transferencia', { id, aceptar })
    setSolicitudes((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <>
      <input
        type="file"
        ref={refEntradaArchivo}
        multiple
        style={{ display: 'none' }}
        onChange={alSeleccionarArchivos}
      />
      <ContenedorPrincipalDeTransmision
        miIp={miIp}
        archivos={archivosAEnviar}
        solicitudes={solicitudes}
        transfiriendo={transfiriendo}
        progreso={progreso}
        mostrarExito={mostrarCartelExito}
        cantidadEnviados={cantidadEnviadosSimulados}
        onAnadirArchivos={ejecutarClickDeArchivo}
        onEliminarArchivo={eliminarArchivoDeCola}
        onSimularAutoEnvio={simularAutoConexion}
        onResponderSolicitud={responderSolicitud}
      />
    </>
  )
}
