import { useState, useEffect } from 'react'

export const useDescubrimiento = () => {
  const [estaActivo, setEstaActivo] = useState(false)
  // Agregamos el estado para la lista de dispositivos
  const [dispositivosEncontrados, setDispositivosEncontrados] = useState<any[]>([])

  useEffect(() => {
    // 1. Escuchar estado del servidor (LED)
    window.apiRed.alCambiarEstadoServidor((valor: boolean) => {
      setEstaActivo(valor)
    })

    // 2. Escuchar nuevos dispositivos encontrados por el servidor UDP
    window.apiRed.alDescubrirDispositivo((nuevoDispositivo: any) => {
      setDispositivosEncontrados((listaActual) => {
        // Evitamos duplicados comparando por IP
        const yaExiste = listaActual.some((d) => d.ip === nuevoDispositivo.ip)
        if (yaExiste) return listaActual
        return [...listaActual, nuevoDispositivo]
      })
    })
  }, [])

  // Ahora devolvemos ambos valores
  return { estaActivo, dispositivosEncontrados }
}
