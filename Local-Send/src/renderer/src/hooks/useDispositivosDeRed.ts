import { useState, useEffect } from 'react'

type Dispositivo = {
  id: string
  alias: string
  ip: string
  deviceType: 'mobile' | 'desktop'
}

export function useDispositivosDeRed() {
  const [estadoServidor, setEstadoServidor] = useState<string>('offline')
  const [listaDispositivos, setListaDispositivos] = useState<Dispositivo[]>([])

  useEffect(() => {
    // Escuchar el estado del socket desde el proceso Main
    window.localSendAPI.onServerStatus((nuevoEstado: string) => {
      setEstadoServidor(nuevoEstado)
    })

    // Escuchar nuevos dispositivos descubiertos en la red
    window.localSendAPI.onDeviceDiscovered((nuevoDispositivo: Dispositivo) => {
      setListaDispositivos((dispositivosPrevios) => {
        if (dispositivosPrevios.some((d) => d.ip === nuevoDispositivo.ip)) {
          return dispositivosPrevios
        }
        return [...dispositivosPrevios, nuevoDispositivo]
      })
    })
  }, [])

  return { estadoServidor, listaDispositivos }
}
