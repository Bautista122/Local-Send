import { useState, useEffect } from 'react'
import { ContenedorPrincipalDeTransmision } from './componentes/contenedores/ContenedorPrincipalDeTransmision'
// IMPORTANTE: Asegúrate de que esta ruta sea exacta a la de tu explorador de archivos

export default function App() {
  const [miIp, setMiIp] = useState('Cargando IP...')
  const [solicitudes, setSolicitudes] = useState<any[]>([])

  useEffect(() => {
    window.api.pedirIp().then((ip: string) => setMiIp(ip))
    window.api.onDispositivoDetectado((datos: any) => {
      setSolicitudes((prev) => [...prev, datos])
    })
  }, [])

  return (
    <ContenedorPrincipalDeTransmision
      miIp={miIp}
      archivos={[]}
      solicitudes={solicitudes}
      transfiriendo={false}
      progreso={0}
      mostrarExito={false}
      cantidadEnviados={0}
      onAnadirArchivos={() => {}}
      onEliminarArchivo={() => {}}
      onSimularAutoEnvio={() => {}}
      onResponderSolicitud={() => {}}
    />
  )
}
