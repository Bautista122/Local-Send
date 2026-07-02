import React from 'react'
import { useProgresoTransferencia } from '../../hooks/useProgresoTransferencia'
import { ContenidoMonitorTransferencia } from '../contenidos/ContenidoMonitorTransferencia'

/**
 * Orquestador del monitor de transferencia.
 * Sigue la Regla 2: Separación de lógica de negocio y presentación.
 */
export const ControladorMonitorTransferencia: React.FC = () => {
  const { porcentaje, velocidad, tiempoRestante } = useProgresoTransferencia()

  // Solo mostramos el monitor si hay una transferencia activa (progreso > 0)
  if (porcentaje === 0 || porcentaje === 100) return null

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px' }}>
      <ContenidoMonitorTransferencia
        porcentaje={porcentaje}
        velocidad={velocidad}
        tiempo={tiempoRestante}
      />
    </div>
  )
}
