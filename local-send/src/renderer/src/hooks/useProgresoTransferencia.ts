import { useState, useEffect } from 'react'

/**
 * Hook para gestionar la lógica de progreso y velocidad.
 * Sigue la Regla 3: Encapsulación de lógica fuera del componente.
 */
export const useProgresoTransferencia = () => {
  const [datos, setDatos] = useState({
    porcentaje: 0,
    velocidad: 0, // En MB/s
    tiempoRestante: 0 // En segundos
  })

  useEffect(() => {
    // Escuchamos los eventos que definimos en el Preload
    window.apiRed.alActualizarProgreso((info: any) => {
      setDatos({
        porcentaje: info.porcentaje,
        velocidad: info.velocidad,
        tiempoRestante: info.tiempoRestante
      })
    })
  }, [])

  return datos
}
