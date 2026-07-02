import { useState, useCallback } from 'react'

/**
 * Hook para gestionar el estado de las notificaciones internas.
 * Sigue la Regla 3: Encapsulación de lógica fuera del componente.
 */
export const useNotificaciones = () => {
  const [notificacion, setNotificacion] = useState<{
    visible: boolean
    mensaje: string
    tipo: 'exito' | 'error' | 'info'
  }>({ visible: false, mensaje: '', tipo: 'info' })

  const mostrarAlerta = useCallback(
    (mensaje: string, tipo: 'exito' | 'error' | 'info' = 'info') => {
      setNotificacion({ visible: true, mensaje, tipo })

      // Auto-ocultar después de 5 segundos
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, visible: false }))
      }, 5000)
    },
    []
  )

  const ocultarAlerta = () => setNotificacion((prev) => ({ ...prev, visible: false }))

  return { notificacion, mostrarAlerta, ocultarAlerta }
}
