import { useState, useEffect } from 'react'

export interface InterfazEstadoTransferencia {
  progreso: number // 0 a 100
  velocidad: number // en MB/s
  tiempoEstimado: string // ej: "00:05"
  nombreArchivo: string
  enProgreso: boolean
}

export function useTransferencia() {
  const [transferencia, setTransferencia] = useState<InterfazEstadoTransferencia>({
    progreso: 0,
    velocidad: 0,
    tiempoEstimado: '--:--',
    nombreArchivo: '',
    enProgreso: false
  })

  useEffect(() => {
    const apiElectron = window.api
    if (!apiElectron) return

    if (apiElectron.onProgresoTransferencia) {
      apiElectron.onProgresoTransferencia((actualizacion: Partial<InterfazEstadoTransferencia>) => {
        setTransferencia((estadoPrevio) => ({ ...estadoPrevio, ...actualizacion }))
      })
    }
  }, [])

  const enviarArchivosADispositivo = (idDispositivo: string, rutasDeArchivos: string[]) => {
    const apiElectron = window.api
    if (apiElectron?.enviarArchivos) {
      apiElectron.enviarArchivos(idDispositivo, rutasDeArchivos)
    }
  }

  return { transferencia, enviarArchivosADispositivo }
}
