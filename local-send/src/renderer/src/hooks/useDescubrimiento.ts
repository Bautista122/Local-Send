import { useState, useEffect } from 'react'

export interface InterfazDispositivo {
  id: string
  alias: string
  tipo: 'computadora' | 'celular' | 'laptop'
  direccionIp: string
}

export function useDescubrimiento() {
  const [dispositivos, setDispositivos] = useState<InterfazDispositivo[]>([])
  const [estaServidorActivo, setEstaServidorActivo] = useState(false)

  useEffect(() => {
    const apiElectron = window.api
    if (!apiElectron) return

    // Escucha dispositivos detectados por el servidor UDP del proceso Principal (Main)
    if (apiElectron.onDispositivoDetectado) {
      apiElectron.onDispositivoDetectado((nuevoDispositivo: InterfazDispositivo) => {
        setDispositivos((listaPrevia) => {
          if (listaPrevia.some((dispositivo) => dispositivo.id === nuevoDispositivo.id)) {
            return listaPrevia
          }
          return [...listaPrevia, nuevoDispositivo]
        })
      })
    }

    // Escucha si el servidor local TCP levantó correctamente
    if (apiElectron.onEstadoServidor) {
      apiElectron.onEstadoServidor((estado: boolean) => {
        setEstaServidorActivo(estado)
      })
    }
  }, [])

  return { dispositivos, estaServidorActivo }
}
